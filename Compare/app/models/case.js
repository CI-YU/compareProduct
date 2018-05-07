var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var caseSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Factory: String,
    Kind: String
});

var Case = mongoose.model('Case', caseSchema);
module.exports = Case;