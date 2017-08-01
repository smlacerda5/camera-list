var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'inline-source-map',

  entry: ['webpack/hot/dev-server', './runtime/client/entry.jsx'],
  output: {
    path: '/dist',
    publicPath:'/assets',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    'jquery': 'jQuery',
    'jquery': '$',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'nuxjs': 'n',
    'nuxjs': 'Nux'
  },
  module: {

    loaders: require('./webpack.config.loaders')
  },
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};