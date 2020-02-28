// process-message.js

const Dialogflow = require("dialogflow").v2beta1;
const Pusher = require("pusher");
const NewsAPI = require("newsapi");
const dlv = require("dlv");
const newsapi = new NewsAPI("39347bcc775544f192bcc6b369fe8ec6");

const projectId = "harold-ctogdt";
const sessionId = "123456";
const languageCode = "en-US";


const pusher = new Pusher({
  appId: "941286",
  key: "3779809c82eb69c59f34",
  secret: "d95e4894287d9b216d1f",
  cluster: "us3",
  encrypted: true
});

const sessionClient = new Dialogflow.SessionsClient();
const kbPath = new Dialogflow.KnowledgeBasesClient({
  projectPath: projectId,
});
const formattedParent = kbPath.projectPath(projectId);

// use data from intent to  fetch news
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

const processMessage = (sessionId, message) => {
  console.log("mprocessMessage called", projectId, sessionId, message, languageCode);

  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

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
  console.log("test0.1: ",request);
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log("test2: ",responses);
      const result = responses[0].queryResult;
      const intentData = dlv(responses[0], "queryResult.parameters.fields");
      if (
        result &&
        result.intent &&
        result.intent.displayName == "news.search"
      ) {
        fetchNews(intentData)
          .then(news => {
            if (news.articles.length > 8) {
              return news.articles.slice(0,7);
            }
            return news.articles;
          })
          .then(articles => {
            console.log(articles);
            pusher.trigger("bot", "bot-response", {
              news: articles,
              message: result.fulfillmentText,
              sessionId: sessionId
            });
          }
          );
      } else {
        console.log("test3", result.fulfillmentText)
        pusher.trigger("bot", "bot-response", {
          message: result.fulfillmentText,
          sessionId: sessionId
        });
      }
      //return res.sendStatus(200);
    })
  }).catch(err => {
      console.error("ERROR:", err);
    });
};

module.exports = processMessage;
