var db = require('../db');
module.exports = function(app, passport) {
    app.get('/', function (req, res) {
        db.advertsNotJson(function(rows){
            res.render('index', {title:'Головна', adverts:rows});
        });
    });
    app.post('/user/registration', function(req,res){
        //console.log(req.body);
        db.saveUser(req.body.user);
        res.redirect('/');
    });

    //app.post('/user/registration', passport.authenticate('local-signup', {
    //    successRedirect : '/', // redirect to the secure profile section
    //    failureRedirect : '/registration#toregister', // redirect back to the signup page if there is an error
    //    failureFlash : true // allow flash messages
    //}));

    app.post('/user/login', passport.authenticate('local-login', {
        //successRedirect : '/service', // redirect to the secure profile section
        failureRedirect : '/registration', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),function(req, res) {
        console.log("Autorize!!!");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
            console.log('MAX AGE');
        } else {
            req.session.cookie.expires = false;
            console.log('MAX AGE FALSE');
        }
        res.redirect('back');
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
            res.render('show', {title:'Оголошення', adverts:rows, user:req.user});
        });
    });

    app.get('/advert', function (req, res){
        var obj = db.singleAdvert(req, function(advert, own){
            console.log(own);
            res.render('advert', {advert:advert, user:req.user, userOwn:own});
        });
    });

    app.get('/service', isLoggedIn ,function (req, res){
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
    app.get('/chat', function (req, res){
        res.render('chat');
    });
};
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/registration');
}