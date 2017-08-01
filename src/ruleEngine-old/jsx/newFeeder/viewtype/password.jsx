export default class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.scheme.value,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUpdate(nextProps) {
    if(this.props.scheme.value !== nextProps.scheme.value) {
      this.setState({value: nextProps.scheme.value})
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const defaultStyle = { border: '2px solid', borderColor: this.props.scheme.error ? '#ff6666' : '#E5E5E5', background: 'white' };
    const style = Object.assign({flex: 1}, this.props.style ? this.props.style : defaultStyle);
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <input type='password'
               ref='editText'
               value={this.state.value}
               style={style}
               onChange={this.handleChange}
               onBlur={()=>{
                 this.props.changeValue(this.props.name, this.state.value);
               }}
               title={this.props.scheme.error ? this.props.scheme.error : 'normal'}/>
      </div>
    );
  }
}
