'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const addSrc = require('gulp-add-src');
const gutil = require('gulp-util');
const del = require('del');

const paths = {
  NPM: './node_modules',
  BOWER: './bower_components',
  DIST: './dist',
  DIST_SKINS: './dist/skins',
  SRC_JS: './src/js/*.js',
  SRC_SCSS: './src/scss/*.scss',
  SRC_SCSS_SKINS: './src/scss/skins/*.scss'
};

const distName = 'wjplayer';
const distName360 = 'wjplayer-360';

const deps = ['core', 'ads', 'switcher', 'share', 'download'];
const deps360 = ['360'];

let includesJs = [];
let includesCss = [];
let includesJs360 = [];
let includesCss360 = [];

const includes = {
  js: {
    core: [
      paths.BOWER + '/video.js/dist/video.js',
      paths.NPM + '/videojs-contrib-hls/dist/videojs-contrib-hls.js',
      paths.SRC_JS
    ],
    ads: [
      paths.BOWER + '/videojs-contrib-ads/src/videojs.ads.js',
      paths.BOWER + '/videojs-ima/src/videojs.ima.js'
    ],
    switcher: [
      paths.BOWER + '/vjs-resolution-switcher/lib/videojs-resolution-switcher.js'
    ],
    share: [
      paths.BOWER + '/videojs-social/videojs-social.js'
    ],
    download: [
      paths.BOWER  + '/videojs-download-button/dist/videojs-download-button.js'
    ],
    360: [
      paths.BOWER + '/three.js/three.js',
      paths.BOWER + '/videojs-panorama/dist/videojs-panorama.v5.js'
    ]
  },
  css: {
    core: [
      paths.BOWER + '/video.js/dist/video-js.css'
    ],
    ads: [
      paths.BOWER + '/videojs-ima/src/videojs.ima.css'
    ],
    switcher: [
      paths.BOWER + '/vjs-resolution-switcher/lib/videojs-resolution-switcher.css'
    ],
    share: [
      paths.BOWER + '/videojs-social/videojs-social.css'
    ],
    download: [
      paths.BOWER  + '/videojs-download-button/dist/videojs-download-button.css'
    ],
    360: [
      paths.BOWER + '/videojs-panorama/dist/videojs-panorama.css'
    ]
  },
  swf: paths.BOWER + '/video.js/dist/video-js.swf'
};

deps.forEach(function(inc) {
  includesJs = includesJs.concat(includes.js[inc]);
  includesCss = includesCss.concat(includes.css[inc]);
});

deps360.forEach(function(inc) {
  includesJs360 = includesJs360.concat(includes.js[inc]);
  includesCss360 = includesCss360.concat(includes.css[inc]);
});

gulp.task('default', () => {
  runSequence('build', 'copy-swf');
});

// Open in browser for testing
gulp.task('browse', ['server', 'watch']);

gulp.task('build', ['clean-dist'], () => {
  gulp.start('scripts', 'styles');
});

gulp.task('scripts', ['scripts-360', 'lint'], () => {
  return gulp.src(includesJs)
    .pipe(concat(distName + '.js'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('scripts-360', () => {
  return gulp.src(includesJs360)
    .pipe(concat(distName360 + '.js'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('styles', ['skins', 'styles-360'], () => {
  return gulp.src(paths.SRC_SCSS)
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', gutil.log))
    .pipe(addSrc.prepend(includesCss))
    .pipe(concat(distName + '.css'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('styles-360', () => {
  return gulp.src(includesCss360)
    .pipe(concat(distName360 + '.css'))
    .pipe(gulp.dest(paths.DIST));
});

gulp.task('skins', () => {
  return gulp.src(paths.SRC_SCSS_SKINS)
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', gutil.log))
    .pipe(gulp.dest(paths.DIST_SKINS));
});

gulp.task('copy-swf', () => {
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
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000,
    https: true,
    open: true,
    notify: false
  });
});

gulp.task('watch', () => {
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch(paths.SRC_JS, ['scripts']);
  gulp.watch(paths.DIST + '/*.js', ['sync-js']);
  gulp.watch(paths.SRC_SCSS, ['styles']);
  gulp.watch(paths.DIST + '/*.css', ['sync-css']);
});

gulp.task('sync-js', () => {
  gulp.src(paths.DIST + '/*.js')
    .pipe(browserSync.stream());
});

gulp.task('sync-css', () => {
  gulp.src(paths.DIST + '/*.css')
    .pipe(browserSync.stream());
});
