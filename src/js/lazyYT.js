;(function($) {
    'use strict';

function getProtocol () {
  getProtocol.p = getProtocol.p || (location.protocol === 'https:' ? 'https://' : 'http://');
  return getProtocol.p;
}

function parseHref (href) {
  var a = document.createElement('a');
  a.href = href;
  return a;
}

function findVideoId (href, forceVideo) {
  if (typeof href !== 'string') return href;
  href = parseHref(href);

  var id,
      type;

  if (href.host.match(/youtube\.com/) && href.search) {
    //.log();
    id = href.search.split('v=')[1];
    if (id) {
      var ampersandPosition = id.indexOf('&');
      if (ampersandPosition !== -1) {
        id = id.substring(0, ampersandPosition);
      }
      type = 'youtube';
    }
  } else if (href.host.match(/youtube\.com|youtu\.be/)) {
    id = href.pathname.replace(/^\/(embed\/|v\/)?/, '').replace(/\/.*/, '');
    type = 'youtube';
  } else if (href.host.match(/vimeo\.com/)) {
    type = 'vimeo';
    id = href.pathname.replace(/^\/(video\/)?/, '').replace(/\/.*/, '');
  }

  if ((!id || !type) && forceVideo) {
    id = href.href;
    type = 'custom';
  }

  return id ? {id: id, type: type, s: href.search.replace(/^\?/, ''), p: getProtocol()} : false;
}

    function setUp($el, settings) {
        var width = $el.attr('data-width'),
            height = $el.attr('data-height'),
            padding_bottom,
            innerHtml = [],
            $thumb,
            thumb_img,
            loading_text = $el.text() ? $el.text() : settings.loading_text;

        // if ($el.data('youtube-id')) {
        //     var provider = "youtube"
        //     var id = $el.data('youtube-id')
        // } else {
        //     var provider = "vimeo"
        //     var id = $el.data('vimeo-id')
        // }

        var url = $el.attr('data-video-url');

        var details = findVideoId(url);

        var id = details.id,
            provider = details.type;



        //
        // This HTML will be placed inside 'lazyYT' container
        innerHtml.push('<div class="ytp-thumbnail">');
        // Play button from YouTube (exactly as it is in YouTube)
        innerHtml.push('<div class="ytp-large-play-button"');
        if (width <= 640) innerHtml.push(' style="transform: scale(0.563888888888889);"');
        innerHtml.push('>');
        innerHtml.push('<svg>');
        innerHtml.push('<path fill-rule="evenodd" clip-rule="evenodd" fill="#1F1F1F" class="ytp-large-play-button-svg" d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z"></path>');
        innerHtml.push('<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="33.3,41.4 33.3,17.75 56,29.6"></polygon>');
        innerHtml.push('</svg>');
        innerHtml.push('</div>'); // end of .ytp-large-play-button
        innerHtml.push('</div>'); // end of .ytp-thumbnail
        $el.html(innerHtml.join(''));
        $el.removeClass('lazyYT-video-loaded');
        $el.find('.ytp-thumbnail').css({
            width: '100%;',
            height: $el.outerHeight() + 'px',
            'padding-bottom': '0px'
        });
        if (provider == "youtube") {
            thumb_img = 'hqdefault.jpg';
            $el.find('.ytp-thumbnail').css({
                'background-image': ['url(http://img.youtube.com/vi/', id, '/', thumb_img, ')'].join('')
            })
        }
        if (provider == "vimeo") {
            $.getJSON('http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/' + id, function(data) {
                $el.find('.ytp-thumbnail').css({
                    'background-image': ['url(', data.thumbnail_url, ')'].join('')
                });
            });
        }
        $thumb = $el.find('.ytp-thumbnail').addClass('lazyYT-image-loaded').one('click', function(e) {
            e.preventDefault();
            if (!$el.hasClass('lazyYT-video-loaded') && $thumb.hasClass('lazyYT-image-loaded')) {
                var params = '';
                params = $(this).parent().attr('data-parameters') || '';                
                if (provider == "youtube") {
                    $el.html('<iframe src="//www.youtube.com/embed/' + id + '?autoplay=1&' + params + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').addClass('lazyYT-video-loaded');
                }
                if (provider == "vimeo") {
                    $el.html('<iframe src="//player.vimeo.com/video/' + id + '?autoplay=1&"' + params +' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').addClass('lazyYT-video-loaded');
                }
            }
        });
    }
    $.fn.lazyYT = function(newSettings) {
        var defaultSettings = {
            loading_text: 'Loading...',
            default_ratio: '16:9',
            callback: null, // ToDO execute callback if given
            container_class: 'lazyYT-container'
        };
        var settings = $.extend(defaultSettings, newSettings);
        return this.each(function() {
            var $el = $(this).addClass(settings.container_class);
            setUp($el, settings);
        });
    };
}(jQuery));