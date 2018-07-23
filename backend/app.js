const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require('mongoose');

const formRoutes = require('./routes/form-routes');
const userRoutes = require('./routes/user-routes');


// Connection URL
const uri = 'mongodb://localhost:27017/simpledsps';

mongoose.Promise = global.Promise;

// mongoose.connect(url);

// add a second field options after uri if desired

mongoose.connect(uri).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log("connected to database ");
    },
    err => { /** handle initial connection error */
      console.log("database connect error", err);
    }
  );

// make a copy of misc/once.js, call it once.tmp.js, add first admin
// user, run it once, then delete once.tmp.js
// const once = require('./misc/once.tmp');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", express.static(path.join(__dirname, "/angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// "/api/form/list"
app.get("/api/form2/list", (req, res, next) => {
  console.log("matching /api/form/list");
//trying to get collection names
mongoose.connection.db.listCollections().toArray().then(collections => {
  console.log("collections: ", collections);
  /*
  collections:  [ { name: 'intakeforms',
  type: 'collection',
  options: {},
  info: { readOnly: false, uuid: [Object] },
  idIndex:
   { v: 2,
     key: [Object],
     name: '_id_',
     ns: 'simpledsps.intakeforms' } } ]
     */

  res.status(200).json({
    message: "Collections List fethed successfully",
    collections: collections
  });

})
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Error",
      err: err
    });
  });


});





app.use("/api/form", formRoutes);
app.use("/api/user", userRoutes);

/*
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
*/


module.exports = app;
