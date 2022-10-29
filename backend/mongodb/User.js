const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
});
module.exports = mongoose.model("users",mongooseSchema);