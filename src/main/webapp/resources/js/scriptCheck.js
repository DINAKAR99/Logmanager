$(document).ready(function() {
	var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*/gi;
//	var SCRIPT_REGEX = "/(<)(script[^>]*>[^<]*(?:<(?!\/script>)[^<]*)*<\/script>|\/?\b[^<>]+>|!(?:--\s*(??:\[if\s*!IE]>\s*-->)?[^-]*(?:-(?!->)-*[^-]*)*)--|\[CDATA[^\]]*(?:](?!]>)[^\]]*)*]])>)|(e)/gi"; 
	
	$(':text').keypress(function() {
		if (SCRIPT_REGEX.test(this.value))
		{
			this.value="";
			this.focus();
		  }
});
	$('textarea').keypress(function() {
		if (SCRIPT_REGEX.test(this.value))
		{
			this.value="";
			this.focus();
			
		  }
		
	    //$('form').attr('autocomplete', 'off');
		  
});
	
	$(':text').focusout(function() {
	if (SCRIPT_REGEX.test(this.value))
	{
		this.value="";
		this.focus();
	  }
});
$('textarea').focusout(function() {
	if (SCRIPT_REGEX.test(this.value))
	{
		this.value="";
		this.focus();
		
	  }
	  
});



$('input').focusout(function() {
	if (SCRIPT_REGEX.test(this.value))
	{
		this.value="";
		this.focus();
		
	  }
	  
});
	
	
	
$('input').keypress(function() {
		if (SCRIPT_REGEX.test(this.value))
		{
			this.value="";
			this.focus();
			
		  }
		  
});

$("form").attr("autocomplete", "off");
	
});