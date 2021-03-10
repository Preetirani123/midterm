const express = require('express');
const app = express();
const router  = express.Router();
const concatFoodItems = require('./helperFuncs/concatFoodOrder');


// const cookieSession = require('cookie-session');
// app.use(cookieSession({
//   name: 'user_id',
//   keys: ['key_1'],
// }));

//require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_NUMBER;
const kitchenNumber = process.env.KITCHEN_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  router.post("/", (req, res) => {

    const user = req.body.user;
    const menu_items = req.body.menu_items;
    const values = [user.id, menu_items[0], menu_items];
    const foodString = concatFoodItems(req.body.food_items);


    db.query(`
    INSERT INTO orders (user_id, menu_id, food_items_by_id)
    VALUES ($1, $2, $3)
    RETURNING orders.id;`, values)
      .then(data => {

        const order_id = data.rows[0].id;
        req.session = order_id;
        res.json(order_id);



        // text message to restaraunt
        client.messages
        .create({
           body: `You have a new order from ${user.name}! Order ID: ${order_id} for the menu items
           ${foodString}.  Please responde with the estimated wait time to confirm.`,
           from: phoneNumber,
           to: kitchenNumber,
         })
        .then(message => console.log(message.sid));




      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

