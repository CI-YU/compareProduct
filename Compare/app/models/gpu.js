var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gpuSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Factory: String
});

var Gpu = mongoose.model('Gpu', gpuSchema);
module.exports = Gpu;