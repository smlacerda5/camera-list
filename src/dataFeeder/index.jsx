var PluginObjectType = require('@plugin/object-type');
var DataFeederWindow = require('./window');

module.exports = React.createClass({
  displayName: 'ObjectType',
  getInitialState: function() {
    return {
      values: {}
    }
  },
  handleClickRow: function(plugin, value) {
    this.setState({
      values: value.dataItem
    }, function() {
      this.refs.configEditor.setText(this.state.values.ModuleConfig.Config);
    });
  },
  handleDblClickCell: function() {
    this.setState({
      windowTitle: 'Edit Data Feeder'
    });
    this._openWindow();
  },
  handleClickNew: function() {
    this.setState({
      windowTitle: 'New Data Feeder',
      values: {}
    });
    this._openWindow()
  },
  handleClickRemove: function() {
    console.log('click delete..', this.state.values);
    var values = this.state.values;
    var pluginObjectType = this.refs.pluginObjectType;

    if(!values.Name) {
      return console.log('not selected row. so do not modify.. ');
    }

    pluginObjectType.remove({ _id: values._id });

    // 나중에 saveChange로 바꾸어야 하나?
    pluginObjectType.callRemove({ Name: values.Name });
    this.setState({
      values: {}
    })
  },
  handleSave: function(_values) {
    var self = this;
    var pluginObjectType = this.refs.pluginObjectType;

    pluginObjectType.upsert(_values);

    pluginObjectType.saveChanges({}, function(res) {
      console.log('saveChanges Arg  : ', res);
      self.forceUpdate();
    });

    this._hideWindow();
  },
  checkNameDuplication: function(name, callback) {
    n.call("objectType.get", {Name:[name]}, function(err, res){
      console.log(res);
      callback(res.body);
    });
  },
  _openWindow: function() {
    this.refs.objectTypeWindow.openWindow();
  },
  _hideWindow: function() {
    this.refs.objectTypeWindow.hideWindow();
  },

  render: function() {

    var config = this.state.values.ModuleConfig ? this.state.values.ModuleConfig.Config : '';

    return (

      <n.FlexLayout direction="vertical">

        <n.Box flex={3} className="layout-fit">
          <PluginObjectType
            title="Data Feeder"
            params={{moduleType: "Feeder"}}
            fit={true}
            ref="pluginObjectType"
            onCellClick={this.handleClickRow}
            onCellDblClick={this.handleDblClickCell}
            searchField="Name"
            columns={[
              {field: 'Name', title: 'Name'}
            ]}
          />
        </n.Box>

        <n.Panel flex={2} fit={true} title="Feeder Detail" >

          <n.FlexLayout direction="horizontal">
            <n.Form
              flex={1}
              values={this.state.values}
              ref="objectTypeForm"
              labelWidth={150}
              fieldWidth="100%"
              readOnlyAll={true}
            >

              <n.TextField label="Name"  name="Name" width="100%" />
              <n.TextField label="ModuleName" name="ModuleName" width="100%" />
              <n.TextField label="ModuleType" name="ModuleType" width="100%" />
              <n.TextField label="Description" name="Description" width="100%" />

            </n.Form>
            <n.Editor flex={1} mode="plain/text" ref="configEditor" value={config} width="100%" height="100%" fit={true} readOnly={true} />

          </n.FlexLayout>

        </n.Panel>

        <div style={{justifyContent: "center",textAlign: "center",padding: "0.5em"}}>
          <n.Button ui="green" text="+New" onClick={this.handleClickNew} />
          <n.Button ui="red" text="Remove" onClick={this.handleClickRemove} />
        </div>

        <DataFeederWindow
          ref="objectTypeWindow"
          title={this.state.windowTitle}
          values={this.state.values}
          configStr={config}
          onSave={this.handleSave}
          checkNameDuplication={this.checkNameDuplication}
        />

      </n.FlexLayout>

    )
  }
});


// Job Struct 변경여부, required
// Name	string	오브젝트 이름	x	o
// Description	string	오브젝트 설명	o	x
// Relations	string : string array	오브젝트 관계, api로 입력 불가. (API 호출시 relation은 입력 한대로 적용 안될 예정입니다.)	x	x
// ModuleType	string object type인경우 'Processor', data feeder인 경우 'Feeder' 값을 가지고 있음.  x	x
// ModuleName	string	사용 될 Module의 이름 (차후 WS에서 module list 제공 예정)	o	o DPLProcessor로 고정
// ModuleConfig	JsonObject	Module이 사용 할 Config. 현 시점에서는 example의 JSON sample을 참고 부탁 드립니다.	o	o
//
//
