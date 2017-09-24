var express = require('express');
var app = express();

var fs = require('fs');

app.use(function (req, res, next) {
    "use strict";
    // We need the following as you'll run HTML+JS+Ajax+jQuery on http://localhost, 
    // but service is taken from http://protoNNN.haaga-helia.fi (NNN is some number)
    // https://www.w3.org/TR/cors/#access-control-allow-origin-response-header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
app.get('/6167/products', 
	function(req,res) {
		fs.readFile(	__dirname+'/'+'products.json', 
				'utf8',
				function(err,data) {
					if(!err) {
						res.end(data);
					} else {
						res.end(err);
					}
				}
		);	
	} 
);




var server = app.listen(6167, function() {
	console.log("Node server starts to listen to 6167"); 
} 
);

