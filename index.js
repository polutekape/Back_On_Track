var express = require('express');
var app = express();
//postgres link 
var pg = require('pg');
//pg.defaults.ssl = true;
bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT||8081;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//access the directory
app.use(express.static(path.join(__dirname,'/Info320_sample')));

var results = [];

//GET REQUEST
app.get('/task', function(req, res){
	res.send(results);
});

//POST REQUEST
app.post('/post', function (req,res){
	console.log('Added ' + req.body.task);
	console.log(req.body);
	results.push(req.body.task);
	res.sendStatus(200);

});

//DELETE REQUEST
app.delete('/delete', function (req, res){
    console.log(req.body.task +" is deleted");
	//delete all values from array  
    results = [];
});

app.listen(port, function(){
    console.log('Example app listening on port 8081!');
});