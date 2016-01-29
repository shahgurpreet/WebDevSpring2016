var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world experiment');
});
app.get('/api/users', function(req, res) {
    var users = [
        {username: 'alice12', name: 'alice'},
        {username: 'bob23', name:'bob'}
    ];
    res.send(users);
});

//Serve static content for the app from the “public” directory in the application directory
app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);