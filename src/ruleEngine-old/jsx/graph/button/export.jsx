var ActionRequester = require('../../data/dispatcher/actionrequester');
require('../../../css/actionbtn.css');
require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function (e) {
        n.call("job.search", {}, function(err, res){
            var btn = document.createElement('a');
            btn.download = btn.textContent = "ObjectTypeRule.json";
            btn.href='data:application/json;base64,'+ window.btoa(unescape(encodeURIComponent(JSON.stringify(res.body.Result, null, 4))));
            btn.click();
            return btn;
        });
    },
    render: function () {
        return (
            <button className='alignbtn no-carrot' onClick={this.onClick} >Export</button>
        );
    }
});
