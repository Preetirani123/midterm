const express = require('express');
const router  = express.Router();
// const app = express();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());



module.exports = (db) => {
  router.get("/:orderID", (req, res) => {

    let values = [req.params.orderID];

    db.query(`
    SELECT est_time as time
    FROM orders
    WHERE orders.id = $1
    ;`, values)
      .then(data => {
        const time = data.rows[0];
        res.json({ time });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
