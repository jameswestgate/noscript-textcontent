/* A polyfill to expose textContent for a NOSCRIPT tag in all browsers
/* Copyright James Westgate 2012 */
/* Dual licensed under the MIT and GPL licenses */


(function() {

	var div = document.createElement("div");
	div.innerHTML = "<noscript><span></span></noscript>";
	
	var elements = div.getElementsByTagName("noscript");
	if (elements.length && elements[0].textContent) return; //No polyfill required

	//Re-request the page via ajax
	//Patch XMLHttpRequest if required
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //For IE6 and below only, good enough for our purposes
	xmlhttp.open("GET", window.location, false); //syncronous call since we need to block
	xmlhttp.send();

	//Process the response
	var tags = document.getElementsByTagName("noscript");
	var regex = /<noscript>(.*?)<\/noscript>/igm; 
	var results, response = xmlhttp.responseText;
	var i=0, len=tags.length;

	while (i < len) {
		results = regex.exec(response);
		if (results) tags[i].textContent = results[1];
		i++;
	}
})();





