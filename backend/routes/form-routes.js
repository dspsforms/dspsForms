const express = require("express");


// staff guard
const checkAuthStaff = require("../middleware/check-auth-staff");

// staff guard
const checkAuthAdmin = require("../middleware/check-auth-admin");

// verify captcha

const verifyCaptchaV3 = require("../middleware/verify-captchav3");

const router = express.Router();

const FormController = require('../controllers/form-controller');


// post  "/api/form/:formName" verify captcha v3
router.post("/:formName", verifyCaptchaV3, FormController.postForm);

// post  "/api/form/agreement/:formName"  // add checkAuthStaff or checkAuthAdmin
router.post("/agreement/:formName", checkAuthAdmin, FormController.postFormAgreement);

// "/api/form/list"  -- must have staff permission
router.get("/list", checkAuthStaff, FormController.list);

// get "/api/form/agreement/:formName"
router.get("/agreement/:formName", FormController.getFormAgreement);

// get "/api/form/:formName"  -- must have staff level perm
router.get("/:formName", checkAuthStaff,  FormController.getFormsForACategory );

// get "/api/form/:formName/:_id"  -- with this pattern, need staff level perm
router.get("/:formName/:_id", checkAuthStaff, FormController.getAForm);




// delete "/api/form/:formName/:id"  -- with this pattern, need staff level perm
router.delete("/:formName/:id", checkAuthStaff, FormController.deleteAForm );

module.exports = router;
