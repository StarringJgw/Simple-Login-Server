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
    connection.query('insert into users(username,password,email) values(?,?,?);', [req.body.username, req.body.password, req.body.email],
        function (err, rows, fields) {
            //console.log('error' + err);
            // console.log(req);
            //return err; //怎么把这个error传出去！！！！！！！！！！！
            res.json(err);
            //console.log(rows);
        })
    //res.json("123");
})
app.post('/login', function (req, res) {
    connection.query('select * from users where username =?', req.body.username, function (err, row, fields) {
        if (row[0] && row[0].password === req.body.password) {
            res.json("Login as " + row[0].username);
        } else
            res.json("Wrong Username or Password")
    })
})
app.post('/findPassword', function (req, res) {
    connection.query('select * from users where username =?', req.body.username, function (err, row, fields) {
        if (row[0] && row[0].email === req.body.email) {
            connection.query('update users set password=? where username=?', [req.body.password, req.body.username], function (err, row, fields) {
                res.json(err);
            })
        } else
            res.json("Wrong Username or Email")
    })
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



function addUser(username, password, email, res) {
    async function finalReturn(err, rows, fields) {
        return err;
    }
    return connection.query('insert into users(username,password,email) values(?,?,?);', [username, password, email],
        function (err, rows, fields) {
            if (err) {
                console.log('error' + err);
                // console.log(req);
                //return err; //怎么把这个error传出去！！！！！！！！！！！
            }
            //console.log(rows);
        })

}

function printUsers() {
    connection.query('select * from users;', function (err, rows, fields) {
        console.log(rows);
    })
}