var superagent = require('superagent');
var cheerio = require('cheerio');
superagent.get('http://bbs.mycraft.cc/forum-38-1.html')
    .end(function (req, res) {
        // console.log(res.text);
        var $ = cheerio.load(res.text);
        var links = $(".s,.xst");
        for (var i = 0; i < links.length; i++) {
            console.log(links[i].attribs.href);
        }
    })