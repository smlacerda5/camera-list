var eventDrops = require('./eventDrops');
var D3 = require('d3/build/d3');

module.exports = React.createClass({
    getInitialState: function() {
        this.dataElementName = this.props.id + '_data';
        this.eventDropHandler = eventDrops.default();
        this.eventDropHandler.Initialize
            .start(new Date(this.props.initialRange[0]))
            .end(new Date(this.props.initialRange[1]))
            .date(d => d.time)
            .rangeUpdated((domain) => { if(this.props.rangeUpdated) this.props.rangeUpdated(domain); })
            .zoomend((timestamp) => { if(this.props.focusUpdated) this.props.focusUpdated(timestamp); } );
        return { };
    },
    componentDidMount: function() {
        this.eventDropHandler.Initialize(D3.select('#' + this.dataElementName).datum(this.props.data));
    },
    componentWillUnmount: function() {
    },
    updateData: function(data) {
        this.eventDropHandler.Update(D3.select('#' + this.dataElementName).datum(this.props.data));
    },
    render: function() {
        return (
            <div id={this.dataElementName} style={{position:'absolute', width:'100%', height:'100%'}}/>
        )
    }
});
