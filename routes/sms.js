//const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router  = express.Router();
console.log("hi")

module.exports = (db) => {

router.post('/', (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message(`We'll let the diner know. Thanks!`);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});
return router
};
