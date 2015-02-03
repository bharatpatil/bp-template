/* required by splash page */
function page_init() {
	var params = {}; 
	if (location.search) {
		var url_parts = location.search.split('?');
		params.all_params_str = url_parts[1];
		var param_val_list = params.all_params_str.split('&');
		
		for (var idx = 0; idx < param_val_list.length; idx++)
		{
			var param_val_pair = param_val_list[idx].split('=');
			if (!param_val_pair[0]) continue;
			params[param_val_pair[0]] = param_val_pair[1] || true ;
		} 

	}
	if (params.blackout_time && params.blackout_time != "0")
		{
		//Set and start blackout time timer if required
		var a=document.getElementById("splash_msg");
		a.setAttribute("btime",gup('blackout_time'));	
		toggle_splash_msg();javascript_countdown.init(get_btime(),"javascript_countdown_time");
		}
	else
		{
		if (params.res == "failed")
			document.write("<p>Oops authentication failed!! Try Again.</p>");
		else if (params.res == "logoff")
			window.location="logout.html";
		else
			document.write("");
		}
	
	//Check for cookies
	if(!are_cookies_enabled()) document.getElementById("cookie_msg").innerHTML = "Your cookies are disabled. Please enable them to login!";	
	}


//Function to check for cookies
function are_cookies_enabled(){var cookieEnabled = (navigator.cookieEnabled) ? true : false;
if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
{document.cookie="testcookie"; cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;}return (cookieEnabled);}

//Function to parse HTTP query string
function gup( name ){name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  var regexS = "[\\?&]"+name+"=([^&#]*)";
var regex = new RegExp( regexS ); var results = regex.exec( window.location.href );
if( results == null )    return "";  else    return results[1];}

//Timer function
function toggle_splash_msg(){var a=document.getElementById("splash_msg");var b=a.getAttribute("btime");a.setAttribute("btime",b);b=a.getAttribute("btime");if(b=="0"){a.style.display="none"}else{a.style.display="block"}}function set_btime(a){var b=document.getElementById("splash_msg");b.setAttribute("btime",a)}function get_btime(){return document.getElementById("splash_msg").getAttribute("btime")}var javascript_countdown=function(){function d(){if(a<2){c=0}a=a-1}function e(a){if(a.toString().length<2){return"0"+a}else{return a}}function f(){var b,c,d;d=a%60;c=Math.floor(a/60)%60;b=Math.floor(a/3600);d=e(d);c=e(c);b=e(b);return b+":"+c+":"+d;set_btime(a)}function g(){document.getElementById(b).innerHTML=f()}function h(){set_btime(0);toggle_splash_msg()}var a=10;var b="javascript_countdown_time";var c=1;return{count:function(){d();g()},timer:function(){javascript_countdown.count();if(c){setTimeout("javascript_countdown.timer();",1e3)}else{h()}},init:function(c,d){a=c;b=d;javascript_countdown.timer()}}}();