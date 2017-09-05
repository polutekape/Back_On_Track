var express = require('express');
var app = express();
//postgres mysql 
var mysql = require('mysql');

//Creating connection to the database
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'goodboy22',
    database : 'bot'
})

/*
connection.query('INSERT INTO Users VALUES("POLI","POLO","POLO")',function(err,rows,field){
    if(!err){
	console.log("Success");
    }else{
	console.log("error");
    }
});

connection.query('SELECT * FROM Users',function(err,rows,field){
    if(!err){
	console.log(rows);
    }else{
	console.log(err);
    }
});

connection.end();
*/
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
