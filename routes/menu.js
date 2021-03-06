/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM menu;`)
      .then(data => {
        const menu = data.rows;

        console.log(menu); //for testing

        res.json({ menu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

