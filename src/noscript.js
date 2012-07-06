/* A polyfill to expose textContent for a NOSCRIPT tag in all browsers
/* Copyright James Westgate 2012 */
/* Dual licensed under the MIT and GPL licenses */


(function() {

	var retry = 0;

	var t = setTimeout(function() {

		if (document.body) {
			var div = document.createElement("div");
			div.innerHTML = "<noscript><span></span></noscript>";
			
			var elements = div.getElementsByTagName("noscript");

			if (elements.length && elements[0].textContent) return; //No polyfill required

			//Re-request the page via ajax
			patchHttpRequest();
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function() {
				
				if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
					
					var regex = /<noscript[^>]*?>(.*?)<\/noscript>/igm;
					var tags = document.getElementsByTagName("noscript");
					var results = [], response = xmlhttp.responseText;
					var i=0, len=tags.length;

					while (i < len && results) {
						results = regex.exec(response);
						tags[i].textContent = results[1];
						i++;
					}
				}
			}

			xmlhttp.open("GET", window.location, true);
			xmlhttp.send();
		}
		else {
			retry ++;
			if (retry > 50) return; //give up after > 1 second
			t = setTimeout(arguments.callee, 20); //Retry in 20 milliseconds
		}

	}, 0);

	function patchHttpRequest() {

		//Patch XMLHttpRequest if required
		if (typeof window.XMLHttpRequest === 'undefined' && typeof window.ActiveXObject === 'function') {
 
		    window.XMLHttpRequest = function() {
		        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
		        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
		        return new ActiveXObject('Microsoft.XMLHTTP');
		    };
		}
	}

})();





