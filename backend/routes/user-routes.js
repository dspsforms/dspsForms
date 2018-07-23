const express = require("express");


// admin guard
const checkAuthAdmin = require("../middleware/check-auth-admin");

// staff guard
const checkAuthStaff = require("../middleware/check-auth-staff");

// (staff or admin) guard
const checkAuthStaffOrAdmin = require("../middleware/check-auth-staff-or-admin");


const UserController = require("../controllers/user-controller");

const router = express.Router();


// post /api/user/addstaff -- requester must have admin permission
router.post("/addstaff", checkAuthAdmin, UserController.addStaff );

// post /api/user/login -- requester is not logged in, no auth needed
router.post("/login", UserController.login);

// /api/user/list -- requester must be staff or admin
router.get("/list", checkAuthStaffOrAdmin, UserController.list );

module.exports = router;
