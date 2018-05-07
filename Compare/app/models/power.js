var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var powerSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Factory: String,
    Kind: String
});

var Power = mongoose.model('Power', powerSchema);
module.exports = Power;