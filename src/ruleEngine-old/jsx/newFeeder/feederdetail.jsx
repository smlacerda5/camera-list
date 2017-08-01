import ZoomApearPanel from '../processor/view/common/panel/zoomapearpanel';
import ActionRequester from '../data/dispatcher/actionrequester';
import FeederInnerView from './feederinnerview';

require('../../css/metrictable.css');
require('../../css/jobdetail.css');
require('../../css/global.css');

export default class FeederDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: null,
      feederHeight: 0,
      disableSaveButton: false
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancle = this.onCancle.bind(this);
    this.validate = this.validate.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.validate(this.props.modeConfig.detailData);
  }

  componentDidMount() {
    const feederHeight = this.props.height - this.refs.feederName.offsetHeight - this.refs.footer.offsetHeight;
    this.setState({feederHeight: feederHeight});
  }

  changeValue(schemeName, value) {
    if(this.state.detailData.ModuleConfig.scheme[schemeName].value === value) return;
    let newState = Object.assign({}, this.state.detailData);
    newState.ModuleConfig.scheme[schemeName].value = value;
    this.validate(newState);
  }

  validate(detailData) {
    const self = this;
    n.call('job.validate', { 'Job': detailData }, function(err, res) {
      if(res != null && res.statusCode == 200 && res.body.Code != 400) {
        self.checkGlobalError(res.body);
        self.setState({detailData: res.body});
      }
    });
  }

  checkGlobalError(body) {
    const config = body.ModuleConfig;
    const scheme = config.scheme;
    const keys = Object.keys(scheme);
    var globalError = false;
    keys.map(key => {
      const elementError = scheme[key].error ? true : false;
      globalError = globalError ? globalError : elementError;
    });
    this.setState({disableSaveButton: globalError});
  }

  onUpdate() {
    this.setState({});
  }

  onSave() {
    let objInfo = this.state.detailData;
    const separator = ':_^_:';
    const currentObjName = objInfo.Name;
    const newObjName = `${currentObjName}_OT`;
    const cameraInfo = `Camera_${currentObjName}`;
    const toInfo = `${newObjName}${separator}${currentObjName}${separator}${newObjName}${separator}${currentObjName}`;
    const toInfoCamera = `${cameraInfo}${separator}${currentObjName}${separator}${cameraInfo}${separator}${currentObjName}`;
    const newToInfo = _.union(new Array(toInfo, toInfoCamera), objInfo.RelationSource.To);
    objInfo.RelationSource.To = newToInfo;
    this.refs.zoomapearPanel.close();
    ActionRequester.closeJobDetail(objInfo, Date.now());
  }

  onCancle() {
    this.refs.zoomapearPanel.close();
    ActionRequester.closeJobDetail({}, Date.now());
  }

  render() {
    return (
      <ZoomApearPanel ref='zoomapearPanel' modeConfig={this.props.modeConfig} width={this.props.width} height={this.props.height}>
        <div className='detail-header metric-word' ref='feederName'>
          {this.props.modeConfig.detailData.Name}
        </div>
        <div className='detail-container-top metric-word'>
          <div className='metric-border' style={{padding: '10px', margin: '5px', height: this.state.feederHeight - 10}}>
            <FeederInnerView config={this.props.modeConfig}
                             detaildata={this.state.detailData}
                             changeValue={this.changeValue}/>
          </div>
        </div>
        <div className='detail-container-bottom'/>
        <div className='detail-footer' ref='footer'>
          <button className='detail-button' onClick={this.onCancle}>Cancel</button>
          <button className='detail-button' onClick={this.onSave} disabled={this.state.disableSaveButton}>Save</button>
        </div>
      </ZoomApearPanel>
    );
  }
}
