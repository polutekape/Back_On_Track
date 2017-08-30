$(document).ready(function(e) {
$('#add-to').button({icons:{primary: "ui-icon-circle-plus"}});
$('#new-todo').dialog({ modal : true, autoOpen : false });
$('#con-del').dialog({ modal : true, autoOpen : false }); //task 2.8
//$('#edit').dialog({ modal : true, autoOpen : false });

var currentTask;
var ComingTask = ' ';

$('#add-todo').button({
icons: { primary: 'ui-icon-circle-plus'}}).click(
function() {
$('#new-todo').dialog('open');
});

$('#clear-hex').button({
icons: { primary: 'ui-icon-circle-minus'}}).click(
function() {
$('#con-del').dialog('open');
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
	url: 'http://localhost:8081/post',
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
		url : 'http://localhost:8081/task',
		success: function(result){
			$('#todo-list').empty();
			for(i = 0; i < result.length; i++){
				console.log('added on client ' +  result[i]);
				ComingTask = result[i];
				addTaskList(ComingTask);
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
	var tableHTML = '<tr><td><span class = "value1"></td>';
	tableHTML += '<td><span class = "value2"></td>';
	tableHTML += '<td><span class = "value3"></td></tr>';

	//table design
	var $newTable = $(tableHTML);
	$newTable.find('.value1').text(taskName);
	$newTable.find('.value2').text(taskName);
	$newTable.find('.value3').text(taskName);
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
 			url: 'http://localhost:8081/delete',
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
function rand() { 
  return Math.random();
}

Plotly.plot('graph', [{
  y: [1,2,3].map(rand),
  mode: 'lines',
  line: {color: '#80CAF6'}
}]);

var cnt = 0;
var interval = setInterval(function() {
  
Plotly.extendTraces('graph', {
    y: [[rand()]]
}, [0])

 if(cnt === 100) clearInterval(interval);
}, 300);


   
getTaskList();

}); // end ready



