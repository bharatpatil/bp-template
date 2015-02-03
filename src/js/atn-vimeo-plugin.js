/* required by splash page */
$(function() {
    var player = $('iframe#vimeoFrame');
    var url = window.location.protocol + player.attr('src').split('?')[0];
    var status = $('.status');

    // Listen for messages from the player
    if (window.addEventListener){
        window.addEventListener('message', onMessageReceived, false);
    }
    else {
        window.attachEvent('onmessage', onMessageReceived, false);
    }

    // Handle messages received from the player
    function onMessageReceived(e) {
        var data = JSON.parse(e.data);
        
        switch (data.event) {
            case 'ready':
                onReady();
                break;
               
            case 'playProgress':
                break;
                
            case 'pause':
                break;
               
            case 'finish':
                $('#btnVideoButton').show();
                break;
        }
    }

    // Helper function for sending a message to the player
    function post(action, value) {
        var data = {
          method: action
        };
        
        if (value) {
            data.value = value;
        }
        
        var message = JSON.stringify(data);
        player[0].contentWindow.postMessage(data, url);
    }

    function onReady() {
        status.text('ready');
        
        post('addEventListener', 'pause');
        post('addEventListener', 'finish');
        post('addEventListener', 'playProgress');
    }

});