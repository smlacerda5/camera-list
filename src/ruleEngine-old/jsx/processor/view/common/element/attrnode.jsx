var TableTools = require('../../../util/tabletools');
var ClickableNode = require('./clickablenode');
var ReadonlyNode = require('./readonlynode');
require('../../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.attrPath = this.props.config.path.slice(0);
        this.attrPath.push('weight');
        return {
            focusState: 0
        };
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        if('onClick' in this.props) {
            this.props.onClick(this.attrPath);
        }
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
    createAttrTableComponents: function(matrix, tableInfo) {
        var self = this;
        var rowIndex = 0;

        return matrix.map(function (row) {
            var colComponents = [];
            for (var i = row.length; i-- > 0;) {
                var col = row[i];
                var key = col.isLeaf ? col.path.join() + ',value' : col.path.join();
                var prop = {className: 'metric-table-td', key: key};

                if (col.noc > 1) prop.rowSpan = col.noc;
                if (col.isLeaf) {
                    var depthDiff = tableInfo.maxDepth - col.depth;
                    if (depthDiff > 0) prop.colSpan = depthDiff + 1;
                }

                if(self.props.enableTableClick) {
                    colComponents.push(React.createElement('td', prop, <ClickableNode onClick={self.props.onClick} tableConfig={self.props.tableConfig} config = {col} />));
                }
                else {
                    colComponents.push(React.createElement('td', prop, <ReadonlyNode tableConfig={self.props.tableConfig} config = {col} />));
                }
            }
            return React.createElement('tr', {key: 'row_' + rowIndex++}, colComponents);
        });
    },
    getAttributeTable: function() {
        var ret = [];
        if(this.state.focusState == 0)
            return ret;

        var attrTableInfo = { maxDepth: 0 };
        var attrMatrix = TableTools.dataToTableMatrix(this.props.config.attr, null, this.props.config.path, 1, attrTableInfo);
        ret.push(<table key='attrContent' className='metric-table' style={{zIndex:1, position:'absolute', background: 'gray'}}><tbody>{this.createAttrTableComponents(attrMatrix, attrTableInfo)}</tbody></table>);
        return ret;
    },
    render: function() {
        var className = 'metric-attribute';

        if(this.props.config.select != null && this.props.config.select == 'attribute')
            className += ' selected';

        var statusStyle = { background: 'gray' };
        var attr = this.props.config.attr;

        if(attr != null) {
            var status = this.props.dplBuilder.statusRule.getStatus(attr.status);
            if(status != null) {
                statusStyle.background = status.color;
            }
        }

        return (
            <span onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} className={className} style={statusStyle}>{this.getAttributeTable()}</span>
        )
    }
});
