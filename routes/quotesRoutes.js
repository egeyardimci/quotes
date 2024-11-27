const express = require("express");
const router = express.Router();
const { getNextQuoute, getPreviousQuote, createQuote, getRandomQuote, searchQuote, likeQuote, dislikeQuote } = require("../controllers/quotesController");
const { authUser } = require("../services/authService");

router.post("/get-next-quote", getNextQuoute)
router.post("/get-previous-quote", getPreviousQuote)
router.get("/random-quote", getRandomQuote)
router.post("/search-quote",searchQuote)

router.post("/create-quote", authUser, createQuote)
router.post("/dislike-quote", authUser,dislikeQuote)
router.post("/like-quote", authUser, likeQuote)


module.exports = router;