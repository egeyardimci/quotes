const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup-user", userController.registerUser);
router.post("/auth-user", userController.authUser);
router.post("/login-user", userController.loginUser);

module.exports = router;