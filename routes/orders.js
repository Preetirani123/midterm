/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:orderId", (req, res) => {

    let values = [req.params.orderId];

    db.query(`SELECT * FROM orders WHERE id = $1;`, values)
      .then(data => {
        const orders = data.rows;
        console.log(orders); //for testing
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

