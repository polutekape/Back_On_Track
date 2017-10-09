$(document).ready(function(e) {
$('#new-todo').dialog({ modal : true, autoOpen : false });
$('#calendar').dialog({ modal : true, autoOpen : true });
$('#con-del').dialog({ modal : true, autoOpen : false }); //task 2.8
$('#Logout').button({icons:{primary: "ui-icon-locked"}});

var ComingTask = ' ';


var CurUser = "";
var currentDate;
var Active;
var Good;
var Poor;


var Aim = {
  x: [], 
  y: [],
  name : 'Aim',
  type: 'scatter'
};

var Performance = {
  x: [], 
  y: [],
  name : 'Performance',
  type: 'scatter'
};

//Login page call
$('#LetMeIn').click(function(){
	var username = $('#user').val();
	var pass = $('#pass').val();
	CurUser = username;
	console.log(username + " " + pass);
	
	if(username == "" && pass == ""){
		swal('No Input Values','Enter Data', 'error');
		return false;
	}

	$.ajax({
		method: 'POST',
		url : 'https://sigbackontrack.herokuapp.com/login',
		data: JSON.stringify({
			userid: username,
			password : pass
		}),
		contentType: "application/json",
	    dataType:"json", 
	}).then(printResult,username);
});


//logout page call
$('#Logout').click(function(){
	$.ajax({
		method: 'GET',
		url : 'https://sigbackontrack.herokuapp.com/logout'
	}).then(window.location = 'https://sigbackontrack.herokuapp.com');
});

function printResult(result){
	if(result.length == 0){
		swal('Invalid User','Register Via App', 'error');
			return;
	}else{
		if (typeof(Storage) !== "undefined") {
	    	// Store
	    	localStorage.setItem("CurrentUser", CurUser);
	    	// Retrieve
	    	window.location = '/datalist';
		} else {
	   		$("#CurrentUser").val(localStorage.getItem("Sorry, your browser does not support Web Storage..."));
		}
	}
}

$('#Choose-Date').button({
icons: { primary: 'ui-icon-clock'}}).click(
function() {
$('#calendar').dialog('open');
});

//2.4 Add new tasks to the to-do list
$('#new-todo').dialog({
modal : true, autoOpen : false,
buttons : {
"Add task" : function (){

var taskName = $('#task').val();
if(taskName === ""){return false;}

//ajax call to server
var ERROR_LOG = console.error.bind(console);
$.ajax({
    method: 'POST',
    url: 'https://sigbackontrack.herokuapp.com/post', 
    data: JSON.stringify({
	task: taskName
    }),
    contentType: "application/json",
    dataType:"json"
});

//Creating new row in the table
var tableHTML = '<tr><td><span class = "value1"></td>';
tableHTML += '<td><span class = "value2"></td>';
tableHTML += '<td><span class = "value3"></td></tr>';

//Assigning the correct value to right field
var $newTable = $(tableHTML);
$newTable.find('.value1').text(taskName);
$newTable.find('.value2').text(taskName);
$newTable.find('.value3').text(taskName);
$('#to-do2').prepend($newTable);

$newTable.show('clip',250).effect('highlight',1000);
$('#task').val("");
$(this).dialog('close');

},
"Cancel" : function () { $(this).dialog('close'); }
}
});


//get task list from database
function getTaskList(date){
	$("#Active").val("");
	$("#Good").val("");
	$("#Poor").val("");
	$("#Vibrate").val("");
	
	var User = localStorage.getItem("CurrentUser");
	console.log(User);
    $.ajax({
		method: 'POST',
		url : 'https://sigbackontrack.herokuapp.com/result',
		data: JSON.stringify({
			Username: User,
			Dat: date
	    }),
		contentType: "application/json",
	    dataType:"json", 
		success: function(result){
		    $('#graph').empty();
		    $('#to-do2').empty();

		    var tableHTML = '<h1 align="center">No Data For The Selected Date</h1>';
		    var $NoData = $(tableHTML); 
		    if(result.length == 0){
		    	$('#graph').prepend($NoData);
		    	return;
		    }

		    //calculating the time 
		    var OldTim = (result[0].tim).split(':');
		    var NewTim = (result[result.length-1].tim).split(':');
		    var NewDiff = new Date(0,0,0,NewTim[0],NewTim[1],NewTim[2]);
		    var OldDiff = new Date(0,0,0,OldTim[0],OldTim[1],OldTim[2]);
		    var Diff = NewDiff - OldDiff;
		    var difference = new Date(Diff);
		    Active = (difference.getHours()) + ":" + (difference.getMinutes()) +":"+difference.getSeconds();
    		    $("#Active").val(Active);

    		//calculating good and poor
    		var gd = 0;
    		var pr = 0;

		    for(var i = 0; i < result.length; i++){
				addTaskList(result[i],i);
			
				if(result[i].val >= 4 && result[i].val <= 6){
					gd++;
				}else{
					pr++;
				}
	  		}

	  		if(gd == 0 ){
	  			Good = 0;
	  		}else{
	  			Good = (((gd/result.length)*100).toFixed(0));
	  		}

	  		if(pr == 0){
	  			Poor = 0;
	  		}else{
	  			Poor = (((pr/result.length)*100).toFixed(0));
	  		}

	  		$("#Good").val(Good + ' %');
	  		$("#Poor").val(Poor + ' %');

	  		getVibration(User,date);
	  		PlotResults(Aim,Performance);
		},
		error: function(error){
			console.log("error");
		}
    });
}


//Get the number of vibrations
function getVibration(user, date){
$.ajax({
    method: 'POST',
    url: 'https://sigbackontrack.herokuapp.com/Vibrate', 
    data: JSON.stringify({
	User: user,
	Date: date
    }),
    contentType: "application/json",
    dataType:"json",
    success : function(vibrates){
    	if(vibrates.length != 0){
    		console.log('polo');
    		console.log(vibrates[0].vib);
    		$("#Vibrate").val(vibrates[0].vib);
    	}else{
    		console.log('No Vib');
    	}
    },
    error : function(error){
    	console.log('error');
    }
});
}

//Assigning the right item to the correct list
function addTaskList(data,posi){
   console.log('listing ' + data.userid);

   if(data == ' ' || data == undefined){console.log('nothing'); return;}

//Creating new row in the table
	var tableHTML = '<tr><td><span class = "userid"></td>';
	tableHTML += '<td><span class = "date"></td>';
	tableHTML += '<td><span class = "time"></td>';
	tableHTML += '<td><span class = "value"></td></tr>';

	 var datstr = data.dat;
	 var timstr = data.tim;

	//table design
	var $newTable = $(tableHTML);
	$newTable.find('.userid').text(data.userid);
	$newTable.find('.date').text(datstr.substring(0, 10));
	$newTable.find('.time').text(data.tim);
	$newTable.find('.value').text(data.val);
	//$('#to-do2').prepend($newTable);

	Aim.x.push(data.tim);
	Aim.y.push(5);
	Performance.x.push(data.tim);
	Performance.y.push(data.val);
}

//plotting
function PlotResults(Aim,Performance){
	var data = [Aim, Performance];
	var layout = {
		xaxis:{
			title: 'Time'
		},
		yaxis: {
			title: 'Performance'
		}
	};
	Plotly.newPlot('graph', data, layout);
}

//2.6 Support drag and drop
$('.sortlist').sortable({
	connectWith : '.sortlist',
	cursor : 'pointer',
	placeholder : 'ui-state-highlight',
	cancel : '.delete,.edit',
	
	//triggering the sending list
	receive : function(event,ui){
		drag(ui); //undertake the dragging
	}
});


//Calendar
$(function() {
    $( "#datepicker-12" ).datepicker();
    $( "#datepicker-12" ).datepicker('show');
    $( "#datepicker-12" ).datepicker("setDate", "0");
});

//Calendar dialog
$('#calendar').dialog({
modal : true, autoOpen : false,
buttons : {
 "Run" : function(){
 			Aim.x = [];
 			Aim.y = [];
 			Performance.x = [];
 			Performance.y = [];
 			currentDate = $( "#datepicker-12" ).val();
 			$("#day").val(currentDate);
    		console.log(currentDate);
    		var chunks = currentDate.split('/');
    		var DatabaseFormat = chunks[2]+'-'+chunks[0]+'-'+chunks[1]; 
    		console.log(DatabaseFormat);
    		getTaskList(DatabaseFormat);

			$(this).dialog('close');
 		},
 "Close" : function(){$(this).dialog('close');}
}
});

$("#CurrentUser").val(localStorage.getItem("CurrentUser"));
console.log(Aim);
console.log(Performance);
}); // end ready



