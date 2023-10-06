const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    like: {
        type: Array,
        required: false
    },
    dislike: {
        type: Array,
        required: false
    },
    postID: {
        type: Number,
        required: false
    }

},{timestamps: true});

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;