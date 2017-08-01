export default class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUpdate(nextProps) {
    if(this.props.value !== nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.changeValue(this.props.name, event.target.value);
  }

  render() {
    const style = Object.assign({flex: 1}, this.props.style ? this.props.style : {});
    return (
      <select value={this.state.value} onChange={this.handleChange} style={style}>
        <option disabled defaultValue value style={{display: 'none'}}/>
        {
          this.props.options.map((option)=>{
            return (
              <option value={option} key={option}>{option}</option>
            );
          })
        }
      </select>
    )
  }
}
