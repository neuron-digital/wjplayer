var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var mode = require('yargs').argv.mode;

var libraryName = 'wjplayer';

var plugins = [];
var outputFileExt = '.js';
var devtool = '';

if (mode === 'minify') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFileExt = '.min.js';
  devtool = 'source-map';
}

var config = {
  entry: {
    'wjplayer': __dirname + '/src/contrib-hls/index.js',
    'wjplayer-hls-js': __dirname + '/src/hls-js/index.js',
    // there's a problem with the result file, TODO
    // 'wjplayer-360': __dirname + '/src/wjplayer-360.js',
  },
  devtool: devtool,
  output: {
    path: __dirname + '/dist',
    filename: '[name]' + outputFileExt,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)(?!\/(videojs-quality-picker))/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
