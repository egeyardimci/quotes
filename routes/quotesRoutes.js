const express = require("express");
const router = express.Router();
const quotesController = require("../controllers/quotesController");
const authService = require("../services/authService");

router.post("/next", quotesController.getNextQuoute)
router.post("/previous", quotesController.getPreviousQuote)
router.get("/random", quotesController.getRandomQuote)
router.post("/search", quotesController.searchQuote)

router.post("/create", authService.authUser, quotesController.createQuote)
router.post("/dislike", authService.authUser, quotesController.dislikeQuote)
router.post("/like", authService.authUser, quotesController.likeQuote)


module.exports = router;