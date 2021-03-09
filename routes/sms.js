//const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router  = express.Router();
require('dotenv').config();
const phoneNumber = process.env.TWILIO_NUMBER

module.exports = (db) => {

router.post('/', (req, res) => {
  const twiml = new MessagingResponse();
  const message = `Thank you for your order! Your food will be ready in ${req.body.Body} minutes`
  twiml.message({ to: process.env.USER_NUMBER, from: phoneNumber }, message);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});
return router
};
