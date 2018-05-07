var Memory = require('../../models/memory');
module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/memory', function (req, res) {
        Memory.find({},function(err,data){
            if(err){
                console.log(err);
            }
            res.status(200).json(data);
        });
    });
    
    router.post('/memory', function (req, res) {
        var newMemory = new Memory(req.body);
        newMemory.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });
}