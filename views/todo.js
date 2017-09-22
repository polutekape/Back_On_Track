$(document).ready(function(e) {
$('#add-todo').button({icons:{primary: "ui-icon-circle-plus"}});
$('#new-todo').dialog({ modal : true, autoOpen : false });
$('#calendar').dialog({ modal : true, autoOpen : true });
$('#con-del').dialog({ modal : true, autoOpen : false }); //task 2.8

var currentTask;
var currentDate;
var ComingTask = ' ';


$('#add-todo').button({
icons: { primary: 'ui-icon-circle-plus'}}).click(
function() {
	$('#new-todo').dialog('open');
});


//Login page call
$('#LetMeIn').click(function(){
	var username = $('#user').val();
	var password = $('#pass').val();

	if(username == 'kapz' && password == 'polo'){
		//let it go through
	}else{
		swal('Failed','Invalid Text','error');
	}
});

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
	//url: 'http://localhost:8081/post',
    url: '/post', 
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
function getTaskList(){
    $.ajax({
	method: 'GET',
	url : 'http://localhost:8081/result',
	//url: '/results',
	success: function(result){
	    $('#todo-list').empty();
	    for(i = 0; i < result.length; i++){
		console.log('added on client ' +  result[i]);
		ComingTask = result[i];
		//addTaskList(ComingTask);
	    }
	}
    })
}

//assigning the right item to the correct list
function addTaskList(data){
   var taskName = ComingTask;
   console.log('listing ' + taskName);

   if(taskName == ' ' || taskName == undefined){console.log('nothing'); return;}

//Creating new row in the table
	var tableHTML = '<tr><td><span class = "userid"></td>';
	tableHTML += '<td><span class = "date"></td>';
	tableHTML += '<td><span class = "time"></td>';
	tableHTML += '<td><span class = "value"></td>';

	//table design
	var $newTable = $(tableHTML);
	$newTable.find('.userid').text(taskName);
	$newTable.find('.date').text(taskName);
	$newTable.find('.time').text(taskName);
	$newTable.find('.value').text(taskName);
	$('#to-do2').prepend($newTable);

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


//2.8 confirmation deletion task
$('#con-del').dialog({
modal : true, autoOpen : false,
buttons : {
 "Confirm" : function(){
		$('#todo-list').empty();
		$('#to-do2').empty();
  		$.ajax({
 			method: 'DELETE',
 			url: '/delete',
 			data: JSON.stringify({
 				task: 'delete'
 			}),
 			dataType: 'json',
 			contentType: 'application/json; charsett=utf-8'
 		})
 			$(this).dialog('close');
 	},
 "Cancel" : function(){$(this).dialog('close');}
}
});


//2.9 values for the graph
/*function rand() { 
  return Math.random();
}

Plotly.plot('graph', [{
  y: [1,2,3].map(rand),
  mode: 'lines',
  line: {color: '#80CAF6'}
}]);

var cnt = 0;

var interval = setInterval(function(){
  
Plotly.extendTraces('graph', {
    y: [[rand()]]
}, [0])

 if(cnt === 10) clearInterval(interval);
}, 300);*/

var Aim = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
  y: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  name : 'Aim',
  type: 'scatter'
};
var Performance = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
  y: [0, 2, 5, 8, 6, 7, 5, 4, 3, 2, 4], 
  name : 'Performance',
  type: 'scatter'
};
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
 			currentDate = $( "#datepicker-12" ).val();
 			$("#day").val(currentDate);
    		console.log(currentDate);
 			$(this).dialog('close');
 		},
 "Close" : function(){$(this).dialog('close');}
}
});



getTaskList();

}); // end ready



