var TogglePanPannel = require('./view/common/panel/togglepanpanel.jsx');
var ZoomApearPanel = require('./view/common/panel/zoomapearpanel');
var FromDropPanel = require('./view/common/panel/fromdropcontroller');
var ZoomPanPanel = require('../graph/panel/zoompancontroller');
var FormulaPanel = require('./view/formulablock/formulapanel');
var JobSearchPanel = require('./view/searchblock/jobsearch');
var JobDetailLayout = require('./view/jobdetaillayout');
var ActionRequester = require('../data/dispatcher/actionrequester');
var SearchButton = require('./view/inputblock/searchbutton');
var ConditionButton = require('./view/outputblock/conditionbutton');
var TimelineButton = require('./view/outputblock/timelinebutton');
var JoinBlock = require('./view/inputblock/joinwraper');
var OutputBlock = require('./view/outputblock/outputblock');
var DPLBuilder = require('./dplbuilder/dplbuilder');
var SplitPane = require('react-split-pane');

require('../../css/jobdetail.css');
require('../../css/resizer.css');
require('../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.dplBuilder = new DPLBuilder(this.onUpdate, this.props.modeConfig.detailData, this.props.clipboard);
        return {
        };
    },
    onUpdate: function() {
        this.refs.TogglePanel.hide();
        this.setState({});
    },
    onSave: function() {
        this.refs.zoomapearPanel.close();
        ActionRequester.closeJobDetail(this.dplBuilder.getDetailData(), Date.now());
    },
    onCancle: function() {
        this.refs.zoomapearPanel.close();
        ActionRequester.closeJobDetail({}, Date.now());
    },
    toggleBtnClickecked: function() {
        this.refs.TogglePanel.toggle();
        this.refs.SearchPanel.search();
    },
    render: function() {
        var self = this;
        var data = this.props.modeConfig.detailData;
        return (
            <ZoomApearPanel ref='zoomapearPanel' modeConfig={this.props.modeConfig} width={this.props.width} height={this.props.height} >
                <div className='detail-header metric-word no-carrot'>
                    {data.Name}
                </div>
                <div className='detail-body metric-word' style={{position:'relative'}}>
                    <TogglePanPannel ref='TogglePanel' initMode={true}  leftWidth={250}>
                        <JobSearchPanel ref='SearchPanel'/>
                        <SplitPane split='horizontal' defaultSize='30%' primary='second'>
                            <SplitPane split='vertical' defaultSize='50%'>
                                <div className='fit-parent no-carrot' style={{position:'relative'}}>
                                    <FromDropPanel dplBuilder={self.dplBuilder}>
                                        <ZoomPanPanel initToCenter={false} background='#A6A6A6'>
                                            <JoinBlock dplBuilder={this.dplBuilder}/>
                                        </ZoomPanPanel>
                                    </FromDropPanel>
                                    <SearchButton onClick={this.toggleBtnClickecked}/>
                                </div>
                                <div className={'fit-parent no-carrot'} style={{position:'relative'}}>
                                    <ZoomPanPanel initToCenter={false} background='#A6A6A6'>
                                        <OutputBlock dplBuilder={this.dplBuilder}/>
                                    </ZoomPanPanel>
                                    <ConditionButton dplBuilder={this.dplBuilder}/>
                                    <TimelineButton dplBuilder={this.dplBuilder}/>
                                </div>
                            </SplitPane>
                            <FormulaPanel ref='formulaPanel' dplBuilder={this.dplBuilder} />
                        </SplitPane>
                    </TogglePanPannel>
                </div>
                <div className='detail-footer'>
                    <button className='detail-button' onClick={this.onCancle}>Cancel</button>
                    <button className='detail-button' onClick={this.onSave}>Save</button>
                </div>
            </ZoomApearPanel>
        );
    }
});
