var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'wjplayer': __dirname + '/src/contrib-hls/index.js',
    'wjplayer-hls-js': __dirname + '/src/hls-js/index.js',
    // there's a problem with the result file, TODO
    // 'wjplayer-360': __dirname + '/src/wjplayer-360.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'wjplayer',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)(?!\/(videojs-quality-picker))/
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
