var cmd     = require('commander');
var express = require('express');
var session = require('express-session');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var WebpackConfig = require('./webpack.hot.config');
var compiler = webpack(WebpackConfig);
var path = require('path');
var http = require('http');
var configure = require('./configure');
var logger  = require('./logger');
var config;
cmd
  .version('0.0.1')
  .option('-c, --conf [config]', 'set config file', '../../config.conf')
  .option('-p, --port [port]', 'set port number')
  .option('--host [host address]', 'set host address')
  .option('--database [url]', 'set database url')
  .parse(process.argv);

try{
  if(cmd.conf){
    config = configure.set(cmd).get();
    logger.setup(config);
  }else{
    console.error('please make sure config file.');
    process.exit(1);
  }
}catch(err){
  console.log(err.message, err.stack);
  process.exit(1);
}

var app = express();
app.server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, '../../node_modules')));
app.use(express.static(path.resolve(__dirname, '../../')));
app.use(webpackDevMiddleware(compiler, {
  publicPath: WebpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}));

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../', 'index.html'));
});

//var DDPServer = require('nuxjs/server/DDPServer');
//var server = new DDPServer({httpServer: app.server, port: 9091});


app.server.listen(config.listen.port, config.listen.bind, function(){
    console.log('Express: listening port: ',config.listen.bind +':'+  config.listen.port);
  })
  .on('error', function(err){
    console.log('cannot create server: %s', err.message);
    process.exit(2);
  });
