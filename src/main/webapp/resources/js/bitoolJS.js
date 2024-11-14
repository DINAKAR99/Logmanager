var rURL = 'https://tejasvi.gov.in/api';
function doFrameBI(url, id){
    var res = url.split("/");
    var keyToken = res[res.length-1];
   // var n = url.indexOf("public-page-view");
    var url2= url.replace('/'+keyToken, '');
    loadDoc(keyToken, url2, id);
  
}
function doFilterFrameBI(url, id, user){
  var res = url.split("/");
  var keyToken = res[res.length-1];
  var url2= url.replace('/'+keyToken, '');
  loadDocFilter(keyToken, url2, id, user);

}

function loadDoc(keyToken, url2, id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log((JSON.parse(this.responseText)).accesToken);
        var accessToken= (JSON.parse(this.responseText)).accesToken;
        var iframe = document.createElement('iframe');
        iframe.style.display = "block";
        iframe.src = url2+'/accessToken/'+accessToken;
        //iframe.src = "http://localhost:4200/public-page-view"+'/accessToken/'+accessToken;
       //iframe.src = "http://localhost:4200/";
        console.log(iframe.src);
        document.getElementById(id).appendChild(iframe);
        iframe.style.width="100%";
        iframe.style.height="100%";

    }
  };
  xhttp.open("GET", rURL+"/embed/getAccesToken?key="+keyToken, true);
  xhttp.send();
}
function loadDocFilter(keyToken, url2, id, user) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log((JSON.parse(this.responseText)).accesToken);
        var accessToken= (JSON.parse(this.responseText)).accesToken;
        var iframe = document.createElement('iframe');
        iframe.style.display = "block";
        iframe.src = url2+'/accessToken/'+accessToken+'/'+user;
        //iframe.src = "http://localhost:4200/public-page-view"+'/accessToken/'+accessToken+'/'+user;
       //iframe.src = "http://localhost:4200/";
        console.log(iframe.src);
        document.getElementById(id).appendChild(iframe);
        iframe.style.width="100%";
        iframe.style.height="100%";

    }
  };
  xhttp.open("GET", rURL+"/embed/getAccesToken?key="+keyToken, true);
  xhttp.send();
}