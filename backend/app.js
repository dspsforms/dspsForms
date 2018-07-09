const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

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


const SavedFormMongoose = require('./models/saved-form-mongoose');

const IntakeForm = require('./models/intake-form');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/:formName", (req, res, next) => {

    let form;
    const currentTime = new Date();
    // req.params.formName === 'intakeForm'
    if (true) {
        form = new IntakeForm({
            formName: 'intakeForm',
            user: req.body.user,
            form: req.body.form, // "tmp form string",
            edited: req.body.edited,
            created: currentTime,
            lastMod: currentTime
        });
    }

    console.log("req.params=", req.params);
    console.log("req.body=", req.body);

    console.log("req.body.form=", req.body.form);

    console.log("form before save", form);
    form.save().then( createdForm => {
            // success
            console.log("after save, createdForm=", createdForm);
            res.status(201).json({
                message: 'Form ' + req.params.formName + ' added successfully',
                formId: createdForm._id
            });

    });



});

app.get("/api/forms", (req, res, next) => {

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
        message: "Eror",
        err: err
      });
    });


});

app.get("/api/form/:formName", (req, res, next) => {

  if (req.params.formName == 'intakeForm') {

    // TODO fetch only some select fields from db; also (limit, offeset)
    IntakeForm.find().then(
      documents => {
        console.log("intakeForms from db", documents);
        res.status(200).json({
          message: "Intake Forms fetched successfully!",
          listOfForms: documents
        });
      }
    );
  }

});

app.delete("/api/:formName/:id", (req, res, next) => {
  console.log(req.params.id);
  // https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path

  if (req.params.formName == 'intakeForm') {

    IntakeForm.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "Intake form deleted"
        });
      });

  }


});


module.exports = app;
