var Arrow = require('../element/arrow');
var Circle = require('../element/circle');
var Line = require('../element/line');
var Node = require('../element/node')

module.exports = React.createClass({
    getInitialState: function() {
        this.lastVersion = this.props.modeConfig.version;
        return {
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(this.lastVersion != nextProps.modeConfig.version) {
            this.lastVersion = nextProps.modeConfig.version;
            return true;
        }
        return false;
    },
    render: function(){
        var dataInfo = this.props.modeConfig.data;
        var extraInfo = this.props.modeConfig.extra;

        var etcComponents = [];
        var edgeComponents = [];
        var jobComponents = [];

        if('circle' in extraInfo) {
            var circleInfo = extraInfo['circle'];
            for(var index in circleInfo) {
                etcComponents.push(<Circle key={'circle' + index} cx={0} cy={0} cr={circleInfo[index]} />);
            }
        }

        for(var jobName in dataInfo){
            var jobInfo = dataInfo[jobName];
            jobComponents.push(<Node key={jobName} type={jobInfo.type.toLowerCase()} info={jobInfo}/>);

            for(var relKey in jobInfo.relationSource.to)
                if(relKey in dataInfo)
                    edgeComponents.push(<Line key={relKey + ':' + jobInfo.relationSource.to[relKey].origin} markerID='arrow' start={jobInfo} end={dataInfo[relKey]} />);
        }

        return (
            <div>
                {jobComponents}
                <svg xmlns="http://www.w3.org/2000/svg" version='1.2' style={ {overflow: 'visible'} }>
                    <defs>
                        <Arrow markerID='arrow' right={this.props.drawConfig.radius / 2} />
                    </defs>
                    {edgeComponents}
                    {etcComponents}
                </svg>
            </div>
        );
    }
});
