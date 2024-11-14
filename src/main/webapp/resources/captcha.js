 var genCaptcha1 = '';
 function Captcha1(){
	 var canvasVar = document.getElementById('textCanvas1')
     var tCtx = canvasVar.getContext('2d'),
    imageElem = document.getElementById('captchaImage1');
	 console.log(canvasVar , tCtx);
	var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	 	
 	    	'0','1','2','3','4','5','6','7','8','9');
     var i;
     var a,b,c,d,e,f,g;
     for (i=0;i<5;i++){
         a= alpha[Math.floor(Math.random() * alpha.length)];
         b = alpha[Math.floor(Math.random() * alpha.length)];
         c = alpha[Math.floor(Math.random() * alpha.length)];
         d = alpha[Math.floor(Math.random() * alpha.length)];
         e = alpha[Math.floor(Math.random() * alpha.length)];
         f = alpha[Math.floor(Math.random() * alpha.length)];
         //g = alpha[Math.floor(Math.random() * alpha.length)];
                      }
         var code = a  + b + c + d + e + f;// + g;
		 var codeWithSpaces = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f +' ';//+ ' ' + g + ' ';
		console.log(code + codeWithSpaces);
		genCaptcha1 = code;
		//console.log('>>>>>',tCtx.measureText("llll"));
		
	tCtx.canvas.width = tCtx.measureText(codeWithSpaces).width+50;
	tCtx.fillStyle = "#000000";
	tCtx.fillRect(0, 0, 300, 200);
	console.log(tCtx.canvas.width );
    //tCtx.fillText(codeWithSpaces, 0, 10);
    //alert(tCtx.canvas.toDataURL());
    //imageElem.src = tCtx.canvas.toDataURL();
    
    var ctx = canvasVar.getContext('2d');
    ctx.font = "18px arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("   "+code, 50,17);
    imageElem.src = ctx.canvas.toDataURL();
    
	
       }
 
 
function ValidCaptcha1(){
     var string1 = genCaptcha1;
     var string2 = removeSpaces1(document.getElementById('captchaInput1').value);
     if (string1 == string2){
            return true;
     }else{        
          return false;
          }
}
function removeSpaces1(string){
     return string.split(' ').join('');
}








var genCaptcha2 = '';
function Captcha2(){
	 var canvasVar = document.getElementById('textCanvas2')
    var tCtx = canvasVar.getContext('2d'),
   imageElem = document.getElementById('captchaImage2');
	 console.log(canvasVar , tCtx);
	var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	 	
	    	'0','1','2','3','4','5','6','7','8','9');
    var i;
    var a,b,c,d,e,f;//,g;
    for (i=0;i<5;i++){
        a= alpha[Math.floor(Math.random() * alpha.length)];
        b = alpha[Math.floor(Math.random() * alpha.length)];
        c = alpha[Math.floor(Math.random() * alpha.length)];
        d = alpha[Math.floor(Math.random() * alpha.length)];
        e = alpha[Math.floor(Math.random() * alpha.length)];
        f = alpha[Math.floor(Math.random() * alpha.length)];
        //g = alpha[Math.floor(Math.random() * alpha.length)];
                     }
        var code = a  + b + c + d + e + f;// + g;
		 var codeWithSpaces = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f +' ';//+ ' ' + g + ' ';
		console.log(code + codeWithSpaces);
		genCaptcha2 = code;
		//console.log('>>>>>',tCtx.measureText("llll"));
		
	tCtx.canvas.width = tCtx.measureText(codeWithSpaces).width+50;
	tCtx.fillStyle = "#000000";
	tCtx.fillRect(0, 0, 300, 200);
	console.log(tCtx.canvas.width );
   //tCtx.fillText(codeWithSpaces, 0, 10);
   //alert(tCtx.canvas.toDataURL());
   //imageElem.src = tCtx.canvas.toDataURL();
   
   var ctx = canvasVar.getContext('2d');
   ctx.font = "18px arial";
   ctx.fillStyle = "white";
   ctx.textAlign = "center";
   ctx.fillText(code, 50,17);//"   "+
   imageElem.src = ctx.canvas.toDataURL();
   
	
      }


function ValidCaptcha2(){
    var string1 = genCaptcha2;
    var string2 = removeSpaces2(document.getElementById('captchaInput2').value);
    if (string1 == string2){
           return true;
    }else{        
         return false;
         }
}
function removeSpaces2(string){
    return string.split(' ').join('');
}


