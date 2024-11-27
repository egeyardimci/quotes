const quoteRepository = require("../repository/quoteRepository")
const Quote = require("../models/quoteModel")


const getNextQuoute = async (type,quoteID,author) =>{
    let result = null;
    if(type === "Random" || type === "specialSearch" || type === "idSearch" ){
        result = await quoteRepository.findNextQuote(quoteID);
    }

    if(type === "authorSearch"){
        result = await quoteRepository.findNextQuoteWithAuthor(quoteID,author);
    }
    
    return result;
}

const getPreviousQuoute = async (type,quoteID,author) =>{
    let result = null;
    if(type === "Random" || type === "specialSearch" || type === "idSearch" ){
        result = await quoteRepository.findPreviousQuote(quoteID);
    }

    if(type === "authorSearch"){
        result = await quoteRepository.findPreviousQuoteWithAuthor(quoteID,author);
    }
    
    return result;
}

const createQuote = async (content,username) =>{
    const quote = new Quote({
        content: content,
        author: username,
        like: [],
        dislike: []
    });

    const result = await quoteRepository.saveQuote(quote)
    return result;
}


const getRandomQuote = async () =>{
    return await quoteRepository.getRandomQuote();
}

const likeQuote = async (quoteID,userID) =>{

    let likeflag = false;
    let dislikeflag = false;

    const quote = await quoteRepository.findQuoteWithID(quoteID);

    quote.like.forEach((el) =>{
        if (el == userID){
            likeflag = true;
        }
    });
    
    quote.dislike.forEach((el) => {
        if (el == userID){
            dislikeflag = true;
        }
    });


    if (likeflag === true){
        //already liked
        return false;

    }

    else{
        //if disliked?
        if(dislikeflag === true){
            //remove dislike
            let dislikers = quote.dislike
            dislikers.splice(dislikers.indexOf(userID),1);
        }
        
        //add like
        let likers = quote.like
        likers.push(userID)

        quoteRepository.saveQuote(quote);
        return true;
    }

}   

const dislikeQuote = async (quoteID,userID) =>{

    let likeflag = false;
    let dislikeflag = false;

    const quote = await quoteRepository.findQuoteWithID(quoteID);

    quote.like.forEach((el) =>{
        if (el == userID){
            likeflag = true;
        }
    });
    
    quote.dislike.forEach((el) => {
        if (el == userID){
            dislikeflag = true;
        }
    });


    if (dislikeflag === true){
        //already disliked
        return false;

    }

    else{
        //if liked?
        if(likeflag === true){
            //remove like
            let likers = quote.like
            likers.splice(likers.indexOf(userID),1);
        }
        
        //add dislike
        let dislikers = quote.dislike
        dislikers.push(userID)

        quoteRepository.saveQuote(quote);
        return true;
    }

}   

const searchQuote = async (searchType,data) => {
    let quote = null
    if(searchType == "idSearch"){
        quote = await quoteRepository.findQuoteWithID(data);
    }

    if(searchType == "authorSearch"){
        quote = await quoteRepository.findQuoteWithAuthor(data);
    }

    if(searchType == "speacialSearch"){
        quote = await quoteRepository.findQuoteWithID(data);
    }
    return quote;
}

module.exports = {
    getNextQuoute,
    getPreviousQuoute,
    createQuote,
    getRandomQuote,
    dislikeQuote,
    likeQuote,
    searchQuote
}