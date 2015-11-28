/**
 * Created by mozli on 08.11.2015.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session  = require('express-session'),
    morgan =  require('morgan'),
    cookieParser = require('cookie-parser'),
    flash    = require('connect-flash');

var port     = process.env.PORT || 8080;
var app = express();
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
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

app.listen(port, function(){
    console.log("Server start on port  " + port);
});
//app.set('port', (process.env.PORT || 3000));
require('./routes/app.js')(app, passport);
require('./routes/api.js')(app);
require('./config/passport')(passport); // pass passport for configurat