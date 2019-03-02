const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractTextPluginDark = new ExtractTextPlugin('./css/gnb.dark.css');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  target: 'node',
  context: resolve('src'),
  entry: {
    './module': './module.js',
    'component/modules/display_network/module': './component/modules/display_network/module.js',
    'component/modules/list_network/module': './component/modules/list_network/module.js',
    'component/modules/administration/module': './component/modules/administration/module.js'
  },
  output: {
    filename: "[name].js",
    path: resolve('dist'),
    libraryTarget: "amd"
  },
  externals: [
    // remove the line below if you don't want to use buildin versions
    'jquery', 'lodash', 'moment','angular', 'react', 'react-dom',
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
      { from: 'dashboards/*' },
      { from: 'component/*' },
      { from: '**/*.js' },
      { from: '**/*.html' },
      { from: '**/*.png' }
    ]),
    new CleanWebpackPlugin(['dist'], {
      root: resolve('.')
    }),
    ExtractTextPluginDark
  ],
  resolve: {
      extensions: [".js", ".html", ".scss"]
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
        test: /\.dark\.scss$/,
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  }
};
