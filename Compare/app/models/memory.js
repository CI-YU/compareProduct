var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var memorySchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Factory: String,
    Kind: String
});

var Memory = mongoose.model('Memory', memorySchema);
module.exports = Memory;