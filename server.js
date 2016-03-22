var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())
require('./public/project/server/app.js')(app);
require('./public/assignment/server/app.js')(app);

//Serve static content for the app from the “public” directory in the application directory
app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);