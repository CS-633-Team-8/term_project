// process-message.js

const Dialogflow = require("dialogflow");
const Pusher = require("pusher");
const NewsAPI = require('newsapi');
const dlv = require('dlv');
const newsapi = new NewsAPI('39347bcc775544f192bcc6b369fe8ec6');

const projectId = "harold-ctogdt";
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
};

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});

const sessionClient = new Dialogflow.SessionsClient(config);

// use data from intent to  fetch news
const fetchNews = function (intentData) {
  const category = 'technology';
  const country = 'us';
  const q = dlv(intentData, 'keyword.stringValue');

  return newsapi.v2.topHeadlines({
    category,
    language: 'en',
    country,
    q
  })
}

const processMessage = (sessionId, message) => {
  console.log("mprocessMessage called", projectId, sessionId)

  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      const intentData = dlv(responses[0], 'queryResult.parameters.fields')
      if (result && result.intent && result.intent.displayName == "news.search") {
        fetchNews(intentData)
          .then(news => news.articles)
          .then(articles = pusher.trigger('bot', 'bot-response', {
            news: articles.splice(0, 6),
            message: result.fulfillmentText,
            sessionId: sessionId
          })) 
      } else {
        pusher.trigger("bot", "bot-response", {
          message: result.fulfillmentText,
          sessionId: sessionId
        });
      }
      return res.sendStatus(200)
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
};

module.exports = processMessage;
