var ActionRequester = require('../../data/dispatcher/actionrequester');
require('../../../css/actionbtn.css');
require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function (e) {
        ActionRequester.updateAlign(this.props.mode);
    },
    render: function () {
        return (
            <button className='alignbtn no-carrot' onClick={this.onClick} >{this.props.mode}</button>
        );
    }
});
