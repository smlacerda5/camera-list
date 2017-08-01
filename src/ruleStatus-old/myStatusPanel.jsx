var EMPTY_FN = function() {};
var _isEmpty = require('lodash/isEmpty');

module.exports = function(_params) {
	var data = new n.data.Store('ruleStatusList', {
		connection: {
			create: '',
			update: '',
			save: 'ruleStatus.upsert',
			read: 'ruleStatus.list',
			remove: 'ruleStatus.remove'
		},
		idProperty: 'name'
	});

	console.log(data);

	return n.StoreSearchPanel(data);
};
