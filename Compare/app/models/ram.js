var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ramSchema = mongoose.Schema({
    coolpc: {
        Name: String,
        Price: Number
    },
    pcking: {
        Name: String,
        Price: Number
    }
});

var Ram = mongoose.model('Ram', ramSchema);
module.exports = Ram;