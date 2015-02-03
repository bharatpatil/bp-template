/* required by splash page */
function getURLParameter() {
    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));		
	qs.experimental = 1;	
   return qs;
}

function isWeChatRequest(queryParams) {
	if(queryParams.plugin != undefined && queryParams.plugin == 'wechat') {
		return true;
	}
	else {
		return false;
	}
}

function decideContent() {
	var queryParams = 	getURLParameter();
	var status = isWeChatRequest(queryParams);

	if (status === true) {
		// setTimeout(function(){
			var totalItems = $('#atn-plugin-carousel li').length;
			if( totalItems> 1 ) {
				var atnBxSlider200 = $('#atn-plugin-carousel').data('bxslider');
				var slideNumber = $('#atn-plugin-carousel li div[data-slide="wechat"]').closest('li').index();
				if(isNaN(slideNumber) === false){ 
						atnBxSlider200.goToSlide(slideNumber);
				}
			}
		// },200);
		$("#right-section").hide();
		$("#wechat-section").show();
		var weChatAuthUrl = queryParams.wechat_auth_url;
		if (weChatAuthUrl === undefined) {
			weChatAuthUrl = "#"
		} else {
			//setTimeout(function() { moveon(weChatAuthUrl); }, 3000);	
			window.location = weChatAuthUrl;
		}
	} else {
		$("#right-section").show();
		$("#wechat-section").hide();
	}


}

function moveon(url) {
	window.location = url;
}

$(function(){
	decideContent();
});