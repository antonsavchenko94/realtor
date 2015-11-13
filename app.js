/**
 * Created by mozli on 08.11.2015.
 */
var express = require('express');
var path = require('path');
var mysql = require('./db');

var app = express();
var count = 0;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {title:'Test'});
});
app.get('/adverts', function (req, res) {
    res.render('adverts', {title:'Test'});
});

app.listen(3000, function(){
    console.log("Server start on port 3000")
});

//////////////////////////////API ROUTING//////////////////////////////
app.get('/api/users', function (req, res) {
    mysql.users(res);
});
app.get('/api/user', function (req, res) {
    mysql.user(req,res);
});
app.get('/api/adverts', function (req, res) {
    mysql.adverts(res);
});

//app.get('/api/adverts', function (req, res) {
//    res.send(mysql.json);
//});