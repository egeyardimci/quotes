const express = require("express");
const authService = require("../services/authService");
const profileController = require("../controllers/profileController")
const router = express.Router();

router.post("/quotes/list", authService.authUser, profileController.profileListQuotes)
router.get("/quotes/number", authService.authUser, profileController.getQuoteCount)
router.post("/quotes/delete", authService.authUser, profileController.deleteQuote)

module.exports = router;