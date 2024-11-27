const profileService = require("../services/profileService")

const profileListQuotes = async (req,res) =>{
    const result = await profileService.listQuotes(
        req.user.username,
        req.user.id, 
        req.body.type, 
        req.body.action, 
        req.body.LastQuote, 
        req.body.FirstQuote,
    );
    result != null ? res.json(result) : res.status(400).send();
};

const getQuoteCount = async (req,res) =>{
    const result = await profileService.getQuoteCount(req.user.username);
    result != null ? res.json(result) : res.status(400).send();
};

const deleteQuote = async (req,res) => {
    const result = await profileService.deleteQuote(req.body._id, req.user.username);
    result != false ? res.status(200).send() : res.status(400).send();
};

module.exports = {
    getQuoteCount,
    profileListQuotes,
    deleteQuote
}