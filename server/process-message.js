// process-message.js
/**
  This is the main processing file for the Dialogflow integration. 
  
  Main public method is: 
  .processMessage(@sessionId: Unique ID passed by client, @message: The message to be processed) -> null
  This method handles the user input from the client and sends it to dialogflow for intent mapping.
  For more details read comments in method.
**/

////////////////////////////////////////////////////////////////////////////
// Dependencies
const Dialogflow = require("dialogflow").v2beta1;
const Pusher = require("pusher");
const NewsAPI = require("newsapi");
const dlv = require("dlv");

/////////////////////////////////////////////////////////////////////////////
// Constants
const projectId = "harold-ctogdt";
const sessionId = "123456";
const languageCode = "en-US";

/////////////////////////////////////////////////////////////////////////////
// API classes
let pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: "us3",
  encrypted: true
});

let newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const sessionClient = new Dialogflow.SessionsClient();
let kbPath = new Dialogflow.KnowledgeBasesClient({
  projectPath: process.env.GCLOUD_PROJECT,
});
let formattedParent = kbPath.projectPath(process.env.GCLOUD_PROJECT);

///////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// use data from intent to fetch news if required
const fetchNews = function(intentData) {
  const category = "technology";
  const country = "us";
  const q = dlv(intentData, "keyword.stringValue");

  return newsapi.v2.everything({
    sortBy: 'relevancy',
    page: 2,
    language: "en",
    q
  });
};

// check for string
function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

//////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS

/**
  * @sessionId - UID sent by client::STRING
  * @message - Message to process::STRING
**/
const processMessage = (sessionId, message) => {
  
  //INPUT CHECK
  if( !isString(sessionId) || !isString(message)) {return}
  
  // Debug
  //console.log("mprocessMessage called", process.env.GCLOUD_PROJECT, sessionId, message, languageCode);

  // Session path retrieved by client class
  const sessionPath = sessionClient.sessionPath(process.env.GCLOUD_PROJECT, sessionId);

  // V2Beta1 requires knowledge base names in query 
  // TODO: If API changes remove as 
  kbPath.listKnowledgeBases({
    parent: formattedParent,
  }).then(r => {
    s = [];
    if (r[0][0].name) { s = [r[0][0].name]}
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    },
    queryParams: {
      knowledgeBaseNames: s
    }
  };
  //console.log("test0.1: ",request);
  sessionClient
    .detectIntent(request).catch(err => {
      console.error("Error retrieving intent from sessionClient: ", err);
    })
    .then(responses => {
      //console.log("test2: ",responses);
      const result = responses[0].queryResult;
      const intentData = dlv(responses[0], "queryResult.parameters.fields");
      if (
        result &&
        result.intent &&
        result.intent.displayName == "news.search"
      ) {
        fetchNews(intentData).catch(err => {
            console.error("Error in process-message.fetchNews function: ", err);
          })
          .then(news => {
            if (news.articles.length > 8) {
              return news.articles.slice(0,7);
            }
            return news.articles;
          })
          .then(articles => {
            //console.log(articles);
            pusher.trigger("bot", "bot-response", {
              news: articles,
              message: result.fulfillmentText,
              sessionId: sessionId
            }).catch(err => {
            console.error("Error from pusher trigger bot in process-message: ", err);
          });
          }
          );
      } else {
        //console.log("test3", result.fulfillmentText)
        pusher.trigger("bot", "bot-response", {
          message: result.fulfillmentText,
          sessionId: sessionId
        }).catch(err => {
            console.error("Error from pusher trigger bot in process-message: ", err);
        });
      }
      //return res.sendStatus(200);
    })
  }).catch(err => {
      console.error("Process Message Error:", err);
    });
};

module.exports = processMessage;
