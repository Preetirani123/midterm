const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const router = express.Router();
const phoneNumber = process.env.TWILIO_NUMBER;

// Twilio route for forwarding time estimates to customer

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("Trying to call this function");
    const twiml = new MessagingResponse();
    const textBody = req.body.Body;
    const textSplit = textBody.split(" ");
    const timeEstimate = textSplit[0].toString();
    const orderNumber = textSplit[1].toString();

    db.query(
      `UPDATE orders
      SET est_time = $1
      WHERE orders.id = $2;`,
      [timeEstimate, orderNumber]
    );
    const message = `Thank you for your order! Your food will be ready in ${timeEstimate} minutes`;

    twiml.message({ to: process.env.USER_NUMBER, from: phoneNumber }, message);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  });

  return router;
};
