import update from 'react-addons-update';

export default class TextArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this.addLine = this.addLine.bind(this);
    this.deleteLine = this.deleteLine.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addLine() {
    this.setState({
      value: update(
        this.state.value,
        {
          $push: ['']
        })
    });
    this.props.changeValue(this.props.name, this.state.value);
  }

  deleteLine(i) {
    this.setState({
      value: update(
        this.state.value,
        {
          $splice: [[i,1]]
        })
    });
    this.props.changeValue(this.props.name, this.state.value);
  }

   handleChange(event, i) {
    this.setState({
      value: update(
        this.state.value,
        {
          [i]: {$set: event.target.value }
        }
      )
    });
  }

  render() {
    const self = this;
    const style = Object.assign({display: 'flex', flex: 1, flexDirection: 'column', overflow: 'auto'}, this.props.style ? this.props.style : {});
    return (
      <div style={style}>
        {
          this.state.value.map((value, i)=>{
            return (
              <div style={{display: 'flex', flexBasis: 50}}
                   key={i}>
                <textarea type="text"
                       value={self.state.value[i]}
                       style={{flex: 1, border: '2px solid #E5E5E5', background: 'white'}}
                       onChange={(event)=>this.handleChange(event, i)}
                       onBlur={()=>this.props.changeValue(this.props.name, this.state.value)}/>
                <button onClick={()=>this.deleteLine(i)}>delete</button>
              </div>
            );
          })
        }
        <div style={{display: 'flex', height: 50}}>
          <button style={{flex:1}}
                  onClick={this.addLine}>Add</button>
        </div>
      </div>
    );
  }
}
