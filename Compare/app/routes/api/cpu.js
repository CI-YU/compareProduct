var Cpu = require('../../models/cpu');

module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/cpu', function (req, res) {
        Cpu.find({}, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(data);
        });
    });

    

    /*router.post('/cpu', function (req, res) {
        var newCpu = new Cpu(req.body);
        newCpu.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });*/
}
