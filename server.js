var superagent = require('superagent');
var cheerio = require('cheerio');
var http = require('http');
var express = require('express');
var app = express();
var util = require('util');
var searchId;
app.get('/', function (appreq, appres) {
    console.log('Homepage');
    //res.send('Hello homepage');
    superagent.get(appreq.query.targetUrl)
        .set('Cookie', ['WN1p0_2132_auth=1e91oDqIpqtTp5lo5axWdTHMrV7qx64VOSPGOoGA2gBJWt2v4khnnd5Z3Lps2CKysdSD%2BXDEWb884H5zHQtAOWvRSw', 'WN1p0_2132_saltkey=FG3GD77o'])
        .end(function (req, res) {
            //console.log(res.cookie);
            // console.log(res.text);
            var $ = cheerio.load(res.text);
            var ipPattern = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/;
            console.log($(".vwmy.qq").text());
            console.log(ipPattern.exec(res.header["set-cookie"][2])[0]);
            var namesOrigin = $(".pi>.authi>a");
            var contents = $(".t_f");
            var names = new Array();
            var texts = new Array();
            names[0] = $(".vwmy.qq").text();
            texts[0] = ipPattern.exec(res.header["set-cookie"][2])[0];
            for (var i = 1; i <= namesOrigin.length; i++) {
                names[i] = (namesOrigin[i - 1].firstChild.data);
                texts[i] = $(".t_fsz").eq(i - 1).text()
            }
            //var namesJson = util.inspect(names);
            switch (appreq.query.targetType) {
                case "names": appres.jsonp(names); break;
                case "texts": appres.jsonp(texts); break;
            }


        });

});
app.get('/search', function (appreq, appres) {
    console.log("Search for" + appreq.query.keyWord)
    var searchUrl = "http://bbs.mycraft.cc/search.php?mod=forum&srchtxt=" + appreq.query.keyWord + "&formhash=734ed0d0&searchsubmit=true&source=hotsearch";
    superagent.get(searchUrl)
        .set('Cookie', ['WN1p0_2132_auth=1e91oDqIpqtTp5lo5axWdTHMrV7qx64VOSPGOoGA2gBJWt2v4khnnd5Z3Lps2CKysdSD%2BXDEWb884H5zHQtAOWvRSw', 'WN1p0_2132_saltkey=FG3GD77o'])
        .end(function (req, res) {
            var $ = cheerio.load(res.text);
            var searchItem = "";
            $(".pbw").each(function () {
                searchItem += $(this).html();
                console.log(searchItem);
            });
            searchItem += $(".pgs.cl.mbm").html();
            appres.jsonp(searchItem);
        })
})

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