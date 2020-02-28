// server.js
/** 
  * Main routing file for Harold Chatbot server
  * Routes:
  * .get(/faqs)
  * .post(/faqs)
  * .post(/chat)
*/

////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process-message');
const processFAQS = require('./process-faqs');

////////////////////////////////////////////////////////////////////////////
// CLASS INSTANCES
const app = express();

////////////////////////////////////////////////////////////////////////////
// CONFIGURATION
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////
// ROUTES

/** 
  * get FAQs
  * Express route which returns JSON payload of Knowledge Base FAQs
  * Secured by secret ID
*/

app.get('/faqs', (req, res) => {

  // Retrieve secret header from request
  const secretHeader = req.header('secretID');
  
  // Check if valid, if not return 401
  if (secretHeader === process.env.OUR_LITTLE_SECRET) {
    processFAQS.getFAQSAsJSON().then(json => 
      res.json(json)
      );
  } else {
    console.log("Rejecting FAQ request");
    res.statusCode = 401;
    res.body("Not Authorised")
  }
});

/** 
  * edit FAQs
  * Express route which receives JSON payload of new KnowledgeBase FAQs
  * Secured by secret ID
*/

app.post('/faqs', (req, res) => {
  
  // Retrieve secret header from request
  const secretHeader = req.header('secretID');
  
  if (secretHeader === process.env.OUR_LITTLE_SECRET) {
    processFAQS.replaceFAQs(req.body)
  } else {
    console.log("Rejecting FAQ post");
    res.statusCode = 401;
  }
});

/** 
  * post chat
  * Express route which allows for message posting to server
  * Secured by secret ID
*/

app.post('/chat', (req, res) => {
  const { message, sessionId } = req.body;
  console.log("server", message, sessionId);
  processMessage(sessionId, message);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
})
