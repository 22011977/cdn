    //See Global variables at the end of document which can be used 
	
	
	//GENERAL FUNCTIONS 
	
	
	
	/*
	CONVERT First character to Capital, other unchanged 
	=======================================================
	
	Function:
		initCap(str) 
	Parameter:  
		str:  string to be convert first character to Upper 
	Return:
		converted string 
	*/
	
	function initCap(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }	

 	
	
	/*
	Include a js file in <body>, alternate of <script src=""></script>   
	====================================================================
	
	Function:
	     includeJs(jsFileName);
		 
	Parameter:
	     jsFileName:   file name of js file with path/url
		
	syntax:  
	   includeJS("myscript.js");	
	   includeJS("/js/myscript.js");	
	   includeJS("http://example.com/myscript.js");	
	   
	*/
	
	function includeJs(jsFileName,p_defer=false) {
		js = document.createElement("script");	
		js.defer = p_defer;		
        js.type = "text/javascript";
        js.src = jsFileName;
        document.body.appendChild(js);
	}

    /*
	include [.html]/[.inc]/[.php] files into an html file 
	===========================================================
	
	Note: Jquery must be include before calling that function 
	
	Function:
	    $.include(page_name);
		  
    parameters: 
	    page_name:   file with path whose contents to be included into document where thsis function called
		
	syntax:  
    	<script>$.include("header.html");</script>
		
	    write above line where want to put data from header.html	
    */	
	
    (function ($) {
		$.include = function (page_name) {
			$.ajax({ 
				url: page_name,
				async: false,
				success: function (result) {
					document.write(result);
				}
			});
		};
	}(jQuery));    
		 
	   
	/*
	Extract all Parameteres from URL and result in an key/value pair array
	=======================================================================
	
	Note: 
	    parameter name will become the key 
		
	Function: 
        getParams(); 	
		
	Return:	
	    key/value pair array, parameter name will become the keys 
		
	Syntax:
	     if you want to fetch value of a parameter e.g "pageName" 
		      
		        p=getParams();
				pageName = p["pageName"];   //extract value of pageName parameter from url 
	*/   
	 
	function getParams() {
		var params_local = {},
        pairs = document.URL.split('?').pop().split('&');
		for (var i = 0, p; i < pairs.length; i++) {
			p = pairs[i].split('=');
			params_local[ p[0] ] =  p[1];
		}     
		return params_local;
	}
	
	
	/*
	API to get response from url and send object to the an function whose name sent as 2nd parameter
	the function should be written by developer itself, it can be any function which will handle the response
	
	Note:  
	    differnet behaviour can be acheived by that function 
	function:
       loadDoc(url,cFunction)
    parameters:
       url:   any valid url (to be read) by GET method 
       cFunction:  name of the Fucntion which will be called when response will be ready 
                   if that function not exists , it will genereate error
				   developer have to write that function as its own 
				   an parameter will be sent to that function having xhttp object 
				   
				   e.g 
				   
    			   loadDoc("example.com","myFucntion");
				   
				   then developer have to write a fucntion named  "myFuncion" as below in his/her code 
				   e.g:   to display response in a div element "demo" 
				         mutiple tasks now you can do in your myFunction 
				   
				   
				   
				   
				   function myFunction(xhttp) {
					    responseText = xhttp.responseText;
						document.getElementById("demo").innerHTML =	responseText;
				   }
				   
				   
				   //convert responseText to [JSArray] or [JS Object] depends upon syntax of resposeText 
				   //if responseText not a valid JS ARRAY/JS Object error may be raised 
				   
				   function myFunction(xhttp) {
					    responseText = xhttp.responseText;
						document.getElementById("demo").innerHTML =	JSON.parse(responseText);
				   }
				   
	*/

	function loadDoc(url, cFunction) {
	  var xhttp;
	  xhttp=new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {    
		   JSON.parse(this.responseText);
		   return xhttp.responseText;
		}
	  };
	  xhttp.open("GET", url, true);
	  //xhttp.setRequestHeader('Content-Type', 'application/json');
      //xhttp.setRequestHeader('Authorization', 'Bearer <MY_ACCESS_TOKEN>');
	  xhttp.send();
	}
	
	
	
	
	//load global variables here
	var urlParams = getParams();   //get all parameters in associative array 	
	
	
  