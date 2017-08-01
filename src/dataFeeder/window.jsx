module.exports = React.createClass({
  displayName: 'DataFeederWindow',
  getInitialState: function() {

    this.orginalName = this.props.values.Name;

    return {
      title: 'Data Feeder Title',
      values: this.props.values,
      configStr: this.props.config
    }
  },
  componentWillReceiveProps: function(nextProps) {

    this.orginalName = nextProps.values.Name;

    this.setState({
      title: nextProps.title,
      values: nextProps.values,
      configStr: nextProps.configStr
    })
  },

  //api
  openWindow: function() {
    this.refs.window.show();
  },
  hideWindow: function() {
    this.refs.window.hide();
  },

  //handler
  handleVisibleWindow: function() {

    this.refs.configEditor.resize();
    this.refs.locationConfigEditor.resize();
  },

  handleClickSave: function() {
    var self=this;
    var doSave = function() {
      if(self.refs.objectTypeForm.isValid()) {

        var values = self.state.values;

        if(!values.ModuleConfig) {
          //dataFeeder!!!! must have
          values.ModuleName = 'HTTPReceiver';
        };

        values.ModuleConfig = {
          Config: self._getQueryText()
        };

        self.props.onSave(values);
      }
    }

    console.log(this.orginalName, this.refs.nameField.getValue());
    if (this.orginalName !== this.refs.nameField.getValue())
    {
      this.props.checkNameDuplication(this.refs.nameField.getValue(), function(body) {
        if (body.length != 0) {
          var el = self.gethtmlelement(self.refs.nameField);
          el.style.borderColor = 'red';
          el.focus();
          n.notification.error('This name,' + self.refs.nameField.getValue() + ' is already used for ' + ((body[0].ModuleName === "DPLProcessor")?"ObjectType":"Feeder"));
        } else {
          doSave();
        }
      });
    } else {
      doSave();
    }
  },

  _getQueryText: function() {
    return this.refs.configEditor.getText();
  },
  _readOnly: function() {
    return this.state.config ? true : false;
  },
  gethtmlelement: function(reactEl)
  {
    var el = ReactDOM.findDOMNode(reactEl);
    if(el){
      return el.getElementsByTagName('input')[0];
    }
    else {
      return null;
    }
  },
  changeBorderColor: function(reactEl, color)
  {
    this.gethtmlelement(reactEl).style.borderColor = color;
  },
  onBlurOfNameField: function() {
    var self = this;
    console.log(this.orginalName, this.refs.nameField.getValue());
    if (this.orginalName !== this.refs.nameField.getValue())
    {
      this.props.checkNameDuplication(this.refs.nameField.getValue(), function(body) {
        if (body.length != 0) {
          self.changeBorderColor(self.refs.nameField, 'red');
          //n.notification.error('This name,' + self.refs.nameField.getValue() + ' is already used.');
          n.tooltip.show(self.refs.nameField, {
            content: 'This name,' + self.refs.nameField.getValue() + ' is already used for ' + ((body[0].ModuleName === "DPLProcessor")?"ObjectType":"Feeder"),
            position: 'bottom right'
          });
        } else {
          n.tooltip.hide(self.refs.nameField);
          self.changeBorderColor(self.refs.nameField, '');
        }
      });
    } else {
      n.tooltip.hide(self.refs.nameField);
      this.changeBorderColor(this.refs.nameField, '');
    }
  },
  render: function() {

    return (
      <n.Window
        ref="window"
        title={this.state.title}
        onShow={this.handleVisibleWindow}
        height={600}
      >
        <n.FlexLayout direction="horizontal">

          <n.Form
            flex={1}
            values={this.state.values}
            ref="objectTypeForm"
            labelWidth={150}
            fieldWidth={400}
          >
          <n.TextField
            label="Name"
            name="Name"
            ref="nameField"
            readOnly={this._readOnly()}
            required={true}
            width={400}
            onBlur={this.onBlurOfNameField}
            />
            <n.TextField label="ModuleName" name="ModuleName" width={400} />
            <n.TextField label="ModuleType" name="ModuleType" width={400} />
            <n.TextField label="Description" name="Description" width={400} />

            <div style={{display: "flex", marginBottom: 4}}>
              <p style={{color: "black", flex: 1, paddingLeft: 13}}>Config</p>
            </div>

            <div style={{padding: 10}}>
              <n.Editor
                mode="plain/text"
                ref="configEditor"
                value={this.state.configStr}
                onChange={this.handleChangeEditor}
                height={337}
                width="100%"
              />
            </div>
          </n.Form>

          <n.Form
            flex={1}
            ref="location"
            labelWidth={150}
          >
            <n.Select
              label="Location"
              labelWidth={100}
              width="100%"
              options={[ "a", "b", "c" ]}
              value={this.state.metricType}
              onChange={this.handleChangeSelect}
            />

            <div style={{padding: 10}}>
              <n.Editor
                mode="plain/text"
                ref="locationConfigEditor"
                height={522}
                width="100%"
              />
            </div>
          </n.Form>

        </n.FlexLayout>

        <n.Toolbar align="center">
          <n.Button text={"Cancel"} ui={"cancel"}/>
          <n.Button text={"Save"} onClick={this.handleClickSave} />
        </n.Toolbar>

      </n.Window>
    );
  }
});
