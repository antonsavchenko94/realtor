/**
 * Created by mozli on 08.11.2015.
 */
var express = require('express');
var path = require('path');
var db = require('./db');

var app = express();
var count = 0;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    db.advertsNotJson(function(rows){
        res.render('index', {title:'Головна', adverts:rows});
    });
});

app.get('/registration', function (req, res) {
    res.render('registration', {tittle:'Registration'});
});

app.get('/adverts', function (req, res) {
    res.render('adverts', {title:'Test'});
});
app.get('/show', function (req, res){
    db.advertsNotJson(function(rows){
        //console.log(rows);
        res.render('show', {title:'Оголошення', adverts:rows});
    });
});

app.get('/advert', function (req, res){
    var obj = db.singleAdvert(req, function(rows){
        console.log(rows);
        res.render('advert', {advert:rows});
    });
});

app.get('/service', function (req, res){
    res.render('service');
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log("Server start on port  " + app.get('port'));
});

//////////////////////////////API ROUTING//////////////////////////////
app.get('/api/users', function (req, res) {
    db.users(res);
});
app.get('/api/user', function (req, res) {
    db.user(req,res);
});
app.get('/api/adverts', function (req, res) {
    db.adverts(res);
});

app.get('/api/advert', function (req, res) {
    db.advert(req,res);
});

//app.get('/api/adverts', function (req, res) {
//    res.send(db.json);
//});