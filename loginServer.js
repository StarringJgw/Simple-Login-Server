var mysql = require('mysql');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.listen(8888);
app.use(express.static(__dirname + '/page'));
app.use(bodyParser.json());
app.post('/signin', function (req, res) {
    //console.log(req);
    console.log(req.body);
    //console.log(req.body.username);
    var result = addUser(req.body.username, req.body.password, req.body.email);
    res.json("123");
})
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: '3306',
    database: 'task6'
});
connection.connect(function (err) {
    if (err) {
        console.log("Access failed:" + err);
        return;
    }
    console.log("Acess succeeded!");
})
//addUser("bbb", "bPass", "b@test.com");
//printUsers();

function addUser(username, password, email) {
    return connection.query('insert into users(username,password,email) values(?,?,?);', [username, password, email], function (err, rows, fields) {
        if (err) {
            console.log('error' + err);
            // console.log(req);
            return err; //怎么把这个error传出去！！！！！！！！！！！
        }
        //console.log(rows);
    })
}

function printUsers() {
    connection.query('select * from users;', function (err, rows, fields) {
        console.log(rows);
    })
}