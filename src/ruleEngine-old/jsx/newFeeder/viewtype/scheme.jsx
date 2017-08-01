import ReadonlyText from './readonlytext';
import EditText from './edittext';
import SelectBox from './selectbox';
import TextArray from './textarray';
import Toggle from './toggle';
import PairArray from './pairarray';
import CodeMirror from './editor';
import Password from './password';
import ViewType from './viewtype';

export default class Scheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divWidth: 0
    }
    this.renderViewType = this.renderViewType.bind(this);
  }

  componentDidMount() {
    this.setState({divWidth: this.refs.container.offsetWidth});
  }

  renderViewType() {
    switch (this.props.schemeObj.type) {
      case ViewType.readonly_text:
        return (
          <ReadonlyText scheme={this.props.schemeObj}
                        style={this.props.style}/>
        );
        break;
      case ViewType.edit_text:
        return (
          <EditText scheme={this.props.schemeObj}
                    changeValue={this.props.changeValue}
                    name={this.props.schemeName}
                    style={this.props.style}/>
        );
      case ViewType.password:
        return (
          <Password scheme={this.props.schemeObj}
                    changeValue={this.props.changeValue}
                    name={this.props.schemeName}
                    style={this.props.style}/>
        );
        break;
      case ViewType.select_box:
        return (
          <SelectBox value={this.props.schemeObj.value}
                     name={this.props.schemeName}
                     options={this.props.schemeObj.options}
                     changeValue={this.props.changeValue}
                     style={this.props.style}/>
        );
        break;
      case ViewType.array:
        return (
          <TextArray value={this.props.schemeObj.value}
                     changeValue={this.props.changeValue}
                     name={this.props.schemeName}
                     style={this.props.style}/>
        );
        break;
      case ViewType.button:
        return (
          <Toggle scheme={this.props.schemeObj}
                  changeValue={this.props.changeValue}
                  name={this.props.schemeName}
                  style={this.props.style}/>
        );
        break;
      case ViewType.pair_array:
        return (
          <PairArray value={this.props.schemeObj.value}
                     changeValue={this.props.changeValue}
                     name={this.props.schemeName}
                     error={this.props.schemeObj.error}
                     style={this.props.style}/>
        );
        break;
      case ViewType.code_mirror:
        return (
          <CodeMirror scheme={this.props.schemeObj}
                      changeValue={this.props.changeValue}
                      name={this.props.schemeName}
                      maxWidth={this.state.divWidth}/>
        );
        break;
      default:
        return;
        break;
    }
  }

  render() {
    return (
      <div ref="container" style = {{display: 'flex', flex: this.props.flex}}>
        {this.renderViewType()}
      </div>
    )
  }
}
