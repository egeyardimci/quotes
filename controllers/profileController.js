const profileService = require("../services/profileService")
const Quote = require("../models/quoteModel")

const profileListQuotes = (req,res) =>{

    if(req.body.type === "my"){
        if(req.body.LastQuote === null)
            Quote.find().where("author").equals(req.user.username).limit(2).exec((err,result) => {
                if (result != null){
                    res.json(result);
                }
                else{
                    res.status(400).send();
                }
            })
        else{
            if(req.body.action === "next"){
                Quote.find().where("_id").gt(req.body.LastQuote).where("author").equals(req.user.username).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result);
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }

            if(req.body.action === "previous"){
                Quote.find().where("_id").lt(req.body.FirstQuote).where("author").equals(req.user.username).sort({_id: -1}).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result.reverse());
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
        }
    }

    if(req.body.type === "liked"){
        if(req.body.LastQuote === null){
            Quote.find({like: {"$in":[req.user.id]}}).limit(2).exec((err,result) => {
                if (result != null){
                    res.json(result);
                }
                else{
                    res.status(400).send();
                }
            })
        }
        else{
            if(req.body.action === "next"){
                Quote.find({like: {"$in":[req.user.id]}}).where("_id").gt(req.body.LastQuote).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result);
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }

            if(req.body.action === "previous"){
                Quote.find({like: {"$in":[req.user.id]}}).where("_id").lt(req.body.FirstQuote).sort({_id: -1}).limit(2).exec((err,result)  => {
                    if (result != null){
                        res.json(result.reverse());
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
        }
    }

    if(req.body.type === "disliked"){
        if(req.body.LastQuote === null){
            Quote.find({dislike: {"$in":[req.user.id]}}).limit(2).exec((err,result) => {
                if (result != null){
                    res.json(result);
                }
                else{
                    res.status(400).send();
                }
            })
        }
        else{
            if(req.body.action === "next"){
                Quote.find({dislike: {"$in":[req.user.id]}}).where("_id").gt(req.body.LastQuote).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result);
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
            if(req.body.action === "previous"){
                Quote.find({dislike: {"$in":[req.user.id]}}).where("_id").lt(req.body.FirstQuote).sort({_id: -1}).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result.reverse());
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
        }
    }

};

const getQuoteCount = async (req,res) =>{
    const result = await profileService.getQuoteCount(req.user.username);
    result != null ? res.json(result) : res.status(400).send();
};

const deleteQuote = async (req,res) => {
    const result = await profileService.deleteQuote(req.body.ID, req.user.username);
    result != false ? res.status(200).send() : res.status(400).send();
};

module.exports = {
    getQuoteCount,
    profileListQuotes,
    deleteQuote
}