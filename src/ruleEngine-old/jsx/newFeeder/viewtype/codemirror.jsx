export default class CodeMirror extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.scheme.value,
      mode: 'application/json'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  componentWillUpdate(nextProps) {
    if(this.props.scheme.value !== nextProps.scheme.value) {
      this.setState({value: nextProps.scheme.value});
    }
  }

  componentDidMount() {
    setTimeout(this.refs.Editor.resize, 1000);
  }

  handleChange(target, comp) {
    this.setState({value: comp});
  }

  handleModeChange(event) {
    this.setState({mode: event.target.value});
    this.refs.Editor._getEditor().setOption('mode', event.target.value);
    this.refs.Editor._getEditor().refresh();
  }

  render() {
    const self = this;
    const lang = [{ key: 'json', value: 'application/json' },
                  { key: 'javascript', value: 'text/javascript' },
                  { key: 'html', value: 'text/html' },
                  { key: 'css', value: 'text/css' }];
    return (
      <div
        style={{flex: 1, left: 16, overflow: 'auto', maxWidth: '100%', minHeight: 0}}>
        <n.Editor ref='Editor'
                  width="100%"
                  height="90%"
                  mode={this.state.mode}
                  readOnly={this.props.scheme.read_only}
                  lineWrapping={false}
                  autoRefresh={true}
                  autoFormat={true}
                  value={this.state.value}
                  onChange={this.props.scheme.read_only ? ()=>{} : self.handleChange}
                  onBlur={()=>{
                    this.props.changeValue(this.props.name, this.state.value);
        }}/>
      <select value={this.state.mode} onChange={this.handleModeChange} style={{height: '10%'}}>
          {
            lang.map((option)=>{
              return (
                <option value={option.value} key={option.key}>{option.key}</option>
              );
            })
          }
        </select>
    </div>
    );
  }
}
