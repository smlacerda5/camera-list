var ActionType = require('./actiontype');
var ActionDispatcher = require('./actiondispatcher');

var ActionRequester = {
    updateData: function() {
        ActionDispatcher.handleAction({
            actionType: ActionType.UPDATE_DATA,
            data: {}
        });
    },
    updateAlign: function(data) {
        ActionDispatcher.handleAction({
            actionType: ActionType.UPDATE_ALIGN,
            data: data
        });
    },
    newJob: function(data) {
        ActionDispatcher.handleAction({
            actionType: ActionType.NEW_JOB,
            data: data
        });
    },
    delJob: function(data) {
        ActionDispatcher.handleAction({
            actionType: ActionType.DEL_JOB,
            data: data
        });
    },
    openJobDetail: function(data) {
        ActionDispatcher.handleAction({
            actionType: ActionType.OPEN_JOB_DETAIL,
            data: data
        });
    },
    closeJobDetail: function(data, timestamp) {
        ActionDispatcher.handleAction({
            actionType: ActionType.CLOSE_JOB_DETAIL,
            data: data,
            timestamp: timestamp
        });
    }
}

module.exports = ActionRequester;
