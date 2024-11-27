const quoteRepository = require("../repository/quoteRepository")

const getQuoteCount = async (username) => {
    const count = await quoteRepository.findQuoteCountWithAuthor(username);
    return count;
}

const deleteQuote = async (quoteID, username) => {
    const result = await quoteRepository.deleteQuote(quoteID,username);
    return result;
}

module.exports = {
    getQuoteCount,
    deleteQuote
}