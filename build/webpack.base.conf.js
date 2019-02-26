const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractTextPluginBase = new ExtractTextPlugin('./css/panel.base.css');
const ExtractTextPluginLight = new ExtractTextPlugin('./css/panel.light.css');
const ExtractTextPluginDark = new ExtractTextPlugin('./css/panel.dark.css');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  target: 'node',
  context: resolve('src'),
  entry: {
    './module': './module.js',
    'panels/module': './panels/module.js'
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
    ]),
    ExtractTextPluginBase,
    ExtractTextPluginLight,
    ExtractTextPluginDark,
  ],
  resolve: {
      extensions: [".js", ".html"]
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
        test: /\.base\.(s?)css$/,
        use: ExtractTextPluginBase.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.light\.(s?)css$/,
        use: ExtractTextPluginLight.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.dark\.(s?)css$/,
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
}
