var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    MongoStore = require('connect-mongo')(session),
    request = require("request"),
    cheerio = require("cheerio"), //抓取資料
    iconv = require('iconv-lite'); //解決抓資料亂碼問題

var app = express(),
    port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var Cpu = require('./app/models/cpu');
var Good = require('./app/models/good');

mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'anystring',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client'));
app.use(express.static(path.resolve(__dirname, 'client')));

var api = express.Router();
require('./app/routes/api.js')(api, passport);
require('./app/routes/api/cpu.js')(api);
require('./app/routes/api/mb.js')(api);
require('./app/routes/api/ram.js')(api);
require('./app/routes/api/hdd.js')(api);
require('./app/routes/api/power.js')(api);
require('./app/routes/api/good.js')(api);
app.use('/api', api);

var router = express.Router();
require('./app/routes/secure.js')(router, passport);
require('./app/routes/compare.js')(app);
app.use('/', router);

app.listen(port);
console.log('Server running on port ' + port);

app.post('/cpu', function (req, res) { //create cpudb
    request({
        url: "http://www.pcking.tw/evaluate.php",
        method: "GET"
    }, function (e, r, b) {
        if (e || !b) {
            return;
        }
        var $ = cheerio.load(b);
        //var amd = [];
        var cpu = {};
        var titles = $("#row_2 .selectBox optgroup[label] option[value]");
        for (var i = 0; i < titles.length; i++) {
            var newCpu = new Cpu();
            newCpu.pcking.Name = $(titles[i]).text();

            newCpu.save(function (err, cpu) {
                if (err) {
                    console.log('error');
                    res.status(500).send("Server Error");
                } else {
                    console.log(cpu);
                }
            });
        }
        res.json(cpu);

    });
});

app.post('/coolpc', function (req, res) { //create cpudb
    request({
        url: "http://coolpc.com.tw/evaluate.php",
        method: "GET",
        encoding: null
    }, function (e, r, b) {
        if (e || !b) {
            return;
        }
        var html = iconv.decode(b, 'big5');
        var $ = cheerio.load(html, {
            decodeEntities: false
        });
        var cpu = {};
        var titles = $("select[name=n4] optgroup[label] option[value]");
        for (var i = 0; i < titles.length; i++) {
            var newCpu = new Cpu();
            newCpu.coolpc.Name = $(titles[i]).text();

            newCpu.save(function (err, cpu) {
                if (err) {
                    console.log('error');
                    res.status(500).send("Server Error");
                } else {
                    console.log(cpu);
                }
            });
        }
        res.json(cpu);

    });
});

app.post('/good', function (req, res) { //create cpudb
    request({
        url: "http://www.pcking.tw/evaluate.php",
        method: "GET"
    }, function (e, r, b) {
        if (e || !b) {
            return;
        }
        var $ = cheerio.load(b);
        var good = {};
        var titles = $("#row_14 .sm optgroup[label] option[value]");
        for (var i = 0; i < titles.length; i++) {
            var newGood = new Good();
            newGood.pcking.Name = $(titles[i]).text();
            newGood.save(function (err, good) {
                if (err) {
                    console.log('error');
                    res.status(500).send("Server Error");
                } else {
                    console.log(good);
                }
            });
        }
        res.json(good);

    });
});

app.post('/coolpcGood', function (req, res) { //create cpudb
    request({
        url: "http://coolpc.com.tw/evaluate.php",
        method: "GET",
        encoding: null
    }, function (e, r, b) {
        if (e || !b) {
            return;
        }
        var html = iconv.decode(b, 'big5');
        var $ = cheerio.load(html, {
            decodeEntities: false
        });
        var good = {};
        var titles = $("select[name=n16] optgroup[label] option[value]");
        for (var i = 0; i < titles.length; i++) {
            var newGood = new Good();
            newGood.coolpc.Name = $(titles[i]).text();
            //newGood.coolpc.Price = $(money[i]).text();
            newGood.save(function (err, good) {
                if (err) {
                    console.log('error');
                    res.status(500).send("Server Error");
                } else {
                    console.log(good);
                }
            });
        }
        res.json(good);

    });
});
