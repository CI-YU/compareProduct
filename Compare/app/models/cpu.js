var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cpuSchema = mongoose.Schema({
    coolpc: {
        Name: String,
        Price: Number
    },
    pcking: {
        Name: String,
        Price: Number
    }
});

var Cpu = mongoose.model('Cpu', cpuSchema);
module.exports = Cpu;
