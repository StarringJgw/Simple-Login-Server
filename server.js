var superagent = require('superagent');
var cheerio = require('cheerio');
var http = require('http');
superagent.get('http://bbs.mycraft.cc/thread-17373-1-1.html')
    .end(function (req, res) {
        // console.log(res.text);
        var $ = cheerio.load(res.text);
        var names = $(".pi>.authi>a");
        var contents = $(".t_f")
        for (var i = 0; i < names.length; i++) {
            console.log(names[i].firstChild.data);
        }
    });
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': ' text/plain' });
    response.end('Hello');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');