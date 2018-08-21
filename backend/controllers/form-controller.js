const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const IntakeForm = require('../models/intake-form-model');
const AltMediaRequest = require('../models/alt-media-request-form-model');
const ApplicationForServices = require('../models/application-for-services-form-model');

const EmergencyEvacInfo = require('../models/emergency-evac-info-model');
const Feedback = require('../models/feedback-model');

const FormAgreement = require('../models/form-agreement-model');




exports.postForm = (req, res, next) => {

  const form = createForm(req);

  form.save().then( createdForm => {
          // success

    if (debug.POST_FORM) {
      console.log("after save, createdForm=", createdForm);
    }

    res.status(201).json({
      message: 'Form ' + form.formName + ' added successfully',
      formId: createdForm._id
    });

  })
  .catch(err => {
    console.log(err);
    res.status(401).json({
      message: 'Form save failed',
      err: err
    });
  });

}

exports.postFormAgreement = (req, res, next) => {

  const form = createForm(req, true); // true == isAgreement

  form.save().then( createdForm => {
          // success
          console.log("after save, createdForm=", createdForm);
          res.status(201).json({
              message: 'Form ' + form.formName + ' added successfully',
              formId: createdForm._id
          });

  })
  .catch(err => {
    console.log(err);
    res.status(401).json({
      message: 'Form save failed',
      err: err
    });
  });

}

// "/api/form/list"  -- must have staff permission
exports.list = (req, res, next) => {
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
      if (col.name === 'users' || col.name === 'logs' || col.name === 'useragreements') {
        return false;
      }
      else {
        return true;
      }
    }).map(collection => { return collection.name; });

    console.log("filtered=", filtered);
    res.status(200).json({
      message: "Collections List fetched successfully",
      collections: filtered
    });

  })
  .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Error. Collections list failed",
        err: err
      });
  });


}

// get "/api/form/:formName"  -- must have staff level perm
exports.getFormsForACategory = (req, res, next) => {

  const formName = sanitize(req.params.formName);
  console.log("fetching forms for ", formName);
  const pageSize = +sanitize(req.query.pagesize);
  const currentPage = +sanitize(req.query.page);
  console.log("pageSize=", pageSize, ", currentPage=", currentPage);

  const form = getFormModel(formName);

  const query = form.find();
  let fetchedItems;
  if (pageSize && currentPage) {
    // page numbers start at 1
    query.skip(pageSize * (currentPage-1));
  }
  if (pageSize) {
    query.limit(pageSize);
  }

    // TODO fetch only some select fields from db

  // chain multiple queries. first the documents with given (offset, limit), then the count
  query.then(
    documents => {
      fetchedItems = documents;
      return form.count();
    }
  ).then(
    count => {
      console.log("fetchedItems from db", fetchedItems);
      console.log("maxItems from db", count);
      res.status(200).json({
        message: "Forms fetched successfully!",
        listOfForms: fetchedItems,
        maxItems: count
      });

    }
  )
  .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Form fetched for a category failed",
        err: err
      });
  });
}

// get "/api/form/:formName/:_id"  -- with this pattern, need staff level perm
exports.getAForm = (req, res, next) => {

  const formName = sanitize(req.params.formName);


  const form = getFormModel(formName);

  console.log("fetched data for _id=", req.params._id);

    // TODO fetch only some select fields from db; also (limit, offeset)
  form.findById(sanitize(req.params._id)).then(
      document => {
        console.log("forms from db", document);
        res.status(200).json({
          message: "Form fetched successfully",
          formData: document
        });
      }
  )
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Fetching form data failed",
      err: err
    });
  });

}

// get "/api/form/agreement/:formName"  -- no permission required to get this
exports.getFormAgreement = (req, res, next) => {

  const formName = sanitize(req.params.formName);


  const form = FormAgreement;

  console.log("fetching agreement for =", formName);

  form.findOne({ formName: formName }).sort({ field: 'asc', _id: -1 }).limit(1).then(
      document => {
        console.log("forms from db", document);
        res.status(200).json({
          message: "Form fetched successfully",
          formData: document
        });
      }
  )
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Fetching form agreement failed",
      err: err
    });
  });

}

// delete "/api/form/:formName/:id"  -- with this pattern, need staff level perm
exports.deleteAForm = (req, res, next) => {
  console.log(req.params.id);
  // https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path


  const formName = sanitize(req.params.formName);
  const id = sanitize(req.params._id);

  const form = getFormModel(formName);

  form.deleteOne({
      _id: mongoose.Types.ObjectId(id)
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "form deleted"
        });
    })
    .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Form delete failed",
      err: err
    });
  });

}

// return the mongoose model correspoding to formName
getFormModel = formName => {
  let form;
  if (formName == 'intakeForm') {
    form = IntakeForm;
  } else if (formName === 'altMediaRequest') {
    form = AltMediaRequest;
  } else if (formName === 'applicationForServices') {
    form = ApplicationForServices;
  } else if (formName === 'emergencyEvacInfo') {
    form = EmergencyEvacInfo;
  } else if (formName === 'feedback') {
    form = Feedback;
  }

  return form;
}

createForm = (req, isAgreement) => {

  // the parameter isAgreement is optional

  const captchaFree = removeCaptcha(req.body);

  let form;
  const currentTime = new Date();

  const formName = sanitize(req.params.formName);

  const captchaScore = req.body.captchaScore;

  if (isAgreement) {
    form = new FormAgreement({
      formName: formName,
      user: sanitize(req.body.user),
      form: sanitize(captchaFree.form), // "tmp form string",
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      captchaScore: captchaScore
    });

    return form;

  }

  // else. not user agreement

  if (formName === 'intakeForm') {
      form = new IntakeForm({
        formName: formName,
        user: sanitize(req.body.user),
        form: sanitize(captchaFree.form), // "tmp form string",
        edited: false,
        created: currentTime,
        lastMod: currentTime,
        captchaScore: captchaScore
      });
  } else if (req.params.formName === 'altMediaRequest') {
    form = new AltMediaRequest({
      formName: formName,
      user: sanitize(req.body.user),
      form: sanitize(captchaFree.form), // "tmp form string",
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      captchaScore: captchaScore
    });
  }  else if (req.params.formName === 'applicationForServices') {
    form = new ApplicationForServices({
      formName: formName,
      user: sanitize(req.body.user),
      form: sanitize(captchaFree.form), // "tmp form string",
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      captchaScore: captchaScore
    });
  } else if (req.params.formName === 'emergencyEvacInfo') {
    form = new EmergencyEvacInfo({
      formName: formName,
      user: sanitize(req.body.user),
      form: sanitize(captchaFree.form), // "tmp form string",
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      captchaScore: captchaScore
    });
  } else if (req.params.formName === 'feedback') {
    form = new Feedback({
      formName: formName,
      user: sanitize(req.body.user),
      form: sanitize(captchaFree.form), // "tmp form string",
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      captchaScore: captchaScore
    });
  }

  // console.log("req.params=", req.params);
  // console.log("req.body=", req.body);

  //  console.log("req.body.form=", req.body.form);

  if (debug.CREATE_FORM) {
    console.log("createForm: before save", form);
  }


  return form;

}

removeCaptcha = form => {
  // remove the reCaptchaV3Token field. also sanitize

  if (debug.CREATE_FORM) {
    console.log("removeCaptcha: form with captcha", form);
  }

  const form2Save = form;
  delete form2Save.reCaptchaV3Token;

  if (debug.CREATE_FORM) {
    console.log("removeCaptcha: form2Save with captcha removed", form2Save);
  }

  return form2Save;
}
