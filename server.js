var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var fs = require('fs');
var json;
fs.readFile('locations.json', 'utf8', function(err, data){
    if(err) {
        throw err;
    }
    else{
        json = data;
    }
});
var port = 8080;

app.get('/', function(request, response){
    response.setHeader('access-control-allow-origin', '*');
    response.send(json);
}) 

app.listen(port, function() {
    console.log('Server started... Listening at port 8080')
});