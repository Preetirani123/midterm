const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {

    const user = req.body.user;
    const menu_items = req.body.menu_items;
    const values = [user, menu_items[0], menu_items];

    db.query(`
    INSERT INTO orders (user_id, menu_id, food_items_by_id, order_time)
    VALUES ($1, $2, $3, now())
    RETURNING orders.id;`, values)
      .then(data => {

        const order_id = data.rows[0].id;
        res.json(order_id);


      // ------>
      // ------> TWILLIO TEXT MSG TO RESTAURANT WILL BE CALLED HERE
      // ------>


        const est_time = Number(req.body.est_time) * 60 * 1000;// minutes to milliseconds
        console.log("EST_TIME", est_time);
        setTimeout(function(){
        console.log(`Testing Server Side Timeout: ${est_time}`);

        // ------>
        // ------> TWILLIO TEXT MSG TO CLIENT WILL BE CALLED HERE, MAYBE?
        // ------> Not sure if setTimeouts can be used on the server reliably.

          },est_time);


      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

