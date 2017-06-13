var webpack = require('webpack');
var path = require('path');
var mode = require('yargs').argv.mode;

var libraryName = 'wjplayer';

var outputFileExt = '.js';
var devtool = '';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  })
];

if (process.env.MINIFY) {
  outputFileExt = '.min.js';
  devtool = 'source-map';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: true
  }));
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
        loader: 'babel-loader',
        exclude: /(node_modules)(?!\/(videojs-quality-picker))/
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  plugins: plugins
};

module.exports = config;
