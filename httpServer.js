var fs = require('fs');
var path = require('path');
var http = require('http');
var dataPath = path.join(__dirname, 'pets.json')
var port = process.env.PORT || 8000

var server = http.createServer(function(req,res) {
    if(req.method === 'GET' && req.url === '/pets') {
        fs.readFile(dataPath, 'utf-8', function (err, petsJSON) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Errror')
            };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
        });
    } else if (req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile(dataPath, 'utf-8', function (err, petsJSON) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Errror')
            };

            var pets = JSON.parse(petsJSON);
            var petsJSON = JSON.stringify(pets[0])

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
        });
    } else if (req.method === 'GET' && req.url === '/pets/1') {
        fs.readFile(dataPath, 'utf-8', function (err, petsJSON) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Errror')
            };

            var pets = JSON.parse(petsJSON);
            var petsJSON = JSON.stringify(pets[1])

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
});

server.listen(port, function() {
    console.log(`Listening on port ${port}`)
});

module.exports = server;