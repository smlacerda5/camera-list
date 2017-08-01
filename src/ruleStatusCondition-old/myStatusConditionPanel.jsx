var EMPTY_FN = function () {};
var _isEmpty = require('lodash/isEmpty');

module.exports = function (_params) {

    var data = new n.data.Store('ruleStatusConditionList', {
        connection: {
          create: '',
          update: '',
          save: 'ruleStatusCondition.upsert',
          read: 'ruleStatusCondition.list',
          remove: 'ruleStatusCondition.remove'
        },
        idProperty:'Name'
      });

  return n.StoreSearchPanel(data);
};
