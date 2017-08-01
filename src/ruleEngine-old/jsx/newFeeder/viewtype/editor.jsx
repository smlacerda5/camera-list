import CodeMirror from 'codemirror';
import LangType from './langtype'
// addon
require('codemirror/addon/display/autorefresh.js');
// mode
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/jsx/jsx.js');
require('codemirror/theme/solarized.css');
require('./editor.css');

const lang = [
  { key: LangType.json, value: 'application/json' },
  { key: LangType.javascript, value: 'text/javascript' },
  { key: LangType.html, value: 'text/html' },
  { key: LangType.css, value: 'text/css' },
  { key: LangType.xml, value: 'application/xml' },
  { key: LangType.puretext, value: '' }
];

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.scheme.value,
      mode: 'application/json',
      maxWidth: 0
    }
    this.modeExist = false;
  };

  componentDidMount() {
    const defaultOptions = {
      lineNumbers: true,
			readOnly: this.props.scheme.read_only,
			mode: 'application/json',
      lineWrapping: false,
      autoRefresh: true,
      indentUnit: 4,
      gutters: ["CodeMirror-lint-markers"],
      lint: true,
      theme: 'solarized'
    };
    if (this.props.scheme.mode) {
      for (var i = 0; i < lang.length; i++) {
        if(lang[i].key === this.props.scheme.mode) {
          defaultOptions.mode = lang[i].value;
          this.modeExist = true;
          break;
        }
      }
    }

    const findDOMNode = ReactDOM.findDOMNode;
    const textareaNode = findDOMNode(this.refs.textarea);
    this.codeMirror = CodeMirror.fromTextArea(textareaNode, defaultOptions);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.codeMirror.setSize('100%', '100%');
    this.codeMirror.setValue(this.state.value);
    if (this.props.scheme.error) {
      this.codeMirror.getWrapperElement().style.borderColor = 'red';
      this.codeMirror.getWrapperElement().style.borderWidth = '2px';
      this.codeMirror.getWrapperElement().style.borderStyle = 'solid';
      this.codeMirror.getWrapperElement().title = this.props.scheme.error;
    }
    this.props.scheme.read_only && $(this.codeMirror.getWrapperElement()).addClass('CodeMirror-readonly');
    setTimeout(()=>{
      this.codeMirror.refresh()
    }, 1000);
    this._addEventListener = this._addEventListener.bind(this);
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
    this._addEventListener();
    this.setState({maxWidth: this.refs.container.offsetWidth});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({maxWidth: this.refs.container.offsetWidth});
  }

  componentWillUpdate(nextProps) {
    if(this.props.scheme.value !== nextProps.scheme.value) {
      this.setState({value: nextProps.scheme.value});
      this.codeMirror.setValue(nextProps.scheme.value);
    }
  }

  handleModeChange(event) {
    this.setState({mode: event.target.value});
    this.codeMirror.setOption('mode', event.target.value);
    this.codeMirror.refresh();
  }

  _addEventListener() {
    let self = this;

    self.codeMirror.doc.on('change', function (cm, changeObj) {
      let value = cm.getValue();
      if (self.state.value === value || self.props.scheme.read_only) return; // for event unlimit loop...
      self.setState({value: value});
    });

    self.codeMirror.on('blur', function (cm) {
      let value = cm.getValue();
      self.props.changeValue(self.props.name, value);
    });
  }

  render() {
    let self = this;
    return (
      <div
        ref='container'
        style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', maxWidth: this.state.maxWidth}}>
          {
            !this.modeExist && this.props.scheme.value.length > 0 &&
            <select value={self.state.mode} onChange={self.handleModeChange.bind(self)} style={{flexBasis: 40}}>
              {
                lang.map((option)=>{
                  return (
                    <option value={option.value} key={option.key}>{option.key}</option>
                  );
                })
              }
            </select>
          }
          <textarea ref="textarea" autoComplete="off" style={{flex:1}}/>
        </div>
      </div>
    )
  }
}
