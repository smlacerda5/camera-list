var EMPTY_FN = function () {};
var _isEmpty = require('lodash/isEmpty');

module.exports = function (_params) {

    var data = new n.data.Store('objectType', {
        connection: {
          create: '',
          update: '',
          save: 'objectType.upsert',
          read: 'objectType.list',
          remove: 'objectType.remove',
          validate: 'objectType.validate'
        },
        idProperty:'Name'
      });

  console.log("objectType2 data:", data);

  return n.StoreSearchPanel(data);
};


