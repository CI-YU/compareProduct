var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var goodSchema = mongoose.Schema({
    coolpc: {
        Name: String,
        Price: Number
    },
    pcking: {
        Name: String,
        Price: Number
    }
});

var Good = mongoose.model('Good', goodSchema);
module.exports = Good;
