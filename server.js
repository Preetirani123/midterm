// load .env data into process.env
//require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');

//const dbParams = require('./lib/db.js');
//const dbParams = require(process.env.DATABASE_URL)
const connectionString = process.env.DATABASE_URL
const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})
//const db = new Pool(dbParams);
// db.connect();

db.connect(() => {
  console.log('connected to database');
});


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const place_ordersRoute = require("./routes/place_orders");
const quick_ordersRoute = require("./routes/quick_orders");
const fulfilled_ordersRoute = require("./routes/fulfilled_orders");
const smsRoute = require("./routes/sms");
const estTimeListener = require("./routes/est_time_listener");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/place_orders", place_ordersRoute(db));
app.use("/api/quick_orders", quick_ordersRoute(db));
app.use("/api/fulfilled_orders", fulfilled_ordersRoute(db));
app.use("/sms", smsRoute(db));
app.use("/api/est_time_listener", estTimeListener(db));


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);

});
