var superagent = require('superagent');
var cheerio = require('cheerio');
var http = require('http');
var express = require('express');
var app = express();
var util = require('util');
app.get('/', function (appreq, appres) {
    console.log('Homepage');
    //res.send('Hello homepage');
    superagent.get(appreq.query.targetUrl)
        .end(function (req, res) {
            // console.log(res.text);
            var $ = cheerio.load(res.text);
            var namesOrigin = $(".pi>.authi>a");
            var contents = $(".t_f");
            var names = new Array();
            for (var i = 0; i < namesOrigin.length; i++) {
                names[i] = (namesOrigin[i].firstChild.data);
            }
            //var namesJson = util.inspect(names);
            appres.jsonp(names);

        });

});

// http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': ' text/plain' });
//     response.end('Hello');
// }).listen(8888);

// console.log('Server running at http://127.0.0.1:8888/');

// app.get('/', function (req, res) {
//     console.log('Homepage');
//     res.send('Hello homepage');
//     res.send(JSON.stringify(names));
// });
app.get('/123', function (req, res) {
    console.log('123');
    res.send('Hello 123');
});
app.use(express.static('page'))
var server = app.listen(8888, function () {
    var host = server.address().address;
    console.log(host);
})