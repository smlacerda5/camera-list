export default class ReadonlyText extends React.Component {

  render() {
    const defaultStyle = {
      border: '2px solid #E5E5E5',
      background: '#F4F4F4',
      color: this.props.scheme.error ? 'red' : 'black',
      wordWrap: 'breakWord',
      overflow: 'scroll',
      whiteSpace: 'pre'
    };
    const style = Object.assign({flex: 1}, this.props.style ? this.props.style : defaultStyle);

    return (
      <textarea
        type='text'
        style={style}
        disabled={true}
        value={this.props.scheme.error ? this.props.scheme.error : this.props.scheme.value}
      />

    )
  }
}
