/* required by splash page */
// https://developers.google.com/youtube/iframe_api_reference

// global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)
  player = new YT.Player('atnYoutubeVideoFrame', {
    events: {
      // call this function when player is ready to use
      'onStateChange': onPlayerStateChange
    }
  });
}

// when video ends
function onPlayerStateChange(event) {        
    if(event.data === 0) {          
        $('#btnVideoButton').show();
    }
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);