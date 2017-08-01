/** @jsx React.DOM */

var Autocomplete = React.createClass({
  getDefaultProps: function(){
    return {
      defaultValue: 2,
      limitToList: true,
      maxItemsShown: 8,
      sourceUrl: null,
      defaultList: [
        { value: 1, label: 'apple' },
        { value: 2, label: 'banana' },
        { value: 3, label: 'orange' },
        { value: 4, label: 'grape' } ,
        { value: 5, label: 'cherry' } ,
        { value: 'orange' } ,
        { label: 'watermelon' } 
      ],
      alsoSearchValues: false,
      loadUrlOnce: true,
      selectAllTextOnClick: true,
      onNoMatch: function(){}
    };
  },
  getInitialState: function(){    
    return {
      list: this._loadList(this.props.defaultList),
      currentValue: this.props.defaultValue,
      highlightedValue: this.props.defaultValue,
      showItems: false
    };
  },
  _loadList: function(listToLoad){
    if (!listToLoad || listToLoad.length === 0){
      this.setState({ list: [] });
    }
    
    var newList = listToLoad;
    console.log(listToLoad);
    newList.forEach(function(item){
      console.log(item);
      if (!item.hasOwnProperty('label')){
        item.label = item.value;      
      }
      if (!item.hasOwnProperty('value')){
        item.value = item.label;         
      }
    });
    return newList;
  },
  render: function(){ 
    return <div>
      <input
        ref='input' 
        onChange={this._onChange} onFocus={this._onFocus} onBlur={this._onBlur} onClick={this._onInputClick}
         />
      {this.state.currentValue}<br/>
      {this.state.showItems?
         <ol style={{position: 'absolute', backgroundColor:'white', color:'black', listStyle: 'none', padding: 0, margin: 0}}
            onMouseLeave={this._onMouseLeave}>
           {this._renderMatches()}
         </ol>:
         null}
      {this._highlightedIndex()}
    </div>;
  },
  _renderMatches: function(){
    return this._currentMatches()
      .map(function(item, i){
        return <AutocompleteItem highlighted={item.value === this.state.highlightedValue}
          key={i} label={item.label} value={item.value}
          onItemClick={this._onItemClick}
          onItemMouseOver = {this._onItemMouseOver} />
      }.bind(this));
  },
  _currentMatches: function(){
    return _(this.state.list)
      .filter(function(item){
        return item.label.indexOf(this._input()) > -1;
      }.bind(this))
      .value();    
  },
  _highlightedIndex: function(){
    return _(this._currentMatches())
      .findIndex(function(item){
        return item.value === this.state.highlightedValue;
      }, this);
  },
  _updateHighlightedValue: function(){
    var newValue;
    if (this._highlightedIndex() < 0){
      newValue = this.state.list[0].value;
    } else {
      newValue = this.state.list[this._.highlightedIndex()];
    }
    this.setState({ highlightedValue: newValue });
  },
  componentDidMount: function(){    
    this._setInputFromValue();
       
    document.onkeydown = function(e){
      switch (e.keyCode){
        case 13: // enter
          this._setInputFromValue();          
          break;
        case 9: // tab
          //this._setInputFromValue();       
          this._setFromHighlighted();
          break;
        case 27: // escape
          
          break;
        case 38: // up
          var hIndex = this._highlightedIndex();
          if (hIndex > 0){
            this.setState({
              highlightedValue: this._currentMatches()[hIndex - 1].value
            });                
          }      
          break;
        case 40: // down
          var hIndex = this._highlightedIndex();
          if (hIndex < this._currentMatches().length - 1){
            this.setState({
              highlightedValue: this._currentMatches()[hIndex + 1].value
            });   
          }
          break;
      }
    }.bind(this);
  },
  _setInputFromValue: function(){
    if (!this.isMounted()){
      return;
    }
    
    this.refs.input.getDOMNode().value =
      _(this.state.list)
      .findWhere({ value: this.state.currentValue })
      .label;    
  },
  _setValueFromInput: function(){
    if (!this.isMounted()){
      return;
    }
    
    var inputText = this.refs.input.getDOMNode().value;
    var foundItem =
      _(this.state.list)
      .find(function(item){
        return item.label.indexOf(inputText) > -1;
      });
    
    if (typeof foundItem !== 'undefined'){
      this.setState({
        currentValue: foundItem.value, highlightedValue: foundItem.value
      });      
    } else {
      this.props.onNoMatch(this.state);
      if (this.props.limitToList){
        this.setState({
          currentValue: this.props.defaultValue, highlightedValue: this.props.defaultValue
        });
      }
    }     
  },
  _setFromHighlighted: function(){
    this.setState({
      currentValue: this.state.highlightedValue
    }, function(){
      this._setInputFromValue();
    }.bind(this));
  },
  _input: function(){
    if (!this.isMounted()){
      return '';
    }
    
    return this.refs.input.getDOMNode().value;
  },
  _onChange: function(){
    this._setValueFromInput();
  },
  _onFocus: function(){
    this.setState({ showItems: true });
  },
  _onBlur: function(){
    this._setFromHighlighted();
    this.setState({ showItems: false });
  },
  _onItemClick: function(item){
    this.setState({
      currentValue: item.value
    }, function(){
      this._setInputFromValue();
    }.bind(this));
  },
  _onItemMouseOver: function(item){
    this.setState({ highlightedValue: item.value });
  },
  _onMouseLeave: function(item){
    this.setState({ highlightedValue: this.state.currentValue });
  },
  _onInputClick: function(){
    this.refs.input.getDOMNode().select();
  }
});

var AutocompleteItem = React.createClass({
  getDefaultProps: function(){
    return {
      value: null, label: null, 
      onItemClick: function(){}, onItemMouseOver: function(){}, onItemMouseLeave: function(){}
    };
  },
  getInitialState: function(){
    return { hover: false };
  },
  render: function(){
    return <li 
      style={{backgroundColor: this.props.highlighted? 'hsl(90,50%,50%)':'', zIndex: 9999}}
      onMouseDown={this._onClick} onMouseOver={this._onMouseOver}>{this.props.label}
    </li>;
  },
  _onClick: function(){
    if (this.props.selectAllTextOnClick){
      this.props.onItemClick(this.props);      
    }
  },
  _onMouseOver: function(){
    this.props.onItemMouseOver(this.props);
  }
});

React.renderComponent(
  <Autocomplete />,
  document.getElementById('content')
);