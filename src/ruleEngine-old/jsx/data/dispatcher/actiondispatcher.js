var Dispatcher = require('flux').Dispatcher;

var ActionDispatcher = new Dispatcher();

ActionDispatcher.handleAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
}

module.exports = ActionDispatcher;