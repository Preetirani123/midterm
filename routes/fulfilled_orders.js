const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

   const values = [req.body.orderId];

    db.query(`
    UPDATE orders
    SET order_fulfilled = true
    WHERE orders.id = $1
    RETURNING orders.id, order_fulfilled;`,values)
      .then(data => {
        res.send(
          data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

