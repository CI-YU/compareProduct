var Hdd = require('../../models/hdd');
module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/hdd', function (req, res) {
        Gpu.find({},function(err,data){
            if(err){
                console.log(err);
            }
            res.status(200).json(data);
        });
    });
    
    router.post('/hdd', function (req, res) {
        var newHdd = new Hdd(req.body);
        newHdd.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });
}