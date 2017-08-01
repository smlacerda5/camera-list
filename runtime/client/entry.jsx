var route = require('./../../src/route');
var cookies = require('browser-cookies');

var hostname = 'elrha.n3n.io';
var port = '7002';
var username = 'admin';
var password = 'wizeye1004#';

var render = function () {
  ReactDOM.render(
    <n.Application routes={route} />,
    document.getElementById('contents'));
}

if(n.socket == null){
  /**
   *
   * @type {n.SocketClient}
   */

  var echoURL = 'http://' + hostname + ':' + port + '/echo?token='
  $.ajax({
    url: 'http://' + hostname + ':' + port + '/login',
    type: "post",
    data: {
      hostname:hostname,
      username:username,
      password:password
    },
    success: function success(_res) {
      if (_res.success && _res.token) {
        n.socket = new n.data.SocketClient({
          ssl: false,
          autoReconnect: true,
          onError: function (_error) {
            console.log('SOCKET ERROR!!!', _error);
          },
          autoReconnectTimer: 500,
          maintainCollections: true,
          ddpVersion: '1',  // ['1', 'pre2', 'pre1'] available
          url: echoURL + _res.token
        });

        n.socket.connect(function (_error, _wasReconnect) {
          console.log('Socket Connected!');
          if (_error) return;
          render();
        });
      }
    },
    error: function error(xhr, msg, type) {
      switch (xhr.status) {
        case 401:
          me.setState({ error: ["Incorrect username or password."] });
          break;
      }
      render();
    }
  });
}else{
  render();
}
