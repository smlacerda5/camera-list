var ActionRequester = require('../../data/dispatcher/actionrequester');
require('../../../css/actionbtn.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function (e) {
        var self = this;
        n.msg.confirm('Delete Job', 'are you sure remove ' + this.props.info.name + '?', function(_approve) {
            if(_approve) ActionRequester.delJob(self.props.info);
        });
    },
    render: function () {
        return (
            <button className='removebtn no-carrot fit-parent' onClick={this.onClick} >{this.props.name}</button>
        );
    }
});
