var Good = require('../../models/good');

module.exports = function (router) {


    router.use(function (req, res, next) {});

    router.get('/good', function (req, res) {
        Cpu.find({}, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(data);
        });
    });

    

    /*router.post('/good', function (req, res) {
        var newGood = new Good(req.body);
        newGood.save(function(err){
            if(err){
                console.log(err);
                res.status(500).send("Server Error");
            }
            res.status(200).send("OK");
        });
    });*/
}
