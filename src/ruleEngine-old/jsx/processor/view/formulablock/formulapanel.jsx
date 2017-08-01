var ValueView = require('./controlview/valueview');
var AttributeView = require('./controlview/attributeview');
var TimelineView = require('./controlview/timelineview');
require('../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var formulaType = this.props.dplBuilder.formulaControl.type;

        var path = ''
        if(formulaType.length > 0)
            path = '[' + formulaType + '] ' + this.props.dplBuilder.formulaControl.path.join('.');

        var opViewComponent = null;
        switch(formulaType) {
            case 'value':
            case 'condition':
                opViewComponent = <ValueView ref='formulaView' dplBuilder={this.props.dplBuilder}/>
                break;
            case 'attribute':
                opViewComponent = <AttributeView ref='formulaView' formulaControl={this.props.dplBuilder.formulaControl}/>
                break;
            case 'timeline':
                opViewComponent = <TimelineView ref='formulaView' dplBuilder={this.props.dplBuilder}/>
                break;
            default:
                opViewComponent = <div/>
                break;
        }

        return (
            <div className='fit-parent'>
                <div style={{position:'absolute', width:'100%', top:'0', height:'26px'}}>
                    <div className='detail-metric-title-style'>
                        <p>{path}</p>
                    </div>
                </div>
                <div style={{position:'absolute', width:'100%', top:'26px', bottom:'0'}}>
                    { opViewComponent }
                </div>
            </div>
        )
    }
});
