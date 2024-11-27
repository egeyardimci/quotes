const Quote = require("../models/quoteModel")

const findNextQuote = async (quoteID) => {
    try {
      const quote = await Quote.findOne({ _id: { $gt: quoteID } }).sort({ _id: 1 });
      return quote || null; 
    } catch (error) {
      console.log(error);
      return null; 
    }
  };
  
  
  const findNextQuoteWithAuthor = async (quoteID, author) => {
    try {

      const quote = await Quote.findOne()
        .where("_id").gt(quoteID)
        .where("author").equals(author);
      return quote || null;
    } catch (error) {
      console.log(error);
      return null; 
    }
  };
  
  const findPreviousQuote = async (quoteID) => {
    try {
      const quote = await Quote.findOne({ _id: { $lt: quoteID } }).sort({ _id: -1 });
      return quote || null; 
    } catch (error) {
      console.log(error);
      return null; 
    }
  };
  
  const findPreviousQuoteWithAuthor = async (quoteID, author) => {
    try {
      const quote = await Quote.findOne()
        .where("_id").lt(quoteID)
        .where("author").equals(author)
        .sort({ _id: -1 });
      return quote || null;
    } catch (error) {
      console.log(error);
      return null; 
    }
  };

const saveQuote = async (quote) => {
    try {
        quote = await quote.save();
        return quote;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getRandomQuote = async () => {
    try {
        const count = await Quote.countDocuments();
        const random = Math.floor(Math.random() * count);
        const result = await Quote.findOne().skip(random);
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const findQuoteWithID = async (quoteID) => {
    try {
        const quote = await Quote.findOne({_id: quoteID});
        return quote || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findQuoteWithAuthor = async (author) => {
    try {
        const quote = await Quote.findOne({author: author.toUpperCase()});
        return quote || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findQuoteCountWithAuthor = async (author) => {
  try {
      const count = await Quote.find().where("author").equals(author).count();
      return count || null;
  } catch (error) {
      console.log(error);
      return null;
  }
}

const deleteQuote = async (quoteID,username) => {
  try {
      const quote = await  Quote.findOne({_id:quoteID});
      if(quote.author === username){
        await Quote.remove({_id: quoteID});
        return true;
      }
      return false;
  } catch (error) {
      console.log(error);
      return false;
  }
}

module.exports = {
    findNextQuote,
    findNextQuoteWithAuthor,
    findPreviousQuote,
    findPreviousQuoteWithAuthor,
    saveQuote,
    getRandomQuote,
    findQuoteWithID,
    findQuoteWithAuthor,
    findQuoteCountWithAuthor,
    deleteQuote
}