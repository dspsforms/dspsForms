const express = require("express");


const mongoose = require('mongoose');

// staff guard
const checkAuthStaff = require("../middleware/check-auth-staff");

const router = express.Router();

const IntakeForm = require('../models/intake-form-model');

// post  "/api/form/:formName"
router.post("/:formName", (req, res, next) => {

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

// "/api/form/list"  -- must have staff permission
router.get("/list",
  checkAuthStaff,
  (req, res, next) => {
    console.log("in /api/form/list");
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

      const filtered = collections.filter(col => {
        // only return form collections. remove users, logs, and anything else that is not a form-collection
        if (col.name === 'users' || col.name === 'logs') {
          return false;
        }
        else {
          return true;
        }
      }).map(collection => { return collection.name; });

      console.log("filtered=", filtered);
      res.status(200).json({
        message: "Collections List fethed successfully",
        collections: filtered
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

// get "/api/form/:formName"  -- must have staff level perm
router.get("/:formName",
  checkAuthStaff,
  (req, res, next) => {

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

// get "/api/form/:formName/:_id"  -- with this pattern, need staff level perm
router.get("/:formName/:_id",
  checkAuthStaff,

  (req, res, next) => {

    if (req.params.formName == 'intakeForm') {

      console.log("fetched data for _id=", req.params._id);

      // TODO fetch only some select fields from db; also (limit, offeset)
      IntakeForm.findById(req.params._id).then(
        document => {
          console.log("intakeForms from db", document);
          res.status(200).json({
            message: "Intake Form fetched successfully",
            formData: document
          });
        }
      );
    }

});


// delete "/api/form/:formName/:id"  -- with this pattern, need staff level perm
router.delete("/:formName/:id",
  checkAuthStaff,

  (req, res, next) => {
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

module.exports = router;
