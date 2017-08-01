var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'inline-source-map',

  entry: './runtime/client/entry.jsx',
  output: {
    path: '/dist',
    publicPath:'/assets',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: {
    fs: "empty"
  },
  externals: {
    'lodash': '_',
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
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};