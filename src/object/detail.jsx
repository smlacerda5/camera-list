var Relations = require('./relations');
module.exports = React.createClass({
  displayName: 'ObjectDetail',
    getInitialState: function() {
    return {
      values: this.props.values
    }
  },
  handleChangeTab: function() {
    this.refs.relationEditor.resize();
    this.refs.propEditor.resize();
    // this.refs.playerPropEditor.resize();
  },
  render: function() {
      
    return (
          <n.Tab
            ref="tab"
              flex={1}
            ui={"secondary pointing"}
            tabs={[
              {id: "info", text: 'Infomation', width:150},
              {id: "relation", text: 'Relation', width:150},
              {id: "property", text: 'Property', width:150}
            ]}
            onChange={this.handleChangeTab}
            style={{padding:10}}
          >
                <div data-target="info" style={{overflowX: "hidden"}}>
                  <n.Form values={this.props.values} readOnlyAll={true}>
                    <n.TextField label="Name" name="Name" width="100%" />
                    <n.TextField label="ObjectTypeName" name="ObjectTypeName" width="100%" />
                    <n.TextField label="Label" name="Label" width="100%" />
                    <n.TextField label="Description" name="Description" width="100%" />
                  </n.Form>
                </div>
                <div data-target="relation" style={{overflowX: "hidden"}}>
                  <n.Editor
                    ref="relationEditor"
                    mode="application/json"
                    value={JSON.stringify(this.props.values.Relations, null, 2)}
                    fit={true}
                    readOnly={true}
                  />
                </div>

            <div data-target="property" style={{overflowX: "hidden"}}>
              <n.Editor
                ref="propEditor"
                mode="application/json"
                value={JSON.stringify(this.props.values.Properties, null, 2)}
                fit={true}
                readOnly={true}
              />
            </div>

          </n.Tab>
        
      

    )
  }
});