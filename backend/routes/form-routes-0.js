const express = require("express");


const mongoose = require('mongoose');

const router = express.Router();

mongoose.Promise = global.Promise;

// "/api/form/list"
router.get("/list", (req, res, next) => {
  console.log("matching /api/form/list in formRoutes");
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





module.exports = router;
