const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:orderId", (req, res) => {

    let values = [req.params.orderId];

    db.query(`
    SELECT orders.id as order_id, menu.est_time, users.name as customer, users.phone
    FROM orders
    JOIN users
    ON users.id = orders.user_id
    JOIN menu
    ON menu.id = orders.menu_id
    WHERE orders.id = $1;`, values)
      .then(data => {
        const order = data.rows[0];
        res.send({ order });

        console.log(order); //for testing
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

