const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:userId", (req, res) => {
    let values = [req.params.userId];

    db.query(
      `SELECT food_items_by_id as food
    FROM orders
    JOIN users
    ON users.id = orders.user_id
    WHERE orders.user_id = $1
    ORDER BY orders.id DESC
    LIMIT 1;`,
      values
    )
      .then((data) => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
