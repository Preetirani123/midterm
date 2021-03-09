const express = require('express');
const router  = express.Router();
const concatFoodItems = require('./helperFuncs/concatFoodOrder');

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_NUMBER
const client = require('twilio')(accountSid, authToken);


module.exports = (db) => {
  router.post("/", (req, res) => {

    const user = req.body.user;
    const menu_items = req.body.menu_items;
    const values = [user, menu_items[0], menu_items];
    const foodString = concatFoodItems(req.body.food_items);

    console.log(`Thanks for your order! Your ${foodString} will be ready in 30 minutes`);

    db.query(`
    INSERT INTO orders (user_id, menu_id, food_items_by_id, order_time)
    VALUES ($1, $2, $3, now())
    RETURNING orders.id;`, values)
      .then(data => {


        const order_id = data.rows[0].id;
        res.json(order_id);

        client.messages
        .create({
           body: `Thanks for your order! Your ${foodString} will be ready in 30 minutes`,
           from: phoneNumber,
           to: '+17788865426'
         })
        .then(message => console.log(message.sid));


        // const est_time = 60 * 1000;// TEST VALUE
        // setTimeout(function(){
        // console.log(`Testing Server Side Timeout: ${est_time}`);
        // client.messages
        // .create({
        //    body: `Your food is ready!`,
        //    from: phoneNumber,
        //    to: process.env.KITCHEN_NUMBER
        //  })
        // .then(message => console.log(message.sid));
        // ------> Not sure if setTimeouts can be used on the server reliably.


        // ------> TWILLIO TEXT MSG TO CLIENT WILL BE CALLED HERE, MAYBE?
        // ------> DATABASE UPDATE ORDER_FULFILLED COLUMN



          // },est_time);


      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

