var fs      = require('fs');
var path    = require('path');
var yaml    = require('js-yaml');
var _       = require('lodash');

module.exports = {
  config : {},
  default : {
    wizeye : {
      host : 'localhost',
      port : 1337,
    },
    listen : {
      bind : 'localhost',
      port : 8080
    },
    database : {
      url : 'mongodb://localhost/wuf'
    },
    log : {
      file : 'builder.log',
      level : 'info',
      maxsize : 1024 * 1024 * 30,
      maxFiles : 10,
      monitoring : 'disable',
      host : 'localhost',
      interval : 1000
    },
    npm : {
      repository : 'http://npm.dev.n3n.io:8091'
    }
  },
  set : function(cmd){
    if(cmd.conf) {
      var config_path = path.join(__dirname, cmd.conf);
      this.config = yaml.safeLoad(fs.readFileSync(config_path, 'utf8'));
      this.config = _.merge(this.default, this.config, {
        listen : {
          host: cmd.host,
          port: cmd.port,
        },
        database : {
          url : cmd.database
        }
      });
    }
    return this;
  },
  get : function(){
    return this.config;
  }
};
