var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT||8081;

app.use(express.static(path.join(__dirname , 'views')));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var pg = require('pg');

var connectionString = "postgres://polutekape:myvuw2017@depot:5432/polutekape_jdbc";
var client = new pg.Client(connectionString);
client.connect();


var results = [];

//GET REQUEST
app.get('/', function(req,res){
    console.log('login');
    res.render('index');
});

//get data list of this macaddress
app.get('/datalist', function(req, res){
   console.log("datalist");
   res.render('datalist');
}); 



//Login check
app.post('/login', function(req, res){
    //SQL Query > Select Data
    console.log(req.body.userid + ' ' + req.body.password);
    var query = client.query("SELECT * FROM Users WHERE Userid = '"+ req.body.userid +"' AND Password = '" + req.body.password + "';");

    var results = [];
    //Stream results back one row at a time
    query.on('row',function(row){
        results.push(row);
    });

   query.on('error', function(err){
        console.log('Error retrieving things: ' + err);
   });
    //After all data is returned, close connection and return results
    query.on('end', function(){
        //client.end();
        res.send(results);
    });
});


app.post('/result', function(req, res){
    //SQL Query > Select Data
    console.log("reached result " + req.body.Username + " " + req.body.Dat);
    var user = req.body.Username;
    var date = req.body.Dat;
    console.log("SELECT * FROM data WHERE Userid = '"+user+"' AND Dat = '"+date+"';");
    var query = client.query("SELECT * FROM data WHERE Userid = '"+user+"' AND Dat = '"+date+"';");
    var results = [];
    //Stream results back one row at a time
    query.on('row',function(row){
        results.push(row);
    });
    //After all data is returned, close connection and return results
    query.on('end', function(){
        //client.end();
        res.send(results);
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
