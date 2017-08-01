var JobSearchResultContainer = require('./jobsearchresultcontainer');

require('../../../../css/global.css');
require('../../../../css/jobdetail.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.keyEventTimeout = null
        return {
            searchResult: []
        };
    },
    onKeyDown: function(e) {
        if(this.keyEventTimeout) {
            clearTimeout(this.keyEventTimeout);
            this.keyEventTimeout = null;
        }

        if(e.keyCode == 13)
            this.search();
        else
            this.keyEventTimeout = setTimeout(this.search, 1000);
    },
    onBlur: function() {
        if(this.keyEventTimeout) {
            clearTimeout(this.keyEventTimeout);
            this.keyEventTimeout = null;
        }

        this.search();
    },
    search: function() {
        var self = this;
        n.call('job.search', {query: { Name : '/' + this.refs.searchKeyword.value + '/i'}, Count : 20 }, function(err, res) {
            if(res != null && res.statusCode == 200) {
                self.setState({searchResult: res.body.Result.map(function(job) {
                    {
                        return {
                            name: job.Name,
                            type: job.ModuleType,
                            x: 0, y: 0,
                        };
                    }
                })});
            }
        });
    },
    render: function() {
        return (
            <div className='fit-parent' >
                <div style={{display: 'block', position:'absolute', width:"98%", height:'40px'}}>
                    <input ref='searchKeyword' className='detail-input-style fit-parent' onKeyDown={this.onKeyDown} onBlur={this.onBlur} />
                </div>
                <div style={{display: 'block', position:'absolute', width:"98%", top:'45px', bottom: '0'}}>
                    <JobSearchResultContainer data={this.state.searchResult}/>
                </div>
            </div>
        );
    }
});