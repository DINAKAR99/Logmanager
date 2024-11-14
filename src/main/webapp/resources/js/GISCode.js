function getLatLong(tempAppId) {
	
	var url="https://gis.cgg.gov.in/tsrow/index.html?appid="+tempAppId;
	window.open(url,'popup', 'width:800px,height:800px'); 
	
	/* var myWindow = window.open("", "MsgWindow", "width=200,height=100");
	myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");  */
}

var win;
$(window).load(function() {
$('#button').click(function(){
openPopup();
});
$('#button1').click(function(){
	openPopup();
	});
});

function openPopup() {
var left = (screen.width/2);
var top = (screen.height/2);
var popWidth = 800;
var popHeight = 600;
var popTop = top - popHeight/2;
var popLeft = left - popWidth/2;
if(win && !win.closed){ //checks to see if window is open
win.focus();
} else {
	tempAppId=$('#GISTempId').val();
	win = window.open('https://gis.cgg.gov.in/tsrow/index.html?appid='+tempAppId, 'Example_window', 'height=' + popHeight + ',width=' + popWidth + ',resizeable=0, top=' + popTop + ', left=' + popLeft);
	win.focus();
}
}

function polling(){
if (win && win.closed) {
clearInterval(timer);
tempAppId=$('#GISTempId').val();
$.post( "${pageContext.request.contextPath}/public/common/getLatLongs?tempAppId="+tempAppId+"", function(data) {
x=data.split(",")[0];
y=data.split(",")[1];
$("#land_latitude").val(x);
$("#land_longitude").val(y);
$("#bldg_latitude").val(x);
$("#bldg_longtide").val(y);
});
alert('popup window is closed.');
}
}
timer = setInterval('polling()',1000);

/**
* This javascript file checks for the brower/browser tab action.
* It is based on the file menstioned by Daniel Melo.
* Reference: http://stackoverflow.com/questions/1921941/close-kill-the-session-when-the-browser-or-tab-is-closed
*/
var validNavigation = false;

function endSession() {
// Browser or broswer tab is closed
// Do sth here ...
win.close();

alert("Browser window closed");
}

function wireUpEvents() {
/*
* For a list of events that triggers onbeforeunload on IE
* check http://msdn.microsoft.com/en-us/library/ms536907(VS.85).aspx
*/
window.onbeforeunload = function() {
if (!validNavigation) {
endSession();
}
}

// Attach the event keypress to exclude the F5 refresh
$('html').bind('keypress', function(e) {
if (e.keyCode == 116){
validNavigation = true;
}
});

// Attach the event click for all links in the page
$("a").bind("click", function() {
validNavigation = true;
});

// Attach the event submit for all forms in the page
$("form").bind("submit", function() {
validNavigation = true;
});

// Attach the event click for all inputs in the page
$("input[type=submit]").bind("click", function() {
validNavigation = true;
});

}

// Wire up the events as soon as the DOM tree is ready
$(document).ready(function() {
wireUpEvents();
});