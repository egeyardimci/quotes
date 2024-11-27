const quoteService = require("../services/quotesService")

const getNextQuoute = async (req,res) => {
    const result = await quoteService.getNextQuoute(req.body.type,req.body.ID,req.body.author);
    result != null ? res.json(result) : res.status(400).send();
}

const getPreviousQuote = async (req,res) => {
    const result = await quoteService.getPreviousQuoute(req.body.type,req.body.ID,req.body.author);
    result != null ? res.json(result) : res.status(400).send();
}

const createQuote = async (req,res) => {
    const result = await quoteService.createQuote(req.body.content,req.user.username);
    result != null ? res.json(result._id) : res.status(310).send();
};

const getRandomQuote = async (req,res) =>{
    const result = await quoteService.getRandomQuote();
    result != null ? res.json(result) : res.status(400).send();
};

const dislikeQuote = async (req,res)=> {
    const result = await quoteService.dislikeQuote(req.body.ID,req.user.id);
    result != false ? res.status(200).send() : res.status(400).send();
};

const likeQuote = async (req,res)=> {
    const result = await quoteService.likeQuote(req.body.ID,req.user.id);
    result != false ? res.status(200).send() : res.status(400).send();
};

const searchQuote = async (req,res) =>{
    const result = await quoteService.searchQuote(req.body.type,req.body.data);
    result != null ? res.json(result) : res.status(400).send();
};

module.exports = {
    getNextQuoute,
    getPreviousQuote,
    createQuote,
    getRandomQuote,
    dislikeQuote,
    likeQuote,
    searchQuote
};