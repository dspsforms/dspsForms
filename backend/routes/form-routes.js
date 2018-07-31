const express = require("express");


// staff guard
const checkAuthStaff = require("../middleware/check-auth-staff");

const router = express.Router();

const FormController = require('../controllers/form-controller');


// post  "/api/form/:formName"
router.post("/:formName", FormController.postForm);

// post  "/api/form/agreement/:formName"  // add checkAuthStaff or checkAuthAdmin
router.post("/agreement/:formName", FormController.postFormAgreement);

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
