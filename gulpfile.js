'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const addSrc = require('gulp-add-src');
const log = require('fancy-log');
const del = require('del');

const paths = {
  DIST: './dist',
  DIST_SKINS: './dist/skins',
  DIST_FONTS: './dist/font',
  SRC_JS: './src/js/*.js',
  SRC_SCSS: './src/scss/*.scss',
  SRC_SCSS_SKINS: './src/scss/skins/*.scss'
};

const distName = 'wjplayer';
const distName360 = 'wjplayer-360';

const deps = ['core', 'ads', 'switcher', 'share', 'download', 'ga'];
const deps360 = ['360'];

let includesJs = [];
let includesCss = [];
let includesJs360 = [];
let includesCss360 = [];

const includes = {
  js: {
    core: [
      'node_modules/video.js/dist/video.js',
      'node_modules/videojs5-hlsjs-source-handler/lib/videojs5-hlsjs-source-handler.js',
      paths.SRC_JS
    ],
    ads: [
      'node_modules/videojs-contrib-ads/src/videojs.ads.js',
      'node_modules/videojs-ima/src/videojs.ima.js'
    ],
    switcher: [
      'node_modules/videojs-resolution-switcher/lib/videojs-resolution-switcher.js'
    ],
    share: [
      'node_modules/videojs-share/dist/videojs-share.js'
    ],
    download: [
      'node_modules/videojs-download-button/dist/videojs-download-button.js'
    ],
    ga: [
      'node_modules/videojs-ga/dist/videojs.ga.js'
    ],
    360: [
      'node_modules/three/build/three.js',
      'node_modules/videojs-panorama/dist/videojs-panorama.v5.js'
    ]
  },
  css: {
    core: [
      'node_modules/video.js/dist/video-js.css'
    ],
    ads: [
      'node_modules/videojs-ima/src/videojs.ima.css'
    ],
    switcher: [
      'node_modules/videojs-resolution-switcher/lib/videojs-resolution-switcher.css'
    ],
    share: [
      'node_modules/videojs-share/dist/videojs-share.css'
    ],
    download: [
      'node_modules/videojs-download-button/dist/videojs-download-button.css'
    ],
    ga: [],
    360: [
      'node_modules/videojs-panorama/dist/videojs-panorama.css'
    ]
  },
  fonts: 'node_modules/video.js/dist/font/*',
  swf: 'node_modules/video.js/dist/video-js.swf'
};

deps.forEach(function(inc) {
  includesJs = includesJs.concat(includes.js[inc]);
  includesCss = includesCss.concat(includes.css[inc]);
});

deps360.forEach(function(inc) {
  includesJs360 = includesJs360.concat(includes.js[inc]);
  includesCss360 = includesCss360.concat(includes.css[inc]);
});

gulp.task('scripts-360', () => {
  return gulp.src(includesJs360)
    .pipe(concat(distName360 + '.js'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('styles-360', () => {
  return gulp.src(includesCss360)
    .pipe(concat(distName360 + '.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('skins', () => {
  return gulp.src(paths.SRC_SCSS_SKINS)
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', log))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.DIST_SKINS));
});

gulp.task('fonts', () => {
  return gulp.src(includes.fonts)
    .pipe(gulp.dest(paths.DIST_FONTS));
});

gulp.task('swf', () => {
  return gulp.src(includes.swf)
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('clean-js', () => {
  return del(paths.SRC_JS);
});

gulp.task('clean-dist', () => {
  return del(paths.DIST + '/**/*.{js,css}');
});

gulp.task('lint', () => {
  return gulp.src(paths.SRC_JS)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', () => {
  return browserSync.init({
    server: {
      baseDir: './'
    },
    startPath: '/examples',
    port: process.env.PORT || 3000,
    https: !!process.env.HTTPS,
    open: true,
    notify: false
  });
});

gulp.task('watch', () => {
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch(paths.SRC_JS, gulp.series('scripts'));
  gulp.watch(paths.DIST + '/*.js', gulp.series('sync-js'));
  gulp.watch(paths.SRC_SCSS, gulp.series('styles'));
  gulp.watch(paths.DIST + '/*.css', gulp.series('sync-css'));
});

gulp.task('sync-js', () => {
  return gulp.src(paths.DIST + '/*.js')
    .pipe(browserSync.stream());
});

gulp.task('sync-css', () => {
  return gulp.src(paths.DIST + '/*.css')
    .pipe(browserSync.stream());
});

gulp.task('styles', gulp.series('skins', 'styles-360', () => {
  return gulp.src(paths.SRC_SCSS)
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', log))
    .pipe(addSrc.prepend(includesCss))
    .pipe(concat(distName + '.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.DIST));
}));

gulp.task('scripts', gulp.series('scripts-360', 'lint', () => {
  return gulp.src(includesJs)
    .pipe(concat(distName + '.js'))
    .pipe(gulp.dest(paths.DIST));
}));

gulp.task('browse', gulp.series('server', 'watch'));

gulp.task('build', gulp.series('clean-dist', gulp.parallel('scripts', 'styles')));

gulp.task('default', gulp.parallel('scripts-360', 'styles', 'fonts', 'swf'));
