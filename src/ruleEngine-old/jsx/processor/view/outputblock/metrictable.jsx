var KeyNode = require('./keynode');
var FormulaNode = require('./formulanode');
var FormulaAddBtn = require('../common/element/formulaaddbtn');
var TableTools = require('../../util/tabletools');
var JsonTools = require('../../util/jsontools');
var ActionRequester = require('../../../data/dispatcher/actionrequester');
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return { };
    },
    onNew: function() {
        this.props.dplBuilder.selectFormula('value', this.props.dplBuilder.formatControl.select.add());
    },
    createTableComponents: function(matrix, tableInfo) {
        var self = this;
        var rowIndex = 0;
        if(matrix) {
            return matrix.map(function (row) {
                var colComponents = [];
                for (var i = row.length; i-- > 0;) {
                    var col = row[i];
                    var key = col.isLeaf ? col.path.join() + ',value' : col.path.join();
                    var prop = {className: 'metric-table-td', key: key};

                    if (col.isLeaf) {
                        var depthDiff = tableInfo.maxDepth - col.depth;
                        if (depthDiff > 0) prop.colSpan = depthDiff + 1;
                    }

                    if (col.noc > 1) prop.rowSpan = col.noc;

                    if(col.isLeaf)
                        colComponents.push(React.createElement('td', prop, <FormulaNode config={col} dplBuilder={self.props.dplBuilder} hasAttr={true} />));
                    else
                        colComponents.push(React.createElement('td', prop, <KeyNode config={col} dplBuilder={self.props.dplBuilder}/>));
                }
                return React.createElement('tr', {key: 'row_' + rowIndex++}, colComponents);
            });
        }
    },
    render: function() {
        var dataTableInfo = { maxDepth: 0 };
        var select = JsonTools.arrayToJson(this.props.dplBuilder.formulaControl.path, this.props.dplBuilder.formulaControl.type);
        var error = this.props.dplBuilder.dpl.error.select;
        var value = this.props.dplBuilder.dpl.data.output.value;
        var attr = this.props.dplBuilder.dpl.data.output.attribute;

        var dataMatrix = TableTools.configToTableMatrix(this.props.config, select, error, value, attr, [], 1, dataTableInfo );
        var dataComponents = this.createTableComponents(dataMatrix, dataTableInfo);

        var style = dataComponents.length <= 0 ? {width:'100px', height:'100%'} : {height:'100%'};
        dataComponents.push(<tr key='metricAddBtn'><td className= 'metric-table-td' colSpan={dataTableInfo.maxDepth} style={{height:'100%'}}><div style={style}><FormulaAddBtn key='formulaBtn' onNew={this.onNew} /></div></td></tr>);
        return <table className='metric-table' style={{height:'100%'}}><tbody>{dataComponents}</tbody></table>
    }
});
