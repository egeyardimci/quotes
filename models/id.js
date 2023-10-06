const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postIDSchema = new Schema({
    countID: {
        type: Number,
        required: true
    }
});

const postID = mongoose.model("postID", postIDSchema);
module.exports = postID;