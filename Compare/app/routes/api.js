var fs = require('fs');

module.exports = function (router, passport) {


    router.use(function (req, res, next) {
        fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n", function (err) {
            next();
        });
    });

    router.get('/testAPI', function (req, res, next) {
        if (req.query.access_token) {
            next();
        } else {
            next('route');
        }
    }, passport.authenticate('bearer', {
        session: false
    }), function (req, res) {
        res.json({
            secret: 'YES'
        });
    });

    router.get('/testAPI', function (req, res) {
        res.json({
            secret: 'NO'
        });
    });

    router.get('/photos', function (req, res) {
        pixnet.album.getAlbumSetElements(function(res){console.log(res);}, 5111907, s045488);
    });

    //pixnet.album.getAlbumSetElements(function (res) {console.log(res);}, setId, userName)
    //pixnet.album.getAlbumSetElements(function(){...}, 5111907, s045488)
}
