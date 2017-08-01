var BlockListView = require('./blocklistview');
var FormulaFactory = require('../formulafactory');
var KeyActionHandler = require('../../../dplbuilder/formulacontrol/editevent/keyactionhandler');
require('../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.keyActionHandler = new KeyActionHandler(this.props.dplBuilder, document.getElementById('formulaLayout'));
        return {
        };
    },
    resizeContent: function(size) {

    },
    componentWillUnmount() {
        this.keyActionHandler.removeListener();
    },
    render: function() {
        return (
            <div className='formula-layout-root' id='formulaLayout'>
                <span className='formula-layout-left'>
                    <BlockListView dplBuilder={this.props.dplBuilder} />
                </span>
                <span className='formula-layout-middle'>
                    <div className='formula-scroll-panel'>
                        {FormulaFactory.create(0, 0, this.props.dplBuilder.configController.config, null, this.props.dplBuilder, true, this.keyActionHandler)}
                    </div>
                </span>
                <span className='formula-layout-right'>
                    <div className='formula-scroll-panel'>
                        {FormulaFactory.create(1, 0, this.props.dplBuilder.configController.trashControl.config, null, this.props.dplBuilder, true)}
                    </div>
                </span>
            </div>
        )
        //<KeyController dplBuilder={this.props.dplBuilder}/>
    }
});
