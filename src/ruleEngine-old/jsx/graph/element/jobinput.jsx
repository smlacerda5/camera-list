var ActionRequester = require('../../data/dispatcher/actionrequester');
require('../../../css/jobnode.css');
require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function(){
        this.refs.generator.focus();
    },
    onKeyDown: function(e){
        if(e.keyCode == 13)
            this.saveJob();
    },
    onBlur: function(e){
        this.saveJob();
    },
    saveJob: function() {
        var inputText = this.refs.generator.value.trim();
        if(inputText.length != 0)
        {
            ActionRequester.newJob({
                name: inputText,
                type: this.props.config.type,
                moduleName: this.props.config.moduleName,
                relation: {},
                x: this.props.config.x, y: this.props.config.y, r: 0
            });
        }
        this.props.onComplete();
    },
    render: function() {
        return(
            <div key='node_input' className={'job ' + (this.props.config.type === 'processor' ? 'processor' : 'feeder')} style={{left: this.props.config.x, top: this.props.config.y, width: this.props.drawConfig.radius * 2, height: this.props.drawConfig.radius * 2}} >
                <div className='job-input-align'>
                    <input ref='generator' className='no-carrot' onKeyDown={this.onKeyDown} onBlur={this.onBlur} />
                </div>
            </div>
        )
    }
});