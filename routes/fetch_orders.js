const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {


    db.query(`
    SELECT orders.id, food_items_by_id as food
    FROM orders;`)
      .then(data => {
        const orders = data.rows;
        res.send({
        history: data.rows,

        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
