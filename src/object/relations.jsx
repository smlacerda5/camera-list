var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';
var NEW_MODE = 'new';
var Autosuggest = require('react-autosuggest');
require('./css/autosuggest.css');

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}


module.exports = React.createClass({
  displayName: 'Relations',
    isField: true,
    validate: function() {
      return true;
    },
  getInitialState: function() {
    return {
      values: [],
      relatedObjects:[],
      suggestions:[],
      pairtargets:[],
      isValid:true,
      selectedObjectType: null,
      relationList: {},
      relatedTypes: []
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.typeRelation) return;
    if (this.props.newObjName != nextProps.newObjName) {
      this.state.values.forEach(function (val) {
        if (val.relType == 'Pair') val.myName = nextProps.newObjName;
      });
    }
    if (this.props.typeRelation != nextProps.typeRelation) {
      var self = this;
      var result = [];
      var pairTarget = [];
      var relatedTypes = [];
      var relationList = {};
      if (nextProps.typeRelation) {
        var keys = Object.keys(nextProps.typeRelation);
        keys.forEach(function (key){
          nextProps.typeRelation[key].forEach(function(rel){
          var splitedValue = rel.split(':_^_:');
            if (key == 'From' || key == 'Pair') {
              var newRelation = splitedValue[2] + ' / ' + splitedValue[3];
              relatedTypes.push(splitedValue[1]);
              relationList[splitedValue[1]] ? relationList[splitedValue[1]].push(newRelation) : relationList[splitedValue[1]] = [newRelation];
            }
            else {
              var newRelation = splitedValue[3] + ' / ' + splitedValue[2];
              relatedTypes.push(splitedValue[0]);
              relationList[splitedValue[0]] ? relationList[splitedValue[0]].push(newRelation) : relationList[splitedValue[0]] = [newRelation];
            }
          });
        });
      }

      if (nextProps.values) {
        this.firstPairIndex = (nextProps.values.From && nextProps.values.To) ? nextProps.values.From.length + nextProps.values.To.length : 0;
        var keys = Object.keys(nextProps.values);
        for(var i in keys) {
          var key = keys[i];
          var relations = nextProps.values[key];
          relations.forEach(function (val) {
            var splitedValue = val.split(':_^_:');
            var valObj = {relType: key};
            if (key == 'From' || key == 'Pair') {
              valObj.myName = splitedValue[0];
              valObj.targetName = splitedValue[1];
              valObj.fromRelation = splitedValue[2];
              valObj.toRelation = splitedValue[3];
              if (key == 'Pair') pairTarget.push(splitedValue[1]);
            }
            else {
              valObj.myName = splitedValue[1];
              valObj.targetName = splitedValue[0];
              valObj.fromRelation = splitedValue[3];
              valObj.toRelation = splitedValue[2];
            }
            valObj.selectedObjType = self.props.objPair[valObj.targetName];
            result.push(valObj);
            var newRelation = valObj.fromRelation + ' / ' + valObj.toRelation;
            relationList[valObj.targetName] ? _.union(relationList[valObj.targetName],[newRelation]) : relationList[valObj.targetName] = [newRelation];
          });
        }
      }
      self.setState({
        values: result,
        pairtargets: pairTarget,
        relationList: relationList,
        relatedTypes: relatedTypes
      });
    }
  },

  getSuggestions: function(value, idx) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(escapedValue, 'i');
    const targetObjType = this.state.values[idx].selectedObjType;
    if (!targetObjType || !this.props.allObjects[targetObjType]) return [];
    return this.props.allObjects[targetObjType].filter(val => regex.test(val));
  },

  onTargetObjectChange: function(event, { newValue }, idx) {
    var newValues = Object.assign([], this.state.values);
    newValues[idx].targetName = newValue;
    newValues[idx]['fromRelation'] = '';
    newValues[idx]['toRelation'] = '';
    this.setState({
      values: newValues
    });
  },    
    
  onSuggestionsFetchRequested: function({ value }, idx) {
    this.setState({
      suggestions: this.getSuggestions(value, idx)
    });
  },

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested: function() {
    this.setState({
      suggestions: []
    });
  },    
    
    
  handleObjTypeChange: function(e, i) {
    var newValues = Object.assign([], this.state.values);
    newValues[i]['selectedObjType'] = e.target.value;
    newValues[i]['targetName'] = '';
    newValues[i]['fromRelation'] = '';
    newValues[i]['toRelation'] = '';
    this.setState({values: newValues});
  },

  handleRelationChange: function(e, i) {
    var splitedValue = e.target.value.split(' / ');
    var newValues = Object.assign([], this.state.values);
    newValues[i]['fromRelation'] = splitedValue[0];
    newValues[i]['toRelation'] = splitedValue[1];
    this.setState({values: newValues});
  },

  handleAddBtnClick: function() {
    var newPair = {relType: 'Pair'};
    newPair.myName = this.props.newObjName;
    newPair.targetName = '';
    newPair.fromRelation = '';
    newPair.toRelation = '';
    newPair.selectedObjType = '';
    var newValues = Object.assign([], this.state.values);
    newValues.push(newPair);
    this.setState({values: newValues});
  },

  handleClickRemove: function(comp) {
    var i=comp.props.itemIndex;
    var newValues = Object.assign([], this.state.values);
    newValues.splice(i, 1);
    this.setState({values: newValues});
  },
    
    handleIt: function(event) {
      var output=this.state.pairtargets;
      var idx = event.target.id.substring(5,event.target.id.length);
      idx=parseInt(idx);
      output[idx]=event.target.value;
      var finalvalues=this.state.values;
      var v=finalvalues.Pair[idx];
      var allv  = v.split(":_^_:");
      allv[1]=event.target.value;
      v=allv.join(":_^_:");
      finalvalues.Pair[idx]=v;
    //  this.state.values.Pair[idx]=v;
  //this.state.pairtargets=output;
      //this.forceUpdate();
      var x =this.state.values;
      x.Pair[idx]=v;
          var self = this;
    //setTimeout(() => self.setState({values: x, pairtarget: output}));
      this.state.values=x;
      this.state.pairtarget=output;
      //event.target.focus();
      //console.log(this);
      //this.ref[event.target.id].focus();
    },
  _updateAutoComplete(event,relType,idx,val,oldval) {
    var output=this.state.values;
    var v=output[relType][idx];
    var target = v.split(":_^_:");
    target[1]=event.target.value;
    
    output[relType][idx]=target[0]+":_^_:"+target[1]+":_^_:"+target[2]+":_^_:"+target[3];
    var pairs=this.state.pairtargets;
    pairs[idx]=target[1];
    
    this.setState({values: output},{pairtargets: pairs});
  },

  getObjectByType: function(type) {
    var list = [];
    this.props.allObjects.map(function (objcet) {

    })
  },

  _getChildPair: function(value, idx, myMode) {
    var self=this;
    var AddBtnKey = "AddBtn_"+idx;
    var targetName = this.state.values[idx].targetName;
    const inputProps = {
      value: targetName,
      onChange: value.selectedObjType ? (evt, { newValue }) => this.onTargetObjectChange(evt, {newValue}, idx) : ()=>{}
    };
    return (
      <tr key={value + idx.toString()}>
       
        <td id={value.relType+"_"+idx}>
          <n.TextField
            style={{flex: 1}}
            width="100%"
            key={"Name_"+"_"+idx}
            itemIndex = {idx+"~myName"}
            labelWidth={80}
            layout="float"
            value={value.myName}
            name="Name"
            readOnly={true}
            disabled={myMode == VIEW_MODE}
          />
        </td>
        <td id={value.relType+"_"+idx}>
          {
            myMode == VIEW_MODE ?
            <n.TextField
              style={{flex: 1}}
              width="100%"
              key={"relationName"+"_"+idx}
              labelWidth={80}
              layout="float"
              value={value.fromRelation + ' / ' + value.toRelation}
              name="relationName"
              readOnly={true}
              disabled={true}
            />
            :
            <select
              key={"relationName"+"_"+idx+value.targetName+value.selectedObjType}
              value={value.fromRelation + ' / ' + value.toRelation}
              onChange={(event)=>this.handleRelationChange(event, idx)}
              style={{width: '100%', height: 36, padding: '.75em'}}
              disabled={(value.targetName == '') || (!this.props.allObjects[value.selectedObjType]) || (this.props.allObjects[value.selectedObjType].indexOf(value.targetName) == -1)}
            >
              <option key={'Relation_'+idx+'Default'} value=' / ' disabled defaultValue hidden></option>
              {
                (value.targetName != '') && (this.props.allObjects[value.selectedObjType]) && (this.props.allObjects[value.selectedObjType].indexOf(value.targetName) != -1) &&
                this.state.relationList[value.selectedObjType].map(function (relation, i) {
                  return (
                    <option key={'Relation_'+idx+'_Option_'+i} value={relation}>{relation}</option>
                  );
                })
              }
            </select>
          }
        </td>

        <td id={value.relType+"_"+idx}>
          {
            myMode == VIEW_MODE ?
              <n.TextField
                style={{flex: 1}}
                width="100%"
                key={"TagetName_"+"_"+idx}
                labelWidth={80}
                layout="float"
                value={value.targetName}
                name="Name"
                disabled={true}
                readOnly={true}
              />
              :
              <Autosuggest
                key={"TagetName_"+"_"+idx+value.selectedObjType}
                id={"TagetName_"+"_"+idx+value.selectedObjType}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={({ value }) => this.onSuggestionsFetchRequested({ value }, idx)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
          }
        </td>

        <td id={value.relType+"_"+idx}>
          {
            myMode == VIEW_MODE ?
            <n.TextField
              style={{flex: 1}}
              width="100%"
              key={'ObjectType'+idx}
              labelWidth={80}
              layout="float"
              value={value.selectedObjType}
              name="ObjectTypeName"
              readOnly={true}
              disabled={true}
            />
            :
            <select
              key={'ObjectType'+idx+value.selectedObjType}
              value={value.selectedObjType}
              onChange={(event)=>this.handleObjTypeChange(event, idx)}
              style={{width: '100%', height: 36, padding: '.75em'}}
            >
              <option key={'ObjectType_'+idx+'Default'} value='' disabled defaultValue hidden></option>
              {
                this.state.relatedTypes.map(function (type, i){
                  return (
                    <option key={'ObjectType_'+idx+'_Option_'+i} value={type}>{type}</option>
                  );
                })
              }
            </select>
          }
        </td>

        <td id={value.relType+"_"+idx}>
          <n.Button
            style={{marginLeft: 0}}
            key={AddBtnKey}
            ui="circular"
            icon={"minus"}
            itemIndex={idx}
            onClick={this.handleClickRemove}
            disabled={myMode == VIEW_MODE}
          />
        </td>
      </tr>);
  },
    getValid: function()
    {
    //    var isValid=true;  
        for(var i =0;i<this.state.pairtargets.length;i++)
        {
            if(this.state.relatedObjects.indexOf(this.state.pairtargets[i])==-1)
                {
                    return false
                }
        }
        return true;
    },
  getValues: function()
  {
    var relationSource = {
      From: [],
      Pair: [],
      To: []
    };

    var separator = ':_^_:';
    var error = '';
    this.state.values.forEach(function (value){
      if (!(value.myName && value.targetName && value.fromRelation && value.toRelation)) {
        error = 'empty value';
      }
      var key = value.relType;
      var relation;
      if (key == 'From' || key == 'Pair') {
        relation = value.myName + separator + value.targetName + separator + value.fromRelation + separator + value.toRelation;
      }
      else {
        relation = value.targetName + separator + value.myName + separator + value.toRelation + separator + value.fromRelation;
      }
      if (relationSource[key].indexOf(relation) == -1) relationSource[key].push(relation);
    });
    if (error) {
      return {
        error: error
      };
    }
    return relationSource;
  },
  
  render: function() {
    var tbodyData = [];
    var self = this;
    this.state.values.forEach(function (relation, i) {
      if (!relation.relType.includes('Pair'))
        tbodyData.push(self._getChildPair(relation, i, "view"));
      else
        tbodyData.push(self._getChildPair(relation, i, "edit"));
    })
    return (
      <n.Panel title="Relations" ui="property" collapsible={true}>
    <style>
        {"#Pair_" + this.firstPairIndex + "{border-top:1px solid #cccccc;}"
         }
    </style>
      <div>
        <div className="warning-description"> “Relations” that are manually added in this field is NOT shown on the “Object Type Rule” screen because they are not defining Data Flows. “Object Type Rule” screen is used to define Data Flows.</div>
        <table className="ui celled table unstackable">
          <thead>
            <tr key="header_tr">
              <th width="20%">Source Object</th>
              <th width="30%"  style={{fontSize:'20px'}}> <center>&#8592;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8594;</center></th>
              <th width="20%">Target Object</th>
              <th width="20%">Object Type</th>
              <th width="10%"></th>    
            </tr>
          </thead>
          <tbody>
          {tbodyData}
          <tr key="Circular_Plus_tr">
            <td colSpan="6">
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
