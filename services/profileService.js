const quoteRepository = require("../repository/quoteRepository")

const getQuoteCount = async (username) => {
    const count = await quoteRepository.findQuoteCountWithAuthor(username);
    return count;
}

const deleteQuote = async (quoteID, username) => {
    const result = await quoteRepository.deleteQuote(quoteID,username);
    return result;
}

const listQuotes = async (username,userID, type, action = null, lastQuoteID = null, firstQuoteID = null, limit = 2) => {
    let result = null;
    switch(type) {
        case "my":
            if (lastQuoteID === null) {
                result = await quoteRepository.findQuotesWithAuthorWithLimit(username, limit);
            } else if (action === "next") {
                result = await quoteRepository.findNextQuotesWithAuthorWithLimit(username, lastQuoteID, limit);
            } else if (action === "previous") {
                result = await quoteRepository.findPreviousQuotesWithAuthorWithLimit(username, firstQuoteID, limit);
            }
            break;

        case "liked":
            if (lastQuoteID === null) {
                result = await quoteRepository.findQuotesLikedByUserWithLimit(userID, limit);
            } else if (action === "next") {
                result = await quoteRepository.findNextQuotesLikedByUserWithLimit(userID, lastQuoteID, limit);
            } else if (action === "previous") {
                result = await quoteRepository.findPreviousQuotesLikedByUserWithLimit(userID, firstQuoteID, limit);
            }
            break;

        case "disliked":
            if (lastQuoteID === null) {
                result = await quoteRepository.findQuotesDislikedByUserWithLimit(userID, limit);
            } else if (action === "next") {
                result = await quoteRepository.findNextQuotesDislikedByUserWithLimit(userID, lastQuoteID, limit);
            } else if (action === "previous") {
                result = await quoteRepository.findPreviousQuotesDislikedByUserWithLimit(userID, firstQuoteID, limit);
            }
            break;
    }
    return result;
};

module.exports = {
    getQuoteCount,
    deleteQuote,
    listQuotes
};