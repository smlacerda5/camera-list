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
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery',
      React : 'react',
      ReactDOM : 'react-dom',
      ReactMotion: 'react-motion',
      n : 'nuxjs'
    })
  ],
  node: {
    fs: "empty"
  },
  externals: {
  },
  module: {

    loaders: require('./webpack.config.loaders')
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};