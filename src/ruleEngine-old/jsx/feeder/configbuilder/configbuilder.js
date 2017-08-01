
function ConfigBuilder(onUpdate, detailData) {
    this.initializeConfig(detailData);
    this.onUpdate = onUpdate;
    this.detailData = detailData;
    this.validate();
}

ConfigBuilder.prototype.initializeConfig = function(detailData) {
    if(detailData.ModuleConfig.Config == null)
        detailData.ModuleConfig.Config = {};
    if(detailData.ModuleConfig.Error == null || (typeof detailData.ModuleConfig.Error) != 'string')
        detailData.ModuleConfig.Error = '';
}

ConfigBuilder.prototype.validate = function() {
    var self = this;
    n.call('job.validate', this.detailData, function(err, res) {
        if(res != null && res.statusCode == 200 && res.body.Code != 400) {
            self.detailData = res.body;
            if(!('Config' in self.detailData.ModuleConfig))
                self.detailData.ModuleConfig['Config'] = {};
            self.onUpdate();
        }
    });
}

ConfigBuilder.prototype.getDetailData = function() {
    return this.detailData;
}

ConfigBuilder.prototype.getModuleName = function() {
    return this.detailData.ModuleName;
}

ConfigBuilder.prototype.getModuleType = function() {
    return this.detailData.ModuleType;
}

ConfigBuilder.prototype.getError = function() {
    return this.detailData.ModuleConfig.Error;
}

ConfigBuilder.prototype.getConfigKeys = function() {
    return Object.keys(this.detailData.ModuleConfig.Config);
}

ConfigBuilder.prototype.getConfigValue = function(key) {
    return this.detailData.ModuleConfig.Config[key];
}

ConfigBuilder.prototype.setConfigValue = function(key, value) {
    this.detailData.ModuleConfig.Config[key] = value;
    this.validate();
}

module.exports = ConfigBuilder;