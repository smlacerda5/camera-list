var JobSearchNode = require('./jobsearchnode');

require('../../../../css/global.css');
require('../../../../css/jobdetail.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.config = {
            lastTop : 0,
            startX: 500,
            startY: 500,
            margin: 5
        };
        return {
        };
    },
    render: function(){
        var data = this.props.data;
        this.config.lastTop = 0;

        var self = this;
        var resultComponents =  _.map(data, function(jobData) {
            return <JobSearchNode key={jobData.name} type={jobData.type.toLowerCase()} info={jobData} config={self.config} />
        });

        return (
            <div className='fit-parent' >
                <div className='detail-outer-style fit-parent detail-clip' >
                    { resultComponents }
                </div>
            </div>
        );
    }
});
