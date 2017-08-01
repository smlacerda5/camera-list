var Toolbar = require('./../ui/toolbar');

module.exports = React.createClass({
    displayName: 'Status Detail',
    getInitialState:function () {
      return{
          btnDisabled:true
      }
    },
    componentWillReceiveProps: function (nextProps) {
        if(nextProps.values.name==undefined){
            this.setState({btnDisabled:true});
        }else if(nextProps.values.name==''){
            this.setState({btnDisabled:true});
        }else{
            this.setState({btnDisabled:false});
        }
    },
    handleTxtNameChange:function (_comp, _value) {
        if(_value.trim()==''){
            this.refs.txtName.setError(true, 'Please insert the name of status');
        }
        if(this.props.mode=='new'){
            var isNameExist = this.props.isNameExist(_value.trim());
            if(isNameExist){
                this.refs.txtName.setError(true, 'The name "' + _value + '" already exists');
            }else{
                this.refs.txtName.setError(false);
            }
            if (_value.trim() != '' && !isNameExist) this.setState({btnDisabled: false});
        }
    },
    handleClickSave: function() {
        let isValid = this.refs.form.isValid();
        var values = this.refs.form.getValues();
        if (isValid){
            if(values.name.trim() ==''){
                this.refs.txtName.setError(true, 'Please insert the name of status');
                return;
            }
            if(this.props.mode=='new'){
                if(this.props.isNameExist(values.name.trim())){
                    this.refs.txtName.setError(true, 'The name "' + values.name + '" already exists');
                    return;
                }
            }
            var weight = Number(values.weight);
            if (weight < 0 || weight > 1)
            {
                n.notification.info('Weight must be in the range of 0.0 to 1.0');
            } else {
                this.props.onSave(values);
            }
        }
    },
    render: function() {
        return (
          <n.FlexLayout direction="vertical" key={Math.floor(Date.now())}>
            <div data-target="info" style={{overflowX: "hidden"}}>
              <n.Form ref="form" values={this.props.values} readOnlyAll={false}>
                <n.TextField label="Name"
                             name="name"
                             width="100%"
                             required={true}
                             ref="txtName"
                             readOnly={(this.props.mode=='update')?true:false}
                             onChange={this.handleTxtNameChange}
                />
                <n.TextField label="Label" name="label" width="100%" />
                <n.TextField label="Weight" name="weight" width="100%"/>
                <n.ButtonGroup label="Flashing"
                               name="blink"
                               width="255px"
                               activeIndex={0}
                               options={[
                                 {text: "On", "value": true},
                                 { text: "Off", "value":false }
                               ]}
                />
                <n.ColorField label="Color" name="color" width="100%" />
                <n.TextField label="Description" name="comment" width="100%" />
              </n.Form>
            </div>
            <div style={{marginTop: 13}}>
              {/*<n.Button text="+New" onClick={this.handleClickNewBtn} />*/}
              <n.Button text="Save" onClick={this.handleClickSave} style={{float: "right", marginRight: '11px' }} disabled={this.state.btnDisabled} ui="primary"/>
            </div>
          </n.FlexLayout>
        )
    }
});
