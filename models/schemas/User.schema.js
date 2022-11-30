const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
})
