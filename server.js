var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http'),
    fs = require('fs'),
    json;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static(__dirname + '/public'));

fs.readFile('locations.json', 'utf8', function(err, data){
    if(err) {
        throw err;
    }
    else{
        json = data;
    }
});
var port = 8080;

app.get('/api/locations', function(request, response){
    response.setHeader('access-control-allow-origin', '*');
    response.send(json);
}) 

app.listen(port, function() {
    console.log('Server started.. Goto localhost:8080');
});
