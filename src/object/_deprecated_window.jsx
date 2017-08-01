var SELECT_PAGE = 0;
var EDIT_PAGE = 1;

var _forEach = require('lodash/forEach');
var _assign = require('lodash/assign');
var _map = require('lodash/map');
var _isEmpty = require('lodash/isEmpty');
var Relation = require('./relations');
module.exports = React.createClass({
	displayName: 'ObjectWindow',
	getInitialState: function() {
		var self=this;
		n.call("object.list", {export: false}, function(err, res) {
			var results=res.body
			var output={};
			var pair = {};
			results.forEach(function(obj) {
				output[obj.ObjectTypeName] ? output[obj.ObjectTypeName].push(obj.Name) : output[obj.ObjectTypeName] = [obj.Name];
				pair[obj.Name] = obj.ObjectTypeName;
			});
			self.setState({allObjects: output, objPair: pair});
		});
		return {
			mode: 'new',
			title: 'default object Title',
			values: {},
			relations: {},
			properties: {},
			playerTypeName: 'map',
			playerProperties: {},
			objectTypeList: [],
			typeRelation: {},
			allObjects:[],
			newObjName: '',
			objPair: {},
			errorMsg: ''
		}
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.mode == 'new') {
			this.refs.stackLayout.move(SELECT_PAGE, false)
		} else {
			this.refs.stackLayout.move(EDIT_PAGE, false)
		}
		var self = this;
		n.call('objectType.list', {'queryArg': { 'Name': nextProps.values.ObjectTypeName }}, function(err, res) {
			var properties = Object.assign({}, nextProps.values.Properties);
			if (res.body.length > 0) {
				var keys = Object.keys(res.body[0].Properties);
				keys.map(function (key) {
					if (!properties[key]) properties[key] = [''];
				})
			}
			self.setState({
				mode: nextProps.mode,
				values: nextProps.values,
				relations: nextProps.values.Relations || {},
				properties: properties,
				newObjName: nextProps.values.Name,
				playerTypeName: nextProps.values.PlayerTypeName || 'map'
			});
		});

	},

	componentWillMount: function() {
		var self = this;

		n.call('objectType.list', {}, function(err, res) {
			var typeRelation = {};
			var objectTypeList = _map(res.body, function(item) {
				typeRelation[item.Name] = item.RelationSource;
				return {header: item.Name, meta: item.Description, name: item.Name}
			});
			self.setState({
				objectTypeList: objectTypeList,
				typeRelation: typeRelation
			});
		});
	},

	//api
	show: function() {
		this.refs.objectWindow.show();
	},

	hide: function() {
		this.refs.objectWindow.hide();
	},

	//event handler
	handleCardSelect: function(comp, value) {
		this.refs.stackLayout.next();
		var newVal = {};
		newVal.ObjectTypeName = value.header;
		newVal.RelationSource = {};
		newVal.Name = value.name;
		var self = this;
		n.call('objectType.list', {'queryArg': { 'Name': value.header }}, function(err, res) {
			var properties = {};
			if (res.body.length > 0) {
				var keys = Object.keys(res.body[0].Properties);
				keys.map(function (key) {
					properties[key] = [''];
				})
			}
			self.setState({
				values: newVal,
				newObjName: newVal.Name,
				properties: properties,
			});
		});
	},

	handleClickSaveBtn: function() {
        if(this.refs.objectForm.isMounted())
        {
			var values = Object.assign({}, this.state.values);
            var nameValid = true;
            if (this.state.mode == 'new') {
				var nameError = '';
				values.Name = values.Name.trim();
				if (values.Name.length === 0) nameError = 'Empty Object Name'
                nameValid = !this.props.isNameExist(values.Name);
				if (!nameValid) {
					nameError = 'Duplicate Object Name.';
				}
				if (nameError) {
					this.setState({errorMsg: nameError});
					return;
				}
            }
			var relations = this.refs.relations.getValues();
			if(relations.error) {
				this.setState({errorMsg: relations.error});
				return;
			}
                var playerProperties = this.refs.playerEditor ? this.refs.playerEditor.state : {};
				values.Properties = Object.assign({},this.state.properties);
                this._addProperties(values, this._convertPlayerProperty(playerProperties));
				values.RelationSource = relations;
                if(values.Properties.objectInfo) delete values.Properties.objectInfo;
                this.props.onSave(values);
				this.setState({errorMsg: ''});
                this.forceUpdate();
            /*} else {
                if (!nameValid) {
                    this.refs.objName.setError(true, 'The object name already exists');
                }
            }*/
        }
	},
	handleChangePlayerType: function(comp, value, oldValue, option) {
		this.setState({
			playerTypeName: value
		});
	},
	handleChangeProperty: function() {

		// console.log('handleChangeProperty   : ', arguments);
	},
	_addProperties:function (saveTarget, propArray) {
		if(Object.keys(propArray).indexOf('undefined') == 0) return;
		if(saveTarget.Properties == undefined){
			saveTarget.Properties = {};
		}
		for(var i=0; i < Object.keys(propArray).length; i++){
			let keyVal = Object.keys(propArray)[i];
			if(keyVal != '' && keyVal != undefined){
				saveTarget.Properties[keyVal] = propArray[keyVal];
			}
		}
	},
	_convertPlayerProperty: function(properties) {
		if(properties[this.state.playerTypeName]) {
			properties[this.state.playerTypeName].splice(0,1);
		}
		if(properties){
			var newProperties = {};
			if(this.state.playerTypeName === 'video'){
				let videoProperties = {};
				videoProperties.video_camera = properties.video_camera;
				videoProperties.video_playback = properties.video_playback;
				videoProperties.video_ptz = properties.video_ptz;
				videoProperties.video_rds = properties.video_rds;
				videoProperties.video_server = properties.video_server;
				newProperties[this.state.playerTypeName] = JSON.stringify(videoProperties);
			}else{
				newProperties[this.state.playerTypeName] = JSON.stringify(properties);
			}
			return newProperties;
		}
	},


	_convertProperty: function(properties) {
		if(properties){
			var newProperties = {};
			if (!_isEmpty(properties) && !_isEmpty(properties[0].value)) {
				_forEach(properties, function(item) {
					if (!_isEmpty(item.value)) newProperties[item.name] = item.value;
				});
			}
			return newProperties;
		}
	},
	/**
	 * 선택 가능한 PlayerType을 Options Format으로 반환
	 * @returns {Array}
	 */
	_getPlayerTypes: function() {
		var options = [];

		// player는 window객체에 있습니다.
		try {
			if (window.M && window.M.player) {
				_forEach(M.player, function(_player, _name) {

					options.push({
						text: _name,
						value: _name,
						editor: _player.editor
					});

				});
				return options;
			} else {
				return [];
			}

		} catch (e) {
			return [];
		}
	},

	_renderPlayerPropertyEditor: function(_playerTypeName, _properties) {
		var PlayerEditor;

		if (window.M && window.M.player) {
			PlayerEditor = _playerTypeName ? window.M.player[_playerTypeName].editor : '';
		}

		if (_playerTypeName == 'chart') {
			_properties === undefined ? (_properties = {}, _properties["objectInfo"] = this.state.values) : _properties["objectInfo"] = this.state.values;
		}

		return PlayerEditor ? React.createElement(PlayerEditor, _assign(_properties, {ref: 'playerEditor'})) : null;
	},
    _renderR: function()
    {
        return(
			<Relation
				ref="relations"
				values={this.state.values.RelationSource}
				typeRelation={this.state.typeRelation[this.state.values.ObjectTypeName]}
				mode="view"
				parentType={this.state.values.ObjectTypeName}
				objName={this.state.values.Name}
				allObjects={this.state.allObjects}
				newObjName={this.state.newObjName}
				objPair={this.state.objPair}
			/>
        )
    },

	handlePropertyChange: function (value, key) {
		var newProperties = Object.assign({}, this.state.properties);
		newProperties[key][0] = value;
		this.setState({properties: newProperties});
	},

	_renderProperty: function(_title, _value) {
		var properties = [];
		var self = this;
		for (var key in _value) {
			if(key != 'objectInfo' && key != 'ref' && key != 'map' && key != 'chart' && key != 'video' && key != ''){
				properties.push({
					name: key,
					value: _value[key][0]
				});
			}
		}

		return (
			<n.Panel title="Properties" ui="property" collapsible={true}>
				<style>
					{ "#Pair_0{border-top:1px solid #cccccc;}" }
				</style>
					<n.Form
						ref="propertiesForm"
						labelWidth={150}
						fieldWidth="100%"
					>
						{
							properties.map(function (property) {
								return (
									<n.TextField key={property.name + '-property'} label={property.name} value={property.value} width="100%" onChange={(comp, val)=>{self.handlePropertyChange(val, property.name)}}/>
								);
							})
						}
					</n.Form>
			</n.Panel>
		);
	},
	render: function() {
		var renderProperties = this._renderProperty('Properties', this.state.properties);
		var renderPlayerProperty = this._renderPlayerPropertyEditor(this.state.playerTypeName, this.state.properties);
        //var relations = this.refs.relations.isValid();
        var relations =true;
        var renderRel = this._renderR();
        
		return (
			<n.Window
				title={this.props.title}
				ref="objectWindow"
				height={700}
			>
				<n.StackLayout ref="stackLayout">
					<n.CardView
						ui="container"
						flex={1}
						column={4}
						onCardSelect={this.handleCardSelect}
						data={this.state.objectTypeList}
					/>
					<div className="layout-fit scrollable-y">
						<n.Form
							values={this.state.values}
							ref="objectForm"
							labelWidth={150}
							fieldWidth="100%"
						>

							<n.TextField label="Name" name="Name" required={true} rules={["empty"]} width="100%" ref="objName"
								onChange={(comp ,val)=>{
											 this.setState({newObjName: val.trim()})
										 }}
										 readOnly={this.state.mode == 'new' ? false : true}/>
							<n.TextField label="Label" name="Label" width="100%"/>
							<n.TextField label="ObjectTypeName" name="ObjectTypeName" required={true} rules={["empty"]} width="100%" readOnly={true}/>
							<n.TextField label="Description" name="Description" width="100%"/>

				          </n.Form>
                           {renderRel}
                                    
							{renderProperties}

							<n.Panel title="Player Type" collapsible={true} ui="property bordered">
									<n.Select
										label="Player Type"
										name="PlayerTypeName"
										direction="upward"
										options={this._getPlayerTypes()}
										value={this.state.playerTypeName}
										onChange={this.handleChangePlayerType}
										placeholder="select player Type"
										width="100%"
									  style={{ marginBottom: '10px' }}
									/>
                                
									<div>
										{renderPlayerProperty}
									</div>
							</n.Panel>
						
					</div>

				</n.StackLayout>

				<n.Toolbar align="center">
					<n.Button text={"Cancel"} ui={"cancel"}/>
					<n.Button text={"Save"} ui="primary" onClick={this.handleClickSaveBtn} />
					<div style={{position: 'absolute', right: 20, bottom: 20, color: 'red', fontWeight: 'bold'}}
						 ref='errorMsg'
					>{this.state.errorMsg}</div>
				</n.Toolbar>

			</n.Window>
		)
	}
});