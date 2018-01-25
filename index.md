# wjplayer

Video.js bundle that supports HLS, VAST/VMAP, 360-degree videos, and more.

[![Build Status](https://travis-ci.org/neuron-digital/wjplayer.svg?branch=master)](https://travis-ci.org/neuron-digital/wjplayer)
[![Build status](https://ci.appveyor.com/api/projects/status/dyr733j1b22ulxhe?svg=true)](https://ci.appveyor.com/project/avdeev/wjplayer)
[![npm](https://img.shields.io/npm/v/wjplayer.svg)](https://www.npmjs.com/package/wjplayer)
[![npm](https://img.shields.io/npm/dm/wjplayer.svg)](https://www.npmjs.com/package/wjplayer)
[![David](https://david-dm.org/neuron-digital/wjplayer.svg)](https://david-dm.org/neuron-digital/wjplayer)
[![David](https://david-dm.org/neuron-digital/wjplayer/dev-status.svg)](https://david-dm.org/neuron-digital/wjplayer?type=dev)

#### [DEMO](https://neuron-digital.github.io/wjplayer/examples/)

## What's included

### Video.js 5
* https://github.com/videojs/video.js

### Video.js plugins

#### HLS plugins
* https://github.com/videojs/videojs-contrib-hls
* https://github.com/dailymotion/hls.js - alternative to videojs-contrib-hls
* https://github.com/streamroot/videojs5-hlsjs-source-handler - uses dailymotion hls

#### Other plugins
* https://github.com/googleads/videojs-ima
* https://github.com/neuron-digital/videojs-resolution-switcher
* https://github.com/neuron-digital/videojs-social
* https://github.com/neuron-digital/videojs-download-button
* https://github.com/neuron-digital/videojs-ga
* https://github.com/yanwsh/videojs-panorama

### Plugins dependencies
* https://github.com/mrdoob/three.js (required by videojs-panorama)

## Testing

```sh
npm install
npm start
```
index.html with the list of examples will be opened in your browser.

## Usage

```html
<link href="path/to/wjplayer/dist/wjplayer.css" rel="stylesheet">

<!-- If you need ads in your videos, include ima sdk first -->
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>


<!-- HLS support using videojs-contrib-hls -->
<script src="path/to/wjplayer/dist/wjplayer.js"></script>

<!-- OR  -->

<!-- HLS support using hls.js  -->
<script src="path/to/wjplayer/dist/wjplayer-hls-js.js"></script>
```

To enable 360-degree video support add these includes:
```html
<link rel="stylesheet" href="/path/to/wjplayer/dist/wjplayer-360.css">
<script src="path/to/wjplayer/dist/wjplayer-360.js"></script>
```

Place a container in your html:
```html
<div id="player-container"></div>
```

and pass its id and the list of sources to wjplayer.

### Examples

**Create a player instance**
```js
var player = wjplayer({
  containerId: 'player-container',
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }, {
    src: '//vjs.zencdn.net/v/oceans.ogv',
    type: 'video/ogg'
  }]
);
```

**HLS**
```js
var player = wjplayer({
  containerId: 'player-container',
  sources: [{
    src: 'path-to-video.m3u8',
    type: 'application/x-mpegURL'
  }]
});
player.reloadSourceOnError(); // init `reloadSourceOnError` plugin (part of videjs-contrib-hls)
```

**Specify resolution and label of each source**
```js
var player = wjplayer({
  containerId: 'player-container',
  defaultQuality: 'high',
  // sourcesWithRes array will be passed to videojs-resolution-switcher
  sourcesWithRes: [
  {
    src: 'path-to-video-low-quality.m3u8',
    type: 'application/x-mpegURL',
    res: 360,
    label: 'SD'
  },
  {
    src: 'path-to-video-high-quality.m3u8',
    type: 'application/x-mpegURL',
    res: 720,
    label: 'HD'
  }]
});
```

**Create an audio player**
```js
var audioPlayer = wjplayer({
  containerId: 'player-container',
  playerType: 'audio',
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp3',
    type: 'video/mp3'
  }]
});
```

**Insert ads**
```js
var player = wjplayer({
  containerId: 'player-container',
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }],
  ads: {
    adTagUrl: '//example.com/vmap.xml'
  }
});
```

**Send player events to Google Analytics**
```js
var player = wjplayer({
  containerId: 'player-container',
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }]
);
player.ga({
  percentsPlayedInterval: 10,
  secondsPlayedMoments: [10, 30, 60, 3 * 60, 5 * 60],
  percentsPlayedInterval: 25,
  sendGaEventDirectly: true
});
```

**360° video**
```js
var player = wjplayer({
  containerId: 'player-container',
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }],
  panorama: {
    clickAndDrag: true,
    clickToToggle: true,
    autoMobileOrientation: true
  }
});
```

**Custom skin**

```js
var player = wjplayer({
  containerId: 'player-container',
  // Skin name.
  // In this case 'vjs-custom-skin' class will be assigned to player.
  // 'vjs-default-skin' is used by default.
  skin: 'custom',
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }]
});
```
CSS class 'vjs-custom-skin' will be assigned to player, so your can include your CSS file
```
<link href="path/to/skins/custom.css" rel="stylesheet">
```
and customize the player appearence using .vjs-custom-skin class.

Your can find links to some Video.js skins in [video.js wiki](https://github.com/videojs/video.js/wiki/Skins).


* * *

## API Reference

### wjplayer()

Creates a new player and places it to container with the specified id.

**Parameters**

**options**: `Object`, Configuration options.

 - **options.containerId**: `String`, REQUIRED id of the container
  where player shoud be inserted (appendChild() will be used)

 - **options.sources**: `Array`, REQUIRED IF `sourcesWithRes` IS NOT PROVIDED
  Array of sources to pass to player.src()

 - **options.sourcesWithRes**: `Array`, REQUIRED IF `sources` IS NOT PROVIDED
  Array of sources to pass to player.updateSrc()

 - **options.playerId**: `String`, id to assign to the player element.
  Defaults to "player"

 - **options.playerType**: `String`, "video" or "audio"
  Defaults to "video"

 - **options.defaultQuality**: `String | Number`, "low", "high" or Number

 - **options.pathToSwf**: `String`, Path to flash player file (will be passed to videojs as videojs.options.flash.swf)

 - **options.locale**: `String`, If specified, will be set as player and ads locale.
 This may be any ISO 639-1 (two-letter) code.

 - **options.autoplay**: `Boolean`, Defaults to false

 - **options.controls**: `Boolean`, Defaults to true

 - **options.loop**: `Boolean`, The loop attribute causes the video to start over as soon as it ends.
  Defaults to false

 - **options.preload**: `String`, Defaults to "metadata"

 - **options.poster**: `String`, The width attribute sets the display width of the video (in pixels).
  This will take effect only if `options.classes` param is set
  (`vjs-fill` class, used by defaults, sets player width and height to 100%).

 - **options.width**: `Number`, The height attribute sets the display height of the video (in pixels).

 - **options.height**: `Number`, Player height

 - **options.videojs**: `Object`, Any additilnal ptions to pass to videojs.

 - **options.muted**: `Boolean`, Indicates whether the player should be muted by default.
  Defaults to false

 - **options.skin**: `String`, Skin name.
  Defaults to "default"

 - **options.classes**: `Array`, CSS classnames to assign to the player in addition to `video-js`.
  By default, the following classes are used:
  `['vjs-default-skin',
  'vjs-fill',
  'vjs-big-play-centered']`

 - **options.stretch**: `Boolean`, Indicates whether video should stretch to fit the container.
  Defaults to false

 - **options.downloadButton**: `Boolean | Object`, Indicates whether a download button should be shown in control bar.

 - **options.downloadButton.text**: `String`, Button title.
  Defaults to "Download"

 - **options.volumeStyle**: `String`, "horizontal" or "vertical".
  Defaults to "vertical"

 - **options.panorama**: `Boolean | Object`, Used for pamoramic (360-degree) videos.
  Pass true or options object for videojs-panorama plugin

 - **options.crossorigin**: `String`, Used with videojs-panorama plugin.
  Pass "anonymous" to avoid cross domain issue
  (will work on Chrome and Firefox, not Safari)

 - **options.ads**: `Object`, Settings for videojs-ima plugin.

 - **options.ads.adTagUrl**: `String`, Tag url. The only requried setting here.

 - **options.ads.adLabel**: `String`, Replaces the "Advertisement" text in the ad label.

 - **options.ads.showControlsForJSAds**: `Boolean`, Defaults to false

 - **options.share**: `Object`, Will be passed to videojs-social plugin.

 - **options.share.url**: `String`, This is the URL that points to your custom web page
  which has your video and the meta tags for sharing.

 - **options.share.embedCode**: `String`, Iframe embed code for sharing the video.

 - **options.enableHlsSupport**: `Boolean`, Set to false in order to disable any workarounds etc. that are required to make HLS support a reality.  
   (e.g. stops forcing flash on IE11 and brings back videoJsResolutionSwitcher + ads)  
   Defaults to true

**Returns**: `Object`, the player object.


* * *


## Compatible

| Browser           | IE | Edge | Firefox | Chrome | Safari | Opera | iOS Safari | Opera Mini | Android Browser | Chrome for Android Phone | Chrome for Android Tablet |
|-------------------|----|------|---------|--------|--------|-------|------------|------------|-----------------|-------------------------|---------------------------|
| Live              | x  | n/a  | o       | о      | o      | o     | o          | o          | o               | о | o |               |
|   with ads        | o  | n/a  | o       | оo     | o      | oo    | r1         | x          | oo              | о | o |                 |
| HLS master        | x  | n/a  | x       | x      | o      | x     | o          | x          | x               | o | o |                |
| HLS by resolution | x  | n/a  | o       | о      | o      | о     | o          | x          | oo              | o | o |                 |
| MP4               | o  | n/a  | o       | оo     | o      | oo    | o          | x          | oo              | o | o |                 |
| HLS and MP4       | x  | n/a  | x       | x      | o      | x     | o          | x          | oo              | о | o |                 |
| Stretch           | o  | n/a  | o       | о      | o      | o     | p1         | x          | x               | x | v1 |                 |
| MP3               | o  | n/a  | o       | o      | o      | о     | o          | x          | oo              | o | o |                 |
| 360° MP4          | x  | n/a  | x       | o      | o      | o     | x          | x          | oo              | x | o |                 |

### Notes:

- о  - playing with no issues.
- oo - pereodical freezes are happening.
- x - video is not playing.
- r1 - postroll & midroll are not working
- p1 - play button is only available in landscape orientation
- v1 - video goes beyond screen border
- n/a - test environment is not available


## Contributing

wjplayer is a free and open source library, and we appreciate any help you're willing to give. Check out the [contributing guide](CONTRIBUTING.md).


## License

wjplayer is licensed under the MIT License. [View the license file](LICENSE)


## Similar projects

* https://github.com/alexbakum/example-videojs-hls-bundle
