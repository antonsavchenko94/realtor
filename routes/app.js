var db = require('../db');
module.exports = function(app, passport) {
    app.get('/', function (req, res) {
        db.advertsNotJson(function(rows){
            res.render('index', {title:'Головна', adverts:rows, user:req.user});
        });
    });
    app.post('/user/registration', function(req,res){
        console.log(req.body);
        db.saveUser(req.body.user);
        res.redirect('/');
    });

    app.post('/user/login', passport.authenticate('local-login', {
        failureRedirect : '/registration', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),function(req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
            console.log('MAX AGE');
        } else {
            req.session.cookie.expires = false;
            console.log('MAX AGE FALSE');
        }
        res.redirect(req.body.referrer);
    });

    app.get('/registration', function (req, res) {
        res.render('registration', {tittle:'Registration'});
    });

    app.get('/adverts', function (req, res) {
        res.render('adverts', {title:'Test'});
    });
    app.get('/show', function (req, res){
        db.advertsNotJson(function(rows){
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
        res.render('service', {user:req.user});
    });
    app.get('/registration', function (req, res){
        res.render('registration',{user:req.user});
    });

    app.get('/dodati', isLoggedIn,function (req, res){
        res.render('dodati', {user:req.user});
    });

    app.post('/add/advert', function (req, res){
        console.log(req.body);
        db.saveAdvert(req.body.advert, req.user.user_id, function(msg){
            res.send(msg);
        });
    });

    app.get('/administration', function(req, res){
        db.notShowAdvert(res);
    });

    app.post('/accept', function(req, res){
        db.acceptAdvert(req.body.advert, res);
    });

    app.get('/logout', function(req, res, next) {
        req.logout();
        req.session.save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
};
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/registration');
}