var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mbSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Factory: String,
    Size: String
});

var Mb = mongoose.model('Mb', mbSchema);
module.exports = Mb;