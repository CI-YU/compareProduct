var Mb = require('../../models/mb');
module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/mb', function (req, res) {
        Mb.find({},function(err,data){
            if(err){
                console.log(err);
            }
            res.status(200).json(data);
        });
    });
    
    router.post('/mb', function (req, res) {
        var newMb = new Mb(req.body);
        newMb.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });
}