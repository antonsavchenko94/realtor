/**
 * Created by mozli on 08.11.2015.
 */
var express = require('express'),
    path = require('path'),
    db = require('./db'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport');

var app = express();
var count = 0;

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
} )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    db.advertsNotJson(function(rows){
        res.render('index', {title:'Головна', adverts:rows});
    });
});
app.post('/user/registration', function(req,res){
   db.saveUser(req.body.user);
});

app.post('/user/login', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
    }));


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
app.get('/registration', function (req, res){
    res.render('registration');
});
app.get('/add', function (req, res){
    res.render('add');
});
app.get('/dodati', function (req, res){
    res.render('dodati');
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