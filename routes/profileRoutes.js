const express = require("express");
const { authToken } = require("../services/authService");
const profileController = require("../controllers/profileController")
const router = express.Router();

router.post("/profile-list-quotes", authToken, profileController.profileListQuotes)
router.get("/profile-get-quote-number", authToken, profileController.getQuoteCount)
router.post("/profile-delete-quote", authToken, profileController.deleteQuote)

module.exports = router;