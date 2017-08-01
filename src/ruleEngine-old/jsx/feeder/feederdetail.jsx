var ConfigBuilder = require('./configbuilder/configbuilder');
var ZoomApearPanel = require('../processor/view/common/panel/zoomapearpanel');
var ActionRequester = require('../data/dispatcher/actionrequester');
var FeederInnerTable = require('./feederinnertable');

require('../../css/metrictable.css');
require('../../css/jobdetail.css');
require('../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.configBuilder = new ConfigBuilder(this.onUpdate, this.props.modeConfig.detailData);
        return {
        };
    },
    onUpdate: function() {
        this.setState({});
    },
    onSave: function() {
        this.refs.zoomapearPanel.close();
        ActionRequester.closeJobDetail(this.configBuilder.getDetailData(), Date.now());
    },
    onCancle: function() {
        this.refs.zoomapearPanel.close();
        ActionRequester.closeJobDetail({}, Date.now());
    },
    render: function() {
        var errorMessage = this.configBuilder.getError();

        return (
            <ZoomApearPanel ref='zoomapearPanel' modeConfig={this.props.modeConfig} width={this.props.width} height={this.props.height} >
                <div className='detail-header metric-word'>
                    {this.props.modeConfig.detailData.Name}
                </div>
                <div className='detail-container-top metric-word'>
                    <div className='metric-border' style={{display: 'inline-block', padding:'10px', margin:'5px', background:'white'}}>
                        <FeederInnerTable configBuilder={this.configBuilder} />
                    </div>
                </div>
                <div className='detail-container-bottom'/>
                <div className='detail-footer'>
                    <div className='detail-error'>{errorMessage}</div>
                    <button className='detail-button' onClick={this.onCancle}>Cancel</button>
                    <button className={errorMessage.length <= 0 ? 'detail-button' : 'detail-button disabled'} onClick={this.onSave} disabled={!(errorMessage.length <= 0)}>Save</button>
                </div>
            </ZoomApearPanel>
        );
    }
});