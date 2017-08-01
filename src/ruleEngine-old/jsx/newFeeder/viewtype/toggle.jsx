require('../../../css/jobdetail.css');

export default class Toggle extends React.Component {

  render() {
    let defaultStyle = {flex: 1, color: 'white', background: '#4285f4'};
    if (this.props.scheme.disable) defaultStyle = Object.assign(defaultStyle, {pointerEvents: 'none', background: '#a4a4a4', color: '#d3d3d3'});
    const style = Object.assign(defaultStyle, this.props.style ? this.props.style : {});
    return (
      <button className='detail-button'
              onClick={()=>this.props.changeValue(this.props.name, true)}
              style={style}
              disabled={this.props.scheme.disable}
              pointerEvents="none">{this.props.scheme.name}</button>
    );
  }
}
