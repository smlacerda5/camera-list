var ObjectTable = require('./objecttable')
var MetricTable = require('./metrictable')
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.metricIndex = 1;
        return { };
    },
    render: function() {
        var objectConfig = {}, metricConfig = {};
        var config = this.props.dplBuilder.dpl.config.select;

        for(var key in config) {
            if(key == 'object') {
                objectConfig = config[key];     // note : ��Ÿ �ƴ�
            }
            else {
                metricConfig[key] = config[key];
            }
        }
        return (
          
            <div style={{display: 'inline-block', margin:'6px', background:'#FFFFFF'}}>
                <div className='metric-header'>
                    <p>{this.props.dplBuilder.getProcessorName()}</p>
                </div>
                <div style={{padding:'15px'}}>
                    <div key='objectTitle'>Object</div>
                    <ObjectTable config={objectConfig} dplBuilder={this.props.dplBuilder}/>
                    <div key='metricHeader'>Metric</div>
                    <MetricTable config={metricConfig} dplBuilder={this.props.dplBuilder}/>
                </div>
            </div>
        )
    }
});
