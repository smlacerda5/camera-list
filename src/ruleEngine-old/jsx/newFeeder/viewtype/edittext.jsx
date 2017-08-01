export default class EditText extends React.Component {
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
    const defaultStyle = { background: 'white' };
    const style = Object.assign({border: '2px solid', flex: 1, borderColor: this.props.scheme.error ? '#ff6666' : '#E5E5E5'}, this.props.style ? this.props.style : defaultStyle);
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <input type='text'
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
