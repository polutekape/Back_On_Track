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
var client = new pg.Client(

    	user: 'wudzjlxhfycqls',
	password: '8bea5e639ed8f35ae80dad3555068c739acc0f88fac7d72461a6bcb62e1e8cd2',
	database: 'd3rhmnr8bnkgue',
	port: 5432,
	host: 'ec2-54-235-80-137.compute-1.amazonaws.com',
	ssl: true


  
);

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


              
app.post('/CheckUser', function(req,res){
    console.log('CheckUser');
    console.log(req.body.User + ' ' + req.body.Password);

    var query = client.query("SELECT * FROM Users WHERE Userid = '"+ req.body.User +"';");

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
        if(results.length == 0){
            client.query("INSERT INTO Users Values('"+ req.body.User +"','" + req.body.Password + "');");
            console.log(req.body.User + ' ' + req.body.Password + ' was added to the db');
            res.sendStatus(201);
        }else{
            var mid = client.query("SELECT * FROM Users WHERE Userid = '"+ req.body.User +"' AND Password = '" + req.body.Password + "';");
            mid.on('row',function(row){
                results.push(row);
            });

            mid.on('error', function(err){
                console.log('Password Checking failed: ' + err);
            });

            mid.on('end',function(){
                if(results.length == 2){
                    console.log('Password matched');
                    res.sendStatus(202);
                 }else{
                     console.log('Password doesnt match');
                     res.sendStatus(404);
                }
            });
        }
    });



})


app.post('/Vibrate',function(req,res){
    console.log('reached vibrate');
    console.log(req.body.User+ ' ' + req.body.Date);
    var query = client.query("SELECT * FROM Vibrate WHERE Userid = '"+ req.body.User +"' AND Dat = '" + req.body.Date+ "';");
    console.log("SELECT * FROM Vibrate WHERE Userid = '"+ req.body.User +"' AND Dat = '" + req.body.Date+ "';");
    var vibrates = [];
    //Stream results back one row at a time
        query.on('row',function(row){
        vibrates.push(row);
    });

    query.on('error', function(err){
        console.log('Error retrieving things: ' + err);
    });

    query.on('end', function(){
        res.send(vibrates);
    });
    
})


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


app.get('/logout', function(req,res){
   console.log("logout");
   res.render('index');
});


app.post('/result', function(req, res){
    //SQL Query > Select Data
    console.log("reached result " + req.body.Username + " " + req.body.Dat);
    var user = req.body.Username;
    var date = req.body.Dat;
    console.log("SELECT * FROM data WHERE Userid = '"+user+"' AND Dat = '"+date+"';");

    var query = client.query("SELECT * FROM DATA WHERE USERID = '"+user+"' AND Dat = '"+date+"' ORDER BY Tim DESC;");
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
app.post('/postuser', function (req,res){
	console.log('Added data for' + req.body.User + ' ,' + req.body.Val);
    var query = client.query("INSERT INTO Data(Userid,Val) Values('"+ req.body.User +"','" + req.body.Val + "');");

    query.on('error', function(err){
        console.log('Error retrieving things: ' + err);
        res.sendStatus('404');
   });
    //After all data is returned, close connection and return results
    query.on('end', function(){
        //client.end();
        res.sendStatus('202');
    });
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
