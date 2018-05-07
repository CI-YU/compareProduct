var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hddSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Factory: String
});

var Hdd = mongoose.model('Hdd', hddSchema);
module.exports = Hdd;