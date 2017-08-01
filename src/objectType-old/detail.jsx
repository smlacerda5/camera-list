var Toolbar = require('./../ui/toolbar');
var Relations = require('./relations');
var Properties = require('./properties');
var Metrics = require('./metrics');

module.exports = React.createClass({
  displayName: 'ObjectType2 Detail',
  getInitialState: function() {
    return {
      values: this.props.values
    }
  },
  componentWillReceiveProps: function(nextProps) {
      console.log("%%%%");
      console.log(nextProps);
    this.setState({
      values: nextProps.values
    });
  },
  handleClickSave: function() {
    let isValid = this.refs.form.isValid();
    if (!isValid) return;

    var values = this.refs.form.getValues();
    console.log("Save_values: ", values);
    var relations = this.refs.relations.getValues();
    console.log("Save_relations: ", relations);
    var properties = this.refs.properties.getValues();
    console.log("Save_properties: ", properties);
    //var metrics = this.refs.metrics.getValues();
    //console.log("Save_metrics: ", metrics);
    values.Relations = relations;
    values.Properties = properties;
    if (!values.ModuleName) values.ModuleName="DPLProcessor";
    if (!values.ModuleType) values.ModuleType="Processor";
    if (!values.ModuleConfig) values.ModuleConfig={};
    if (!values.ModuleConfig.Metric) values.ModuleConfig.Metric={};
    if (!values.ModuleConfig.Object) values.ModuleConfig.Object={};
    if (!values.ModuleConfig.Query) values.ModuleConfig.Query="";
    if (!values.LevelTable) values.LevelTable=[];

/*
    for(var idx in metrics)
    {
      console.log("Metric:" + idx);
      var StatusConditionName = metrics[idx];
      if (!values.ModuleConfig.Metric[idx]) values.ModuleConfig.Metric[idx]={};
      values.ModuleConfig.Metric[idx].DataType = this.props.ruleStatusCondition[StatusConditionName].Type;
      values.ModuleConfig.Metric[idx].Config = this.props.ruleStatusCondition[StatusConditionName].Conditions;
      values.ModuleConfig.Metric[idx].StatusConditionName=StatusConditionName;
    }
*/
    console.log("Save_values: ", values);
    this.props.onSave(values);
  },
  // handleClickNewBtn: function() {
  //   this.setState(
  //     {
  //       values:{
  //         Name: "",
  //         Description: "",
  //         Relations: {},
  //         Properties: {},
  //         LevelTable: [],
  //         ModuleType: "Processor",
  //         ModuleName: "DPLProcessor",
  //         ModuleConfig:
  //         {
  //           Query: "",
  //           Object: "",
  //           Metric: {},
  //           Template: {}
  //         }
  //       }
  //     });
  //   console.log(this.refs.form);
  // },
  render: function() {
    /*
    <Metrics
      ref="metrics"
      values={(this.state.values && this.state.values.ModuleConfig)?this.state.values.ModuleConfig.Metric:{}}
      ruleStatusConditionList={this.props.ruleStatusConditionList}
      mode="EDIT"
    />
    */
    let rules = [
      {
        type: 'regExp[/^[a-zA-Z_-]{1,50}$/]',
        prompt: 'The name must be entered in alphabet characters more than 1 character without empty space.'
      }
    ];

    return (
      <n.FlexLayout direction="vertical" style={{ overflowY: 'auto' }}>
        <div data-target="info" style={{overflowX: "hidden"}}>
          <n.Form ref="form" values={this.state.values} readOnlyAll={false} style={{ border: 'none' }}>
            <n.TextField label="Name" name="Name" width="100%" rules={rules} required={true} />
            <n.TextField label="Description" name="Description" width="100%" />
          </n.Form>

        </div>
        <Relations
          ref="relations"
          values={this.state.values.RelationSource}
          mode="view"
          objectTypeList={this.props.objectTypeList}
          To={this.props.toList}
          From={this.props.fromList}
          parent={this.state.values.Name}
        />
        <Properties
          ref="properties"
          values={this.state.values.Properties}
          mode="EDIT"
        />
        <div style={{marginTop: 13}}>
          <n.Button text="Save" onClick={this.handleClickSave} style={{float: "right", marginRight: '11px' }} ui="primary" />
        </div>
      </n.FlexLayout>
    )
  }
});
