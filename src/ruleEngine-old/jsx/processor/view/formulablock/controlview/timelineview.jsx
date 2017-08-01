var EventDrop = require('../../../../event-drop/react-event-drop');
require('../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentWillReceiveProps: function(nextProps) {
        this.refs.eventDrop.updateData(this.props.dplBuilder.formulaControl.getData());
    },
    componentDidMount: function() {
        var range = this.props.dplBuilder.formulaControl.getInitialRange();
        this.props.dplBuilder.formulaControl.updateTimestamp((range[0] + range[1]) / 2);
    },
    render: function() {
        return (
            <span className='formula-layout-middle'>
                <div className='formula-scroll-panel' style={{background:'#EEEEEE'}}>
                    <EventDrop ref='eventDrop' id='event-drop'
                        data={this.props.dplBuilder.formulaControl.getData()}
                        initialRange={this.props.dplBuilder.formulaControl.getInitialRange()}
                        rangeUpdated={(domain) => { this.props.dplBuilder.formulaControl.updateRange(domain[0].getTime(), domain[1].getTime()); }}
                        focusUpdated={(timestamp) => { this.props.dplBuilder.formulaControl.updateTimestamp(timestamp); } }
                    />
                </div>
            </span>
        )
    }
});
