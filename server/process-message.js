// process-message.js

const Dialogflow = require("dialogflow");
const Pusher = require("pusher");
const NewsAPI = require("newsapi");
const dlv = require("dlv");
const newsapi = new NewsAPI("39347bcc775544f192bcc6b369fe8ec6");

const projectId = "harold-ctogdt";
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWrd76NeABiCPU\nhP/+3JtR1oQhxg9t/pu+naqc4fFomGj6Jy3KDco7X7gpfdSVytNo27Ryl7JxLa88\nRwXN7gDfH3mFpBGxfCqvVDrKtNnVVdRByKhVqHlPgJV0VdDEzRKj6N2VuzCQrpML\n117fAOg/xIL0ellO78y6pXvk8YY/GcCR9oJutSWTiT+fXi+jpheXiIjZF+kwYiqO\nBNuFAacEfDDlZblDlED4Xx2YkQ6YPjoFpDD4QeFEwprtCOWHS+7Xqwqag6sOefd0\ny/FgSdjwsKo6iru/aaGnMwAa5ncjUaLWnrvBXp7vrJaExmR0cuISecjDnupJpprg\ni3l+9pcPAgMBAAECggEAIzXfVZCSjg3DOq8ZwbZzLygNAfEXRMY2yzvW6OZSDwK4\nbRcR9orueXCIpx2BSZQ7un4WiZkB5nhEvpEzjYQU1oO2DcpMMJ0Z7ynUfrzM4aWz\nK5r6qRn506VWXf9ZP34XKZUfCtjp7UEE0zNe1xqx/QuBIxISJdVE8fQEbxeCGkUV\nB4sNGH3uBfdtd2DR32uXyyNi2TeGt30L7tk55huFaTkRwrNoa4qciymgdSGj9SB0\naZtOaFqvUAEdkDfgudbnIG1+VNRK77juLi1yYEgg6Hgad07mcYvTsKDoMmhyrn7R\nXN4F663QBlUTFbz8MlISltcg6OWMxJDbhk+41ag86QKBgQD2If02efEXX62Na+O1\nHqfWbtscDgRHbqj0DMLEkBYV5Bw1XXlGyiV8UEb22kCdKNtx/65t/Y/im46Qk70F\nw9tUgos88RFL3VKyUoqMy+DotZjaSwTVV19JksX3fU3aWh87g6UJx7Qb/vAk0NGb\niHla8/28SQETovgs4qLJbWISgwKBgQDfSRSA3NqSxA3qAcqEzWg1I1y2WNhtK5eM\n9clxZw+i0/YSivfUEv+j0craZQBSygtQxjX4PYVxUcORI/AKTkwFo+rLWBNsH7MG\nkPAki2U3824NWQUbrCwJzxtM+/zypQIbmKDjyC6ywoGuAoxB2l4/oADs06FlI/ad\nQ02qM2vThQKBgHDsnzQDNm224/VibpKGghKLwdNZSvVK/BEcWa+9O6THh3mkbSPh\nUtl6K1TORZ7VQ/lFiU3Fa+JX5EzIu4yNk29uhVtsbrcT0AEohZCbaZDa4Eom6QzI\njVtAD7vArZtkhbfUaj/Wc/f0O1FozQJC1wq3rs5X4DqWJq7RPEaV/MzpAoGBAK9C\nnI5dTE8hBk7kYwMEe8Qh4pbae96M9eLV1e1mWNaVCzQY0lgrJW9/r3rnBm71WhZn\nzlrwZzrAVAIrtDFSrcdLl3NOycf3xbzkrSnyJFvbfkmJ00GaTeLRJnux2yTWMiZZ\nEghYy5bSp5lfNJpH/exw+ejqYGeT5/IerupmfD9FAoGBAM9YjaiUiNRQizgxy0/m\nB1DYUSxGh0b2sP7LAJCdzgvHeBzT50YfHqzP/bJ2V2MVabvbGudg5mQTDNQQjq4D\nLUSc1FfroM+jT6/659fxGDwW9E1m/GYHVYQF3Gc13V7f++j1jfb1tfL/2m7jb+zr\nJMLgfVEPTuiBREvRC1URsMKM\n-----END PRIVATE KEY-----\n",
    client_email: "dialogflow-yjglqv@harold-ctogdt.iam.gserviceaccount.com"
  }
};


const pusher = new Pusher({
  appId: "941286",
  key: "3779809c82eb69c59f34",
  secret: "d95e4894287d9b216d1f",
  cluster: "us3",
  encrypted: true
});

const sessionClient = new Dialogflow.SessionsClient(config);

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

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
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
    .catch(err => {
      console.error("ERROR:", err);
    });
};

module.exports = processMessage;
