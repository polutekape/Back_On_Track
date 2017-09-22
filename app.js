var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT||8081;

app.use(express.static(path.join(__dirname,'views')));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var pg = require('pg');

var connectionString = "postgres://polutekape:myvuw2017@depot:5432/polutekape_jdbc";
var client = new pg.Client(connectionString);
client.connect();


//postgresql
//var mysql = require('mysql');

//Creating connection to the database
/*var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'goodboy22',
    database : 'bot'
})

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

var results = [];

//GET REQUEST
app.get('/', function(req,res){
    console.log('login');
    res.render('index');
});

//get data list of this macaddress
app.post('/login', function(req, res){
    console.log(req.body.userid);
    console.log(req.body.password);
    if(req.body.userid == 'kapz' && req.body.password == 'polo'){
        console.log('datalist');
        res.render('datalist',{
            title:'Datalist'
        });
    } 
});

app.get('/result', function(request, response){
    console.log('reached result');
    //SQL Query > Select Data
    var query = client.query("SELECT * FROM users");
    var results = [];
    //Stream results back one row at a time
    query.on('row',function(row){
        results.push(row);
    });

    //After all data is returned, close connection and return results
    query.on('end', function(){
        //client.end();
        response.send(results);
    });
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

module.exports = app;