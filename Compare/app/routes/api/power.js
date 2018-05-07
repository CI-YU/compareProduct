var Power = require('../../models/power');
module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/power', function (req, res) {
        Power.find({},function(err,data){
            if(err){
                console.log(err);
            }
            res.status(200).json(data);
        });
    });
    
    router.post('/power', function (req, res) {
        var newPower = new Power(req.body);
        newPower.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });
}