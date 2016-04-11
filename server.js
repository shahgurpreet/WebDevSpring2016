var express = require('express');
var app = express();
//noinspection JSUnresolvedVariable
app.use(express.static(__dirname + '/public'));
//noinspection JSUnresolvedVariable
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//noinspection JSUnresolvedVariable
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


app.use(cookieParser());
app.use(session({
    secret: process.env.passport_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/FormMakerDB';

//noinspection JSUnresolvedVariable
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //noinspection JSUnresolvedVariable
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
require('./public/project/server/app.js')(app, db, mongoose);
require('./public/assignment/server/app.js')(app, db, mongoose);
//Serve static content for the app from the “public” directory in the application directory
app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);