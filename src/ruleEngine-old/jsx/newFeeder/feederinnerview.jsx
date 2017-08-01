import Scheme from './viewtype/scheme';

export default class FeederInnerView extends React.Component {

  constructor(props) {
    super(props);
    this.traverseJson = this.traverseJson.bind(this);
    this.count = 500;
  }

  traverseJson(obj_array, style) {
    const self = this;
    this.count++;
    return (
      <div style = {style} key={this.count}>
        {
          obj_array.map((obj, i)=>{
            const schemeName = obj.name;
            if(schemeName === 'layout') {
              let newStyle = { display: 'flex', flexDirection: obj.direction, flex: obj.flex };
              if (obj.style) newStyle = Object.assign(newStyle, obj.style);
              return self.traverseJson(obj.contents, newStyle);
            }
            if(schemeName === 'padding') {
              return <div style={{flex: obj.flex}}
                          key={i}/>
            }
            const schemeObj = this.props.detaildata.ModuleConfig.scheme[schemeName];
            if (!schemeObj) {
              const defaultStyle = { color: 'black',
                                     whiteSpace: 'pre',
                                     textOverflow: 'ellipsis',
                                     overflow: 'hidden'
                                   };
              const style = Object.assign({ type: 'text', flex: obj.flex, resize: 'none', maxWidth: 300, overflow: 'hidden' }, obj.style ? obj.style : {});

              return (
                <span style={style} key={i}>{schemeName}</span>
              )
            }
            return (
              <Scheme schemeObj={schemeObj}
                      schemeName={schemeName}
                      key={i}
                      flex={obj.flex}
                      changeValue={this.props.changeValue}
                      style={obj.style ? obj.style : null}/>
            );
          })
        }
      </div>
    );
  }

  render() {
    if (!this.props.detaildata) return<div/>;
    if (!this.props.detaildata.ModuleConfig) return<div/>;
    const layout = this.props.detaildata.ModuleConfig.layout;
    let style = { display: 'flex', flexDirection: layout.direction, flex: layout.flex};
    if(layout.style) style = Object.assign(style, layout.style);
    return (
      <div style = {{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div>
          <div>
            <span>{this.props.config.detailData.ModuleName}</span>
          </div>
        </div>
        <div style = {{display: 'flex', flex: 1}}>
          { layout.contents && this.traverseJson(layout.contents, style)}
        </div>
      </div>
    );
  }
}
