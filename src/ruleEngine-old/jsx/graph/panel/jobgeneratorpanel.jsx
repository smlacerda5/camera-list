var JobGenerator = require('../element/jobgenerator');
require('../../../css/jobnode.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var jobType = this.props.type;
        var jobTypeData = this.props.data;

        var jobGenerator = [];
        for(var i = 0, len = jobTypeData.length; i < len; i++) {
            var targetJobType = jobTypeData[i];
            jobGenerator.push(<JobGenerator key={targetJobType.moduleName} type={jobType.toLowerCase()} moduleName={targetJobType.moduleName} /> );
        }

        return(
            <div>
                {jobGenerator}
            </div>
        );
    }
});




