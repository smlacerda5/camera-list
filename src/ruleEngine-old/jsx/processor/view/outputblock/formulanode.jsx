var GroupValueNode = require('../common/element/groupedvaluenode');
var AttrNode = require('../common/element/attrnode');
var TableTools = require('../../util/tabletools');
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            focusState: 0
        };
    },
    onValueClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.dplBuilder.selectFormula('value', this.props.config.path);
    },
    onAttrClick: function(path) {
        this.props.dplBuilder.selectFormula('attribute', this.props.config.path);
    },
    onMouseDown: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
    },
    onMouseOver: function(e) {
        this.setState({focusState: 1});
    },
    onMouseLeave: function(e) {
        this.setState({focusState: 0});
    },
    onRemove: function(e) {
        this.props.onRemove(this.props.config.path);
    },
    createTableComponents: function(matrix, tableInfo, className) {
        var self = this;
        var rowIndex = 0;
        if(matrix) {
            return matrix.map(function (row) {
                var colComponents = [];
                for (var i = row.length; i-- > 0;) {
                    var col = row[i];
                    var prop = {className: 'metric-table-td', key: 'col_' + i};

                    if (col.noc > 1) prop.rowSpan = col.noc;
                    if (col.isLeaf) {
                        var depthDiff = tableInfo.maxDepth - col.depth;
                        if (depthDiff > 0) prop.colSpan = depthDiff + 1;
                    }

                    colComponents.push(React.createElement('td', prop, <GroupValueNode config={col} className={className} dplBuilder={self.props.dplBuilder}/>));
                }
                return React.createElement('tr', {key: 'row_' + rowIndex++}, colComponents);
            });
        }
    },
    render: function() {
        var className = 'metric value';
        var value = this.props.config.value;
        var attr = this.props.config.attr;

        if(this.props.config.error != null) {
            value = 'ERROR';
            className += ' error';
        }
        else if(this.props.config.select != null && this.props.config.select == 'value') {
            className += ' selected';
        }
        else {
            switch (this.state.focusState)
            {
                case 1: className += " mouseover"; break;
                case 2: className += " dragover"; break;
            }
        }

        var outerKey = this.props.config.path.join('.');
        var valueComponents = [];
        if(value == null || typeof value != 'object') {
            if(value == null) value = 'null';
            else if(typeof value != 'string') value = value.toString();
            if(this.props.hasAttr) {
                valueComponents.push(<p key={outerKey+'.value'} style={{paddingRight: '40px'}}>{ value }</p>);
                valueComponents.push(<AttrNode key={outerKey+'.attribute'} onClick={this.onAttrClick} enableTableClick={false} tableConfig={this.props.tableConfig} config={this.props.config} dplBuilder={this.props.dplBuilder} />);
            }
            else {
                valueComponents.push(<p key={outerKey+'.value'}>{ value }</p>);
            }
            className += ' single';
        }
        else if((Array.isArray(value) && value.length <= 0) || (Object.keys(value).length <= 0)) {
            value = 'null';
            if(this.props.hasAttr) {
                valueComponents.push(<p key={outerKey+'.value'} style={{paddingRight: '40px'}}>{ value }</p>);
                valueComponents.push(<AttrNode key={outerKey+'.attribute'} onClick={this.onAttrClick} enableTableClick={false} tableConfig={this.props.tableConfig} config={this.props.config} dplBuilder={this.props.dplBuilder} />);
            }
            else {
                valueComponents.push(<p key={outerKey+'.value'}>{ value }</p>);
            }
            className += ' single';
        }
        else {
            var valueTableInfo = { maxDepth: 0 };
            var valueMatrix = TableTools.dataToTableMatrix(value, attr, [], 1, valueTableInfo);
            var tableContent = this.createTableComponents(valueMatrix, valueTableInfo, className + ' single');
            valueComponents.push(<table key={outerKey+'.value'} className='metric-table' style={{width:'100%'}}><tbody>{tableContent}</tbody></table>);
            className = 'metric-composit';
        }

        return (
            <div key={outerKey} className={className} onClick={this.onValueClick} onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                {valueComponents}
            </div>
        )
    }
});
