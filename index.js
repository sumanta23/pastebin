var Promise = require('bluebird');
var ep      = require('./reqEndPoint.js');
var express = require('express');
var querystring = require('querystring');
var app     = express();
var port    = 8080;
Promise.longStackTraces();

app.all('/', function(req, res) {
    process(req,function(data){
        res.send(data);
    });
});


var process = function(req,cb){
    var d;
    switch(req.method){
        case 'GET':
            var q = req.query.q;
            d = ep.request('get', 'https://ghostbin.com', '/paste/'+q+'/raw');
            break;
        case 'POST':
            d = req.on('data', function(chunk) {
                var data = querystring.parse(chunk.toString());
                return ep.request('post', 'https://ghostbin.com', '/new', data);
            });
            break;
        case 'PUT':
            var q = req.query.q;
            d = req.on('data', function(chunk) {
                var data = querystring.parse(chunk.toString());
                return ep.request('get', 'https://ghostbin.com', '/paste/'+q+'/edit',data);
            });

            break;
    }

    d.then(function(data){
        cb(data);
    });
}

app.listen(port);

console.log('Server running at http://localhost:' + port);

