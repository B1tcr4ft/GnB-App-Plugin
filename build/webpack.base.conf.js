const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractTextPluginStyle = new ExtractTextPlugin('./css/style.css');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  target: 'node',
  context: resolve('src'),
  entry: {
    './module': './module.js',
    'panels/module': './panels/module.js',
    'panels/bayesian-networks-list/module': './panels/bayesian-networks-list/module.js',
    'panels/net/module': './panels/net/module.js'
  },
  output: {
    filename: "[name].js",
    path: resolve('dist'),
    libraryTarget: "amd"
  },
  externals: [
    // remove the line below if you don't want to use buildin versions
    'jquery', 'lodash', 'moment','angular',
    function (context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: '**/plugin.json' },
      { from: 'panels/*' },
      { from: 'dashboards/*' },
      { from: 'component/*' },
      { from: '**/*.js' },
      { from: '**/*.html' },
      { from: '**/*.png' }
    ]),
    new CleanWebpackPlugin(['dist'], {
      root: resolve('.')
    }),
    ExtractTextPluginStyle
  ],
  resolve: {
      extensions: [".js", ".html", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(external)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              require.resolve('babel-preset-env')
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  }
};
