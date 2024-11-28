const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.registerUser);
router.post("/authenticate", userController.authUser);
router.post("/login", userController.loginUser);

module.exports = router;