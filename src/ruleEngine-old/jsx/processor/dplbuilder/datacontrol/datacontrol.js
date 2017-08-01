
function DataControl(updateCallback, detailData, dataType, funcRule, statusRule, history, dpl) {
    this.updateCallback = updateCallback;
    this.detailData = detailData;

    this.dataType = dataType;
    this.funcRule = funcRule;
    this.statusRule = statusRule;
    this.history = history;
    this.dpl = dpl;

    this.validate(null);
    this.updateAll();
    this.updateDataType();
}

DataControl.prototype.getConfig = function() {
    this.detailData.ModuleConfig.UI.Config = this.dpl.getConfig();
    this.detailData.Relations = {};
    delete this.detailData.ModuleConfig.UI.Data;
    return this.detailData;
}

DataControl.prototype.update = function() {
    this.updateCallback();
}

DataControl.prototype.validate = function(timestamp) {
    this.detailData.ModuleConfig.UI.Config = this.dpl.getConfig();
    this.detailData.ModuleConfig.Query = '';

    var self = this;
    n.call('job.validate', { 'Job': this.detailData, 'Timestamp': timestamp }, function(err, res) {
        if(res != null && res.statusCode == 200 && res.body.Code != 400) {
            self.detailData.ModuleConfig.Object = res.body.ModuleConfig.Object;
            self.detailData.ModuleConfig.Query = res.body.ModuleConfig.Query;

            self.dpl.error = res.body.ModuleConfig.UI.Error;
            if(self.dpl.error == null) self.dpl.error = {};

            var responseData = res.body.ModuleConfig.UI.Data;
            if(responseData != null && responseData.input != null && Object.keys(responseData.input).length > 0)
                self.dpl.data = responseData;

            self.updateCallback();
        }
    });
}

DataControl.prototype.updateHistory = function() {
    var self = this;
    n.call('job.history', { 'Name': this.detailData.Name, 'Begin': this.history.dataStart, 'End': this.history.dataEnd }, function(err, res) {
        if(res != null && res.statusCode == 200 && res.body.Code != 400) {
            self.history.update(self.dpl.getFromConfig(), res.body);
            self.updateCallback();
        }
    });
}

DataControl.prototype.updateAll = function() {
    var self = this;
    n.call('job.functioninfo', {}, function(err, res) {
        if(res != null && res.statusCode == 200 && res.body.Code != 400) {
            self.funcRule.update(res.body.functioninfo);
            self.statusRule.updateStatus(res.body.status);
            self.statusRule.updateStatusRule(res.body.statusrule);
        }
    });
}

DataControl.prototype.updateDataType = function() {
    // note : ���� Ư���� ������ Ÿ�� ���� ������ �Ϲ�ȭ ���� ����
    this.dataType.update({
        bool: 'bit',
        int: 'int',
        double: 'float',
        string: 'nvarchar',
        datetime: 'datetime',
        array: 'varchar(99786)',
        object: 'varchar(99787)',
    });
}

module.exports = DataControl;
