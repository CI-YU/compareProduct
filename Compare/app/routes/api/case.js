var Case = require('../../models/case');
module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/case', function (req, res) {
        Case.find({},function(err,data){
            if(err){
                console.log(err);
            }
            res.status(200).json(data);
        });
    });
    
    router.post('/case', function (req, res) {
        var newCase = new Case(req.body);
        newCase.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });
}