var RelationInfo = require('./relationinfo');
var JoinInfo = require('./joininfo');
var Metric = require('./metric');
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onRemove: function() {
        this.props.dplBuilder.formatControl.from.remove(this.props.config.id);
    },
    render: function() {
        var innerComponents = [];

        // note : assign relation information
        innerComponents.push(<div key='relationTitle'>Relation Info</div>);
        innerComponents.push(<RelationInfo key='relationContent' config={this.props.config} dplBuilder={this.props.dplBuilder}/>);

        // note : assign join information
        if(this.props.config.join.length > 0) {
            innerComponents.push(<div key='joinTitle'>Join Info</div>);
            innerComponents.push(<JoinInfo key='joinContent' config={this.props.config} dplBuilder={this.props.dplBuilder}/>);
        }

        // note : assign object data
        // note : object �ٽ� �츱 ������ ������ �ּ� ���� �մϴ�.
        /*
        var objectTableInfo = { maxDepth: 0};
        var objectMatrix = [];
        if(this.props.data.objectinfo) {
            delete this.props.data.objectinfo['relations'];
            objectMatrix = TableTools.dataToTableMatrix(this.props.data.objectinfo, null, ['object'], 1, objectTableInfo);
        }
        if(objectMatrix.length > 0) {
            innerComponents.push(<div key='objectTitle'>object</div>);
            innerComponents.push(<table key='objectContent' className='metric-table' style={{height:'100%'}}><tbody>{this.createDataTableComponents(objectMatrix, objectTableInfo)}</tbody></table>);
        }
        */

        // note : assign metric data
        if(this.props.data.value) {
            for(var k in this.props.data.value) {
                innerComponents.push(<div key='metricTitle'>Metric</div>);
                innerComponents.push(<Metric key='metricContent' config={this.props.config} data={this.props.data} dplBuilder={this.props.dplBuilder}/>);
                break;
            }
        }

        return (
            <div style={{display: 'inline-block', margin:'6px', background:'#FFFFFF'}}>
                <div className='metric-header'>
                    <p>{this.props.config.name}</p>
                    <p key='button' className='metric-header-remove-btn' onClick={this.onRemove}>x</p>
                </div>
                <div style={{padding:'15px'}}>
                    {innerComponents}
                </div>
            </div>
        )
    }
});
