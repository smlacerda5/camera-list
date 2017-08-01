var ActionRequester = require('../../data/dispatcher/actionrequester');
require('../../../css/actionbtn.css');
require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function (e) {
        this.refs.fileLoader.click();
    },
    onChange: function(e) {
        var fileName = e.target.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function(e) {
            var parseResult = null;
            try { var parseResult = JSON.parse(e.target.result); }
            catch(e) { return n.notification.error(fileName + ' is not json file'); }

            n.call("job.upsert", parseResult, function(err, res){
                if (res != null && res.statusCode == 200) {
                    ActionRequester.updateData();
                    return n.notification.info('success import.');
                }
                else {
                    return n.notification.error('import fail. message : ' + res.detail);
                }
            });
        }
        fileReader.readAsText(fileName, 'UTF-8');
        this.refs.fileLoader.value = null;
    },
    render: function () {
        return (
            <button className='alignbtn no-carrot' onClick={this.onClick} >
                <input style={{display:'none'}} type='file' ref='fileLoader' onChange={this.onChange}/>
                Import
            </button>
        );
    }
});
