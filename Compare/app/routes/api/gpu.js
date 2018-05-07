var Gpu = require('../../models/gpu');
module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/gpu', function (req, res) {
        Gpu.find({},function(err,data){
            if(err){
                console.log(err);
            }
            res.status(200).json(data);
        });
    });
    
    router.post('/gpu', function (req, res) {
        var newGpu = new Gpu(req.body);
        newGpu.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });
}