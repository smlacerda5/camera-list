import GeneratorAccordion from './graph/panel/jobgeneratoraccordion';
import FeederDetail from './newFeeder/feederdetail';
import ProcessorDetail from './processor/processordetail';
import JobGraph from './graph/jobgraph';
import Clipboard from './processor/clipboard/clipboard';
import CreateBtn from './accordion/button/createbtn';

require('../css/jobdetail.css');
require('../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.clipboard = new Clipboard();
        return {
        };
    },
    onLeftPanelMouseOver: function(e) {
        this.refs.leftPanel.show();
    },
    onLeftPanelMouseLeave: function(e) {
        this.refs.leftPanel.hide();
    },
    contentFactory: function() {
        if(this.props.config.mode == 1) {
            this.refs.leftPanel.hide();
            // note : ���� type ����ȭ �Ǹ� �߰� ����
            var moduleName = this.props.config.modeConfig.detailData.ModuleName;
            var moduleType = this.props.config.modeConfig.detailData.ModuleType;

            switch (moduleName) {
                case 'DPLProcessor':
                    return <ProcessorDetail key='detailLayout' modeConfig={this.props.config.modeConfig} width={this.refs.rootDiv.offsetWidth} height={this.refs.rootDiv.offsetHeight} clipboard={this.clipboard}/>
                default:
                    return <FeederDetail key='detailLayout' modeConfig={this.props.config.modeConfig} width={this.refs.rootDiv.offsetWidth} height={this.refs.rootDiv.offsetHeight} />
            }
        }
        else {
            return <JobGraph key='graphLayout' drawConfig={this.props.config.drawConfig} modeConfig={this.props.config.modeConfig} />
        }
    },
    render: function() {
        return (
            <div ref='rootDiv' className="layout-fit" style={{position:'relative'}} id={'outer'}>
                <n.Sidebar ref="leftPanel" context={"#outer"} animation="overlay" position='left' closable={true} style={{background: '#273142'}}>
                    <div className="fit-parent" style={{background:'#273142'}} onMouseLeave={this.onLeftPanelMouseLeave} >
                        <GeneratorAccordion typeDataContainer={this.props.config.typeDataContainer} />
                        <CreateBtn/>
                    </div>
                </n.Sidebar>
                <div className="pusher layout-fit" style={{background:'#white'}}>
                    {this.contentFactory()}
                </div>
                {this.props.config.mode != 1 ? <div style={{position:'absolute', width:'20px', height:'100%', left:'0', top:0, zIndex:'2', background:'rgba(240, 240, 240, 0.5)'}} onMouseOver={this.onLeftPanelMouseOver} /> : null}
            </div>
        );
    }
});
