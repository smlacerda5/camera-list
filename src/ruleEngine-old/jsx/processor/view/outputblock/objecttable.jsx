var PropKeyNode = require('./propkeynode');
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
        this.props.dplBuilder.selectFormula('value', this.props.dplBuilder.formatControl.select.addProp());
    },
    propertiesTableComponents: function(matrix, tableInfo) {
        var self = this;
        var rowIndex = 0;
        if(matrix) {
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
                        colComponents.push(React.createElement('td', prop, <FormulaNode config={col} dplBuilder={self.props.dplBuilder} hasAttr={false} />));
                    }
                    else {
                        colComponents.push(React.createElement('td', prop, <PropKeyNode config={col} dplBuilder={self.props.dplBuilder}/>));
                    }
                }
                return React.createElement('tr', {key: 'row_' + rowIndex++}, colComponents);
            });
        }
    },
    render: function() {
        var propertiesTableInfo = { maxDepth: 0 };
        var select = JsonTools.arrayToJson(this.props.dplBuilder.formulaControl.path, this.props.dplBuilder.formulaControl.type);
        var error = this.props.dplBuilder.dpl.error.select;
        var data = this.props.dplBuilder.dpl.data.output.objectinfo;

        var nameSelect = null, nameError = null, nameData = null;
        var propertiesSelect = null, propertiesError = null, propertiesData = null;
        var healthSelect = null, healthError = null, healthData = null;

        if(select && select.object) {
            nameSelect = select.object.name;
            propertiesSelect = select.object.properties;
            healthSelect = select.object.health;
        }

        if(error && error.object) {
            nameError = error.object.name;
            propertiesError = error.object.properties;
            healthError = error.object.health;
        }

        if(data) {
            nameData = data.name;
            propertiesData = data.properties;
            healthData = data.health;
        }

        var properties = TableTools.configToTableMatrix(this.props.config.properties, propertiesSelect, propertiesError, propertiesData, null, ['object','properties'], 1, propertiesTableInfo );
        var propertiesComponents = this.propertiesTableComponents(properties, propertiesTableInfo);

        return (
            <table className='metric-table' style={{height:'100%'}}><tbody>
                <tr>
                    <td className= 'metric-table-td'><div className='metric key'><p>name</p></div></td>
                    <td className= 'metric-table-td'><FormulaNode config={{isLeaf: true, select: nameSelect, error: nameError, value: nameData, path: ['object', 'name']}} dplBuilder={this.props.dplBuilder} /></td>
                </tr>
                <tr>
                    <td className= 'metric-table-td'><div className='metric key'><p>properties</p></div></td>
                    <td className= 'metric-table-td'>
                        <div className='metric-composit'>
                            <table key='metricTable'><tbody>
                                {propertiesComponents}
                            </tbody></table>
                            <FormulaAddBtn key='formulaBtn' onNew={this.onNew} topMargin={propertiesComponents.length > 0  ? '-2px' : '0px'}/>
                        </div>
                    </td>
                </tr>
            </tbody></table>
        )
    }
});
