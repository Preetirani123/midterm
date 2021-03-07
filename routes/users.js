const express = require('express');
const app        = express();
const router  = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'user_id',
  keys: ['key_1'],
}));

app.set('trust proxy', 1)

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT id, name FROM users LIMIT 1;`)
      .then(data => {

        const user = data.rows[0];
        res.json({ user });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
