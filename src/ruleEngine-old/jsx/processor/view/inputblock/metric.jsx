var KeyNode = require('./keynode');
var MetricNode = require('./metricnode');
var TableTools = require('../../util/tabletools');
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    createDataTableComponents: function(matrix, tableInfo) {
        var self = this;
        var rowIndex = 0;
        return matrix.map(function (row) {
            var colComponents = [];
            for (var i = row.length; i-- > 0;) {
                var col = row[i];
                var key = col.isLeaf ? col.path.join() + '.value' : col.path.join();
                var prop = {className: 'metric-table-td', key: key};

                if (col.noc > 1) prop.rowSpan = col.noc;
                if (col.isLeaf) {
                    var depthDiff = tableInfo.maxDepth - col.depth;
                    if (depthDiff > 0) prop.colSpan = depthDiff + 1;
                    colComponents.push(React.createElement('td', prop, <MetricNode tableConfig={self.props.config} config = {col} dplBuilder={self.props.dplBuilder}/>));
                }
                else {
                    colComponents.push(React.createElement('td', prop, <KeyNode tableConfig={self.props.config} config = {col} dplBuilder={self.props.dplBuilder}/>));
                }
            }
            return React.createElement('tr', {key: 'row_' + rowIndex++}, colComponents);
        });
    },
    render: function() {
        var dataTableInfo = { maxDepth: 0 }
        var dataMatrix = this.props.data.value ? TableTools.dataToTableMatrix(this.props.data.value, this.props.data.attribute, [], 1, dataTableInfo) : [];
        return (
            <table className='metric-table' style={{height:'100%'}}>
                <tbody>{this.createDataTableComponents(dataMatrix, dataTableInfo)}</tbody>
            </table>
        )

    }
});