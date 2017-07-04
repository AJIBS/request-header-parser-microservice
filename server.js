'use strict';


var express = require('express');
var app = express();
var parser = require('ua-parser-js');


app.set('port', (process.env.PORT || 5000));

// in order to detect proxies and correctly register client's ip address
app.enable('trust proxy');


// Home Page
app.get('/', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Visit:  'https://ajibs-request-header-parser.herokuapp.com/whoami'  to get the " +
		"IP address, language and operating system for your browser.");
});


// Request Headers api
app.get('/whoami', function (req, res){
	let result = {};
	result.ipaddress = req.ip;

	// access ["accept-language"] from the request header and select the first one.
	result.language = req.acceptsLanguages()[0];

	// get user-agent from the request header
	let ua = parser(req.headers['user-agent']);
	result.software = ua.os.name + ' ' + ua.os.version;

	res.end(JSON.stringify(result));
})

app.listen(app.get('port'), function(){
		console.log('Node app is running on port', app.get('port'));
});
