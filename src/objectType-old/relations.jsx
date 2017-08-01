var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';
var NEW_MODE = 'new';
var globalindex=0;
var globaldata;
 var MyName="";
const arrowStyle={fontSize:'20px'};

module.exports = React.createClass({
  displayName: 'Relations',
  getInitialState: function() {
    return {
      values: this.updateValues(this.props.values)
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      values: this.updateValues(nextProps.values)
    });
  },
  updateValues: function(values)
  {
    var result = [];
    if (values != undefined)
    {
      var keys = Object.keys(values);
      for(var idx in keys)
      {
        var key = keys[idx];
        var val = values[key];
        result.push({
          'Name':key,
          'Value':(val)?val[0]:''
        })
      }
    }

    return result;
  },
  handleChange: function(comp, val, oldval) { 
      var key=comp.props.itemIndex;
      var itempos= parseInt(key.split("~")[2]);
      var idx=key.split("~")[1];
      var relType=key.split("~")[0];
      var orig=this.state.values[relType][idx];
      var splitrig=orig.split(":_^_:");
      if(relType.includes("To"))
      {
          
          if(itempos==0)
              itempos=1;
          else if(itempos==1)
              itempos=0;
          
      }
      splitrig[itempos]=val;
      var result="";
      for(var i=0;i<splitrig.length;i++)
          {
              if(result!="")
                  result+=":_^_:";
              result+=splitrig[i];
          }
     this.state.values[relType][idx]=result;
      this.props.values[relType][idx]=result;
  },
  handleAddBtnClick: function() {
      if (!this.state.values) return;
      var valueFrom=MyName+":_^_:n:_^_:a:_^_:b";
      this.state.values.Pair.push(valueFrom);
      globalindex++;
      this.forceUpdate();
  },
  handleClickRemove: function(comp) {
    var idx=comp.props.itemIndex;
      var newValues=[];
    for(var i=0;i<this.props.values.Pair.length;i++)
    {
        if(i==idx)
        {
            if(this.props.values.Pair[i+1]!=null)
            {
                newValues.push(this.props.values.Pair[i+1]);
                i++;
            }
        }
        else
            newValues.push(this.props.values.Pair[i]);
    }

      this.state.values.Pair=newValues;
      this.props.values.Pair=newValues;
      this.forceUpdate();
  },


  _getChildPair: function(value, idx, relType, myMode) {
      var splitedValue;
      
      splitedValue=value.split(':_^_:');
      var myName;
      var targetName;
      var fromRelation;
      var toRelation;
      var myDirection;
       if(relType=='From' ||relType=='Pair')
      {
        myName = splitedValue[0];
        targetName = splitedValue[1];
        fromRelation = splitedValue[2];
        toRelation = splitedValue[3];
        myDirection="->";
      }
    else if(relType=='To')
      {
         myName = splitedValue[1];
         targetName = splitedValue[0];
         fromRelation = splitedValue[3];
         toRelation = splitedValue[2];  
         myDirection="<-";
      }
      
      
    var AddBtnKey = "AddBtn_"+idx;
      
      
    return (
      <tr key={value + myDirection + idx.toString()}>
       
        <td id={relType+"_"+idx}>
          <n.TextField
            style={{flex: 1}}
            width="100%"
            key={"Name_"+relType+"_"+idx}
            itemIndex = {relType+"~"+idx+"~0"}
            labelWidth={80}
            layout="float"
            value={myName}
            name="Name"
            onChange={this.handleChange}
            readOnly={true}
            disabled={true}

          />
        </td>
         <td id={relType+"_"+idx}>
          <n.TextField
            style={{flex: 1}}
            width="100%"
            key={"From"+relType+"_"+idx}
            itemIndex = {relType+"~"+idx+"~2"}
            labelWidth={80}
            layout="float"
            value={fromRelation}
            name="From"
            onChange={this.handleChange}
            readOnly={(myMode == VIEW_MODE)}
            disabled={relType!="Pair"}
          />
        </td>      
        <td id={relType+"_"+idx}>
          <n.TextField
            style={{flex: 1}}
            width="100%"
            key={"To"+relType+"_"+idx}
            itemIndex = {relType+"~"+idx+"~3"}
            labelWidth={80}
            layout="float"
            value={toRelation}
            name="To"
            onChange={this.handleChange}
            readOnly={(myMode == VIEW_MODE)}
           disabled={relType!="Pair"}
          />
        </td>       
        <td id={relType+"_"+idx}>
          <n.Select
            style={{flex: 1, marginLeft: 5, width: "40px"}}
            width="100%"
            key={"Value_"+relType+"_"+idx}
            itemIndex = {relType+"~"+idx+"~1"}
            layout="float"
            value={targetName}
            name="Value"
            options={this.props.objectTypeList}
            onChange={this.handleChange}
            rt={relType}
            readOnly={(myMode == VIEW_MODE)}
            disabled={relType!="Pair"}
          />
        </td>
        
               
        <td id={relType+"_"+idx}>
          <n.Button
            style={{marginLeft: 0}}
            key={AddBtnKey}
            ui="circular"
            icon={"minus"}
            itemIndex={idx}
            onClick={this.handleClickRemove}
            disabled={(myMode == VIEW_MODE)}
          />
        </td>
      </tr>);
  },
  getValues: function()
  {
      return this.state.values;
  },
  
  render: function(){
    
      
    var tbodyData = [];
    var data = this.props.values;
      this.state.values=this.props.values;
      MyName=this.props.parent;
      var self = this;
      if(data != null) {
          for(var relType in data) {
              if(relType=='To'||relType == 'From' ||relType=='Pair') {
                data[relType].map(function(item, index) {
                    if(!relType.includes('Pair'))
                        tbodyData.push(self._getChildPair(item, index,relType,"view"));  
                    else
                        {
                            tbodyData.push(self._getChildPair(item, index,relType,"edit"));  
                        }
                 
                    globalindex++;
                            
                    
                });    
                
          }
             
          
          }
      }
    return (
      <n.Panel title="Relations" ui="property" collapsible={true}>
    <style>
        {"#Pair_0{border-top:1px solid #cccccc;}"
         }
    </style>
      <div>
        <div className="warning-description"> “Relations” that are manually added in this field is NOT shown on the “Object Type Rule” screen because they are not defining Data Flows. “Object Type Rule” screen is used to define Data Flows.</div>
        <table className="ui celled table unstackable">
          <thead>
            <tr key="header_tr">
              <th width="20%">My ObjectType</th>
              
              <th width="25%"  style={arrowStyle}> <center>&#8592;</center></th>
              <th width="25%" style={arrowStyle} > <center>&#8594;</center></th>
                <th width="20%">Target ObjectType</th>
              <th width="10%"></th>    
            </tr>
          </thead>
          <tbody>
          {tbodyData}
          <tr key="Circular_Plus_tr">
            <td colSpan="5">
              <n.Button
                key="Circular_Plus"
                ui="circular secondary right"
                style={{ float: 'right' }}
                icon={"plus"}
                onClick={this.handleAddBtnClick}
              />
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      </n.Panel>
    );
  }
});
