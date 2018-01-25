/**
 * Creates a new player and places it to container with the specified id.
 *
 * @example
 * // Create a video player
 * var player = wjplayer({
 *  containerId: 'player-container',
 *   sources: [{
 *     src: '//vjs.zencdn.net/v/oceans.mp4',
 *     type: 'video/mp4'
 *   }]
 * );
 *
 * // Specify resolution and label of each source
 * var player = wjplayer({
 *  containerId: 'player-container',
 *  defaultQuality: 'high',
 *  // sourcesWithRes array will be passed to videojs-resolution-switcher
 *  sourcesWithRes: [
 *  {
 *    src: 'path-to-video-low-quality.m3u8',
 *    type: 'application/x-mpegURL',
 *    res: 360,
 *    label: 'SD'
 *  },
 *  {
 *    src: 'path-to-video-high-quality.m3u8',
 *    type: 'application/x-mpegURL',
 *    res: 720,
 *    label: 'HD'
 *  }]
 * });
 *
 * // Create an audio player
 *  var audioPlayer = wjplayer({
 *    containerId: 'player-container',
 *    playerType: 'audio',
 *    sources: [{
 *      src: '//vjs.zencdn.net/v/oceans.mp3',
 *      type: 'video/mp3'
 *    }]
 *  });
 *
 *  // Insert ads
 *  var player = wjplayer({
 *    containerId: 'player-container',
 *    sources: [{
 *      src: '//vjs.zencdn.net/v/oceans.mp4',
 *      type: 'video/mp4'
 *    }],
 *    ads: {
 *      adTagUrl: '//example.com/vmap.xml'
 *    }
 *  });
 *
 * @param {Object} options
 *   Configuration options.
 *
 * @param {String} options.containerId
 *   REQUIRED id of the container
 *   where player shoud be inserted (appendChild() will be used)
 *
 * @param {Array} options.sources
 *   REQUIRED IF `sourcesWithRes` IS NOT PROVIDED
 *   Array of sources to pass to player.src()
 *   @see http://docs.videojs.com/docs/api/player.html#Methodssrc
 *
 * @param {Array} options.sourcesWithRes
 *   REQUIRED IF `sources` IS NOT PROVIDED
 *   Array of sources to pass to player.updateSrc()
 *   @see https://github.com/kmoskwiak/videojs-resolution-switcher#updatesrcsource
 *
 * @param {String} options.playerId
 *   id to assign to the player element.
 *   Defaults to "player"
 *
 * @param {String} options.playerType
 *   "video" or "audio"
 *   Defaults to "video"
 *
 * @param {String|Number} options.defaultQuality
 *   "low", "high" or Number
 *   @see https://github.com/kmoskwiak/videojs-resolution-switcher#avalible-options
 *
 * @param {String} options.pathToSwf
 *   Path to flash player file (will be passed to videojs as videojs.options.flash.swf)
 *
 * @param {String} options.locale
 *  If specified, will be set as player and ads locale.
 *  This may be any ISO 639-1 (two-letter) code.
 *
 * @param {Boolean} options.autoplay
 *   Defaults to false
 *
 * @param {Boolean} options.controls
 *   Defaults to true
 *
 * @param {Boolean} options.loop
 *   The loop attribute causes the video to start over as soon as it ends.
 *   Defaults to false
 *
 * @param {String} options.preload
 *   Defaults to "metadata"
 *
 * @param {String} options.poster
 *   The width attribute sets the display width of the video (in pixels).
 *   This will take effect only if `options.classes` param is set
 *   (`vjs-fill` class, used by defaults, sets player width and height to 100%).
 *
 * @param {Number} options.width
 *   The height attribute sets the display height of the video (in pixels).
 *
 * @param {Number} options.height
 *   Player height
 *
 * @param {Object} options.videojs
 *   Any additilnal ptions to pass to videojs.
 *   @see  http://docs.videojs.com/docs/guides/options.html
 *
 * @param {Boolean} options.muted
 *   Indicates whether the player should be muted by default.
 *   Defaults to false
 *
 * @param {Boolean} options.playsinline
 *   Indicated whether the video should be allowed to play inline,
 *   and will not automatically enter fullscreen mode when playback begins.
 *   @see https://webkit.org/blog/6784/new-video-policies-for-ios/
 *   Defaults to false.
 *
 * @param {String} options.skin
 *   Skin name.
 *   Defaults to "default"
 *
 * @param {Array} options.classes
 *   CSS classnames to assign to the player in addition to `video-js`.
 *   By default, the following classes are used:
 *   `['vjs-default-skin',
 *   'vjs-fill',
 *   'vjs-big-play-centered']`
 *
 * @param {Boolean} options.stretch
 *   Indicates whether video should stretch to fit the container.
 *   Defaults to false
 *
 * @param {Boolean} options.playOnClick
 *   If true, click/touch event on player will start/stop the playback even if controls are disabled.
 *   Defaults to false
 *
 * @param {Boolean|Object} options.downloadButton
 *   Indicates whether a download button should be shown in control bar.
 * @param {String} options.downloadButton.text
 *   Button title.
 *   Defaults to "Download"
 *
 * @param {String} options.volumeStyle
 *   "horizontal" or "vertical".
 *   Defaults to "vertical"
 *
 * @param {Boolean|Object} options.panorama
 *   Used for pamoramic (360-degree) videos.
 *   Pass true or options object for videojs-panorama plugin
 *   @see https://github.com/yanwsh/videojs-panorama
 *   Defaults to false
 *
 * @param {String} options.crossorigin
 *   Used with videojs-panorama plugin.
 *   Pass "anonymous" to avoid cross domain issue
 *   (will work on Chrome and Firefox, not Safari)
 *   @see https://github.com/yanwsh/videojs-panorama#cross-domian-issue
 *
 * @param {Object} options.ads
 *   Settings for videojs-ima plugin.
 *   @see https://github.com/googleads/videojs-ima#additional-settings
 * @param {String} options.ads.adTagUrl
 *   Tag url. The only requried setting here.
 * @param {String} options.ads.adLabel
 *   Replaces the "Advertisement" text in the ad label.
 * @param {Boolean} options.ads.showControlsForJSAds
 *   Defaults to false
 *
 * @param {Object} options.share
 *   Will be passed to videojs-share plugin.
 *   @see https://github.com/neuron-digital/videojs-share for details.
 * @param {String} [options.share.url]
 *   This is the URL that points to your custom web page
 *   which has your video and the meta tags for sharing.
 *   Defaults to the current page url.
 * @param {String} [title]
 * @param {String} [description]
 * @param {String} [options.share.embedCode]
 *   Iframe embed code for sharing the video.
 *   Defaults to iframe with the current page url specified as src.
 * @param {String} [options.share.image]
 *   Image to share.
 *   Defaults to options.poster.
 * @param {Array} [socials]
 *   List of social networks.
 * @param {String} [fbAppId]
 *   Required for share to Facebook.
 * @param {String} [redirectUri]
 *   Defaults to `${url}#close_window`.
 *
 * @param {Boolean} options.enableHlsSupport
 *   Set to false in order to disable any workarounds etc. that are required to make HLS support a reality.
 *   (e.g. stops forcing flash on IE11 and brings back videoJsResolutionSwitcher + ads)
 *   Defaults to true
 *
 * @return {Object} the player object.
 */
export default function wjplayer(options) {
  return new WJPlayer(options);
}

class WJPlayer {
  constructor(options) {
    if (!(typeof options === 'object' && options.containerId)) {
      throw new Error('options.containerId isn\'t specified');
    }

    this.defaults = {
      playerId: 'player',
      playerType: 'video',
      sources: [],
      sourcesWithRes: [],
      pathToSwf: '',
      poster: '',
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      playsinline: false,
      preload: 'metadata',
      volumeStyle: 'vertical',
      stretch: false,
      playOnClick: false,
      skin: 'default',
      classes: [],
      enableResolutionSwitcher: false,
      enableHlsSupport: true
    };

    this.browser = {
      IS_IOS: /iP(hone|ad|od)/i.test(navigator.userAgent),
      IS_ANDROID: /Android/.test(navigator.userAgent),
      IS_IE: document.documentMode || /Edge/.test(navigator.userAgent), // detect IE8 and above, and edge
      IS_IE11: !!window.MSInputMethodContext && !!document.documentMode,
    };
    this.browser.IS_MOBILE = this.browser.IS_IOS || this.browser.IS_ANDROID;

    this.clickEvent = this.browser.IS_MOBILE ? 'touchend' : 'click';

    this.options = videojs.mergeOptions(this.defaults, options);

    // will be passed to videojs
    this.options.videojs = videojs.mergeOptions({
      controls: this.options.controls,
      preload: this.options.preload,
      loop: this.options.loop,
      poster: this.options.poster,
      language: this.options.locale,
      html5: {
        hlsjsConfig: {}
      },
      plugins: {
        replayButton: {}
      },
      controlBar: {}
    }, this.options.videojs);

    this.options.classes = ['video-js'].concat(
      Array.isArray(options.classes)
        ? options.classes
        : ['vjs-fill', 'vjs-big-play-centered']
    );

    if (this.options.volumeStyle === 'vertical') {
      this.options.videojs.controlBar.volumeMenuButton = {
        inline: false,
        vertical: true
      };
    }

    if (this.options.playerType === 'video'
      && videojs.Hls
      && (!this.browser.IS_MOBILE || this.options.sourcesWithRes.length)) {
      if (this.browser.IS_IE11 && this.options.enableHlsSupport) {
        // https://github.com/videojs/videojs-contrib-hls/blob/ab9a3986411ca15e3b4983dc03de8d32e9c686a2/README.md#ie11
        // on IE11 force using flash
        this.options.videojs.techOrder = ['flash'];

        if (!this.options.sources.length && this.options.sourcesWithRes.length) {
          this.options.sources = this.options.sourcesWithRes;
        }

      } else {
        this.options.enableResolutionSwitcher = true;
        // will be passed to videoJsResolutionSwitcher plugin
        this.options.videojs.plugins.videoJsResolutionSwitcher = {
          default: this.options.defaultQuality,
          dynamicLabel: true
        };
      }
    }

    if (this.options.ads && this.options.ads.adTagUrl) {
      // will be passed to ima plugin
      this.options.ads = videojs.mergeOptions({
        id: this.options.playerId,
        locale: this.options.locale,
        showControlsForJSAds: false
      }, this.options.ads);
    } else {
      this.options.ads = {};
    }

    this.init();

    return this.player;
  }

  init() {
    this.createPlayer();

    if (this.options.pathToSwf) {
      videojs.options.flash.swf = this.options.pathToSwf;
    }

    // Init player
    this.player = videojs(this.options.playerId, this.options.videojs, () => {
      if (!!this.options.panorama && (this.player.panorama)) {
        this.player.panorama(typeof this.options.panorama === 'object'
          ? this.options.panorama
          : {}
        );
        window.addEventListener('resize', () => {
          const canvas = this.player.getChild('Canvas');
          return canvas.handleResize();
        });
      }

      // Init resolution switcher plugin
      if (this.options.enableResolutionSwitcher && this.options.sourcesWithRes.length) {
        this.player.updateSrc(this.options.sourcesWithRes);
      }

      // Init download button plugin
      if (this.options.downloadButton && (this.player.downloadButton)) {
        this.player.downloadButton(this.options.downloadButton);
      }

      // Init share plugin
      if (this.options.share) {
        this.options.share.image = this.options.share.image || this.options.poster;
        this.player.share(this.options.share);
      }

      if (this.options.loop) {
        this.player.loadingSpinner.hide();
      }

      // autoplay is not supported on mobile devices
      if (this.options.autoplay && !this.browser.IS_MOBILE) {
        this.initAds();
        this.play();
      } else {
        // init ads and start playback on tap
        this.player.one(this.clickEvent, () => {
          this.initAds();
          this.play();
        });
      }

      // allow to start/stop the playback on click even if controls are disabled
      if (this.options.playOnClick) {
        this.player.on(this.clickEvent, () => {
          if (this.player.paused()) {
            this.player.play();
          } else {
            this.player.pause();
          }
        });
      }
    });
    if (typeof this.player.qualityPickerPlugin === 'function') {
      this.player.qualityPickerPlugin({});
    }
  }

  createPlayer() {
    this.container = document.getElementById(this.options.containerId);

    let classes = this.options.classes;
    classes.push('vjs-' + this.options.skin + '-skin');

    if (this.browser.IS_IE) {
      classes.push('ie');
    }

    if (this.options.stretch) {
      classes.push('vjs-stretch');
    }

    const dumbPlayer = document.createElement(this.options.playerType);
    dumbPlayer.id = this.options.playerId;
    dumbPlayer.className = classes.join(' ');

    if (this.options.crossorigin) {
      dumbPlayer.setAttribute('crossorigin', this.options.crossorigin);
    }

    if (this.options.muted) {
      dumbPlayer.setAttribute('muted', '');
    }

    if (this.options.playsinline) {
      dumbPlayer.setAttribute('playsinline', '');
    }

    this.options.sources.forEach(function(source) {
      const contentSrc = document.createElement('source');
      contentSrc.setAttribute('src', source.src);
      contentSrc.setAttribute('type', source.type);
      dumbPlayer.appendChild(contentSrc);
    });

    this.container.appendChild(dumbPlayer);
  }

  play() {
    this.player.play();

    if (this.options.autoplay) {
      this.player.autoplay(true);
    }

    if (this.options.preload === 'none' && this.options.enableResolutionSwitcher) {
      // help videojs-resolution-switcher to choose the proper handleSeekEvent
      this.player.preload('metadata');
    }
  }

  initAds() {
    if (
      !this.options.ads ||
      !this.options.ads.adTagUrl ||
      !this.player.ima ||
      !window.google
    ) {
      return;
    }

    this.player.ima(this.options.ads);
    this.player.ima.initializeAdDisplayContainer();
    this.player.ima.requestAds();
  }
}
