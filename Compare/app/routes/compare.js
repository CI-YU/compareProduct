var Cpu = require('../models/cpu');
var Good = require('../models/good');

module.exports = function (app) {
    
    app.get('/cpu', function (req, res) {
        Cpu.find({})
            .exec(function (err, cpus) {
                if (err) {
                    res.send('error has occued');
                } else {
                    console.log('cpus');
                    res.json(cpus);
                }
            });
    })
    
    app.get('/good', function (req, res) {
        Good.find({})
            .exec(function (err, goods) {
                if (err) {
                    res.send('error has occued');
                } else {
                    console.log('goods');
                    res.json(goods);
                }
            });
    })


}

