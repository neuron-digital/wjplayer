(function() {
  var videojs = window.videojs;
  var google = window.google;
  var merge;

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
   *   Will be passed to videojs-social plugin.
   *   @see https://github.com/Go-Promo/videojs-social for details.
   * @param {String} options.share.url
   *   This is the URL that points to your custom web page
   *   which has your video and the meta tags for sharing.
   * @param {String} options.share.embedCode
   *   Iframe embed code for sharing the video.
   *
   * @return {Object} the player object.
   */
  function wjplayer(options) {
    return new WJPlayer(options);
  }

  function WJPlayer(options) {
    var defaults = {
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
      preload: 'metadata',
      volumeStyle: 'vertical',
      isMobile: navigator.userAgent.match(/Android|iPhone|iPod|iPad/),
      stretch: false,
      skin: 'default',
      classes: [],
      enableResolutionSwitcher: false
    };

    if (!(typeof options === 'object' && options.containerId)) {
      throw new Error("options.containerId isn't specified");
    }

    this.options = merge(defaults, options);

    // will be passed to videojs
    this.options.videojs = merge({
      controls: this.options.controls,
      preload: this.options.preload,
      loop: this.options.loop,
      poster: this.options.poster,
      language: this.options.locale,
      plugins: {},
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
      && (!this.options.isMobile || this.options.sourcesWithRes.length)) {
      this.options.enableResolutionSwitcher = true;
      // will be passed to videoJsResolutionSwitcher plugin
      this.options.videojs.plugins.videoJsResolutionSwitcher = {
        default: this.options.defaultQuality,
        dynamicLabel: true
      };
    }

    if (this.options.ads && this.options.ads.adTagUrl) {
      // will be passed to ima plugin
      this.options.ads = merge({
        id: this.options.playerId,
        locale: this.options.locale,
        showControlsForJSAds: false
      }, this.options.ads);
    }

    this.init();

    return this.player;
  }

  WJPlayer.prototype.init = function() {
    this.createPlayer();

    if (this.options.pathToSwf) {
      videojs.options.flash.swf = this.options.pathToSwf;
    }

    if (this.options.share) {
      videojs.addLanguage('ru', {
        'Share Video': 'Поделиться',
        'Direct Link': 'Прямая ссылка',
        'Embed Code': 'Код для встраивания плеера'
      });
    }

    // Init player
    this.player = videojs(this.options.playerId, this.options.videojs, function() {
      if (!!this.options.panorama && (this.player.panorama)) {
        this.player.panorama(typeof this.options.panorama === 'object'
          ? this.options.panorama
          : {}
        );
        window.addEventListener('resize', function() {
          var canvas;
          canvas = this.player.getChild('Canvas');
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
        this.player.social(this.options.share);
      }

      if (this.options.loop) {
        this.player.loadingSpinner.hide();
      }

      // Start playback
      if (this.options.autoplay && !this.options.isMobile) {
        this.play();
      } else if (this.placeholder) {
        this.placeholder.addEventListener('click', this.play.bind(this));
        // not always works
        // var startEvent = this.options.isMobile ? 'touchstart' : 'click';
        // this.player.one(startEvent, this.play.bind(this));
      } else {
        this.initAds();
      }
    }.bind(this));
  };

  WJPlayer.prototype.createPlayer = function() {
    var classes;
    var contentSrc;
    var dumbPlayer;

    this.container = document.getElementById(this.options.containerId);
    classes = this.options.classes;

    classes.push('vjs-' + this.options.skin + '-skin');

    if (this.options.stretch) {
      classes.push('vjs-stretch');
    }

    if (this.options.ads && this.options.isMobile) {
      this.placeholder = document.createElement('div');
      this.placeholder.id = 'player-placeholder';
      this.container.appendChild(this.placeholder);
    }

    dumbPlayer = document.createElement(this.options.playerType);
    dumbPlayer.id = this.options.playerId;
    dumbPlayer.className = classes.join(' ');

    if (this.options.crossorigin) {
      dumbPlayer.setAttribute('crossorigin', this.options.crossorigin);
    }

    if (this.options.muted) {
      dumbPlayer.setAttribute('muted', '');
    }

    this.options.sources.forEach(function(source) {
      contentSrc = document.createElement('source');
      contentSrc.setAttribute('src', source.src);
      contentSrc.setAttribute('type', source.type);
      dumbPlayer.appendChild(contentSrc);
    });

    this.container.appendChild(dumbPlayer);
  };

  WJPlayer.prototype.play = function() {
    this.initAds();
    this.player.play();
    this.options.autoplay && this.player.autoplay(true);

    if (this.placeholder) {
      this.container.removeChild(this.placeholder);
    }
  };

  WJPlayer.prototype.initAds = function() {
    if (!this.options.ads || !this.options.ads.adTagUrl || !this.player.ima) {
      return;
    }

    this.player.ima(this.options.ads, this.adsManagerLoadedCallback.bind(this));
    this.player.ima.initializeAdDisplayContainer();
    this.player.ima.requestAds();
    this.imaContainer = document.getElementById('ima-ad-container');

    if (!this.placeholder) {
      this.imaContainer.addEventListener('click', function() {
        this.player.play();
      }.bind(this));
    }
  };

  WJPlayer.prototype.adsManagerLoadedCallback = function() {
    this.player.ima.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function() {
      this.imaContainer.style.display = 'none';
      this.player.removeClass('vjs-ad-playing');
    }.bind(this));

    this.player.ima.startFromReadyCallback();
  };

  /**
   * Merges objects.
   * @param  {Object} target object to merge properties to
   * @param  {Object} source object to merge properties from
   * @param  {Number} [depth] merging depth
   * @return {Object} the resulting object
   */
  merge = function(target, source, depth) {
    var forever = depth == null;
    for (var p in source) {
      if (source[p] != null && source[p].constructor === Object && (forever || depth > 0)) {
        target[p] = merge(
          target.hasOwnProperty(p) ? target[p] : {},
          source[p],
          forever ? null : depth - 1
        );
      } else {
        target[p] = source[p];
      }
    }
    return target;
  };

  window.wjplayer = wjplayer;
})();
