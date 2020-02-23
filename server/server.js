// server.js

require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process-message');
const processFAQS = require('./process-faqs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/faqs', (req, res) => {

  const secretHeader = req.header('secretID');
  //console.log(secretHeader);
  
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

app.post('/faqs', (req, res) => {
  const secretHeader = req.header('secretID');
  //console.log(secretHeader);
  if (secretHeader === process.env.OUR_LITTLE_SECRET) {
    processFAQS.replaceFAQs(req.body)
  } else {
    console.log("Rejecting FAQ post");
    res.statusCode = 401;
  }
});

app.post('/chat', (req, res) => {
  const { message, sessionId } = req.body;
  console.log("server", message, sessionId);
  processMessage(sessionId, message);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
})