import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const path = require('path');

const DEFAULT_CONFIGS = {
  plugins: [
    resolve(),
    babel({
      exclude: path.join(process.cwd(), 'node_modules/**'),
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  context: 'this',
};

export default [
  {
    input: __dirname + '/src/contrib-hls/index.js',
    output: {
      name: 'wjplayer',
      file: path.resolve(__dirname, 'dist', 'wjplayer.js'),
      format: 'umd',
      globals: {
        'video.js': 'videojs',
      },
    },
    ...DEFAULT_CONFIGS,
  },
  {
    input: __dirname + '/src/hls-js/index.js',
    output: {
      name: 'wjplayer',
      file: path.resolve(__dirname, 'dist', 'wjplayer-hls-js.js'),
      format: 'umd',
      globals: {
        'video.js': 'videojs',
      },
    },
    ...DEFAULT_CONFIGS,
  },
];
