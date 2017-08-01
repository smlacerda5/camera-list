import update from 'react-addons-update';

export default class PairArray extends React.Component {
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
    const nextState = Object.assign([], this.state.value);
    nextState.push({'key': '', 'value': ''});
    this.setState({value: nextState});
    this.props.changeValue(this.props.name, nextState);
  }

  deleteLine(i) {
    const nextState = Object.assign([], this.state.value);
    nextState.splice(i,1);
    this.setState({value: nextState});
    this.props.changeValue(this.props.name, nextState);
  }

   handleChange(event, i, field) {
    this.setState({
      value: update(
        this.state.value,
        {
          [i]: {
            [`${field}`]: { $set: event.target.value }
          }
        }
      )
    });
  }

  render() {
    const self = this;
    const defaultStyle = { border: '2px solid #E5E5E5', background: '#F4F4F4', borderColor: this.props.error ? '#ff6666' : '#E5E5E5'}
    const style = Object.assign({height: '90%', overflow: 'auto'}, this.props.style ? this.props.style : defaultStyle);
    return (
      <div style={{flex: 1, flexDirection: 'column'}}
           title={this.props.error ? this.props.error : 'normal'}>
        <div style={style}>
          {
            this.state.value.map((value, i)=>{
              return (
                <div style={{display: 'flex', flexBasis: 50}}
                     key={i}>
                  <div style={{display: 'flex', flex: 1}}>
                    <input type="text"
                           value={self.state.value[i].key}
                           style={{flex: 1, border: '2px solid #E5E5E5', background: 'white'}}
                           onChange={(event)=>self.handleChange(event, i, 'key')}
                           onBlur={()=>self.props.changeValue(self.props.name, self.state.value)}/>
                         <span style={{textAlign: 'center', background: '#F4F4F4'}}>:</span>
                    <input type="text"
                           value={self.state.value[i].value}
                           style={{flex: 1, border: '2px solid #E5E5E5', background: 'white'}}
                           onChange={(event)=>self.handleChange(event, i, 'value')}
                           onBlur={()=>self.props.changeValue(self.props.name, self.state.value)}/>
                  </div>
                  <button  type="submit"
                           style={{border: 0, background: '#F4F4F4'}}
                           onClick={()=>self.deleteLine(i)}>
                           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAABt0lEQVRo3u2ZwXHCMBBFnzK5Qwe4A9xBKCElQAXx1adMTjpCKgipIOkgpgOXYDowFSgXMXEEBluWhZ1oL2iwWPZZ0t/1WiilGLPdMXILAAEgAASA29q9K0dCEgObhtMTlZIPCgDIgEmLudOhbaFJT3O9rcDRdiplUbPNMuDB5Z+JprWQkCRXlv1Zf+6Bbc2cJTDT45cLvkqVNjtPjQCEZAM8eRaYV5WSuDoDOf4td72FHoHYV/Aq5dMpwJ/KxEKSCEkuJNGZa0ud1E4SnV5F8/tI+0q8AOjg1sDcVBsd4BuQCfmjWBo0Az7OQGy1r/U58D5W4JKUxpVEVQ0mqiSv2NK3M4DSCKyrRTW++wEwirCZA4BZje/wPHDTBDVkgHIIAHtDVo9WWEjyiU8fAEWN9BUt/XT5rdctFI/9EE/HCOClcrUFqErhosNdX3SVV1uAsoebWQ75DIwmE5ctx4MAmBrF2Ap4r3YV9HgHrIyCrbM62faFskobJTaq1e25tkpNryg2fHoD+LUCQtYqUe/5wQXAHPga2yEugIPDOA62tZB1W6VlO/2aWbfbRXhPHAACQAAIAP8a4BsmK3aRxWw3uAAAAABJRU5ErkJggg=="
                                style={{height: 20,width: 20, verticalAlign: 'middle'}}/>
                  </button>
                </div>
              );
            })
          }
        </div>
        <div style={{height: '10%'}}>
          <button style={{border: 0, background: 'transparent', verticalAlign: 'middle'}}
                  onClick={this.addLine}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAABxklEQVRo3u2Zu5GDMBBAHzeX35VAB9CBcQUu5UiVkZHiUlzBiQ6gA0o4V6ALvJHHNgLJQtjsDBmj3Set9qfEGMOa5YOVywawtHz6WCSpSYFCvhzI7vzaAx2gAW0Ug7Nul0uc1BRACRxmLnECGqPQQQHE8ArYefKEFqjmgEwGSGoa4OdJLn00ivIpAEnNt/hu9uR72QOFUfx5i0JJTQ4MAYxHdAyi0/0EZOcH4CtwhDwD6dhJ2JyAXsB4RKd2ciG5sBnLSSY2THchCZW/kSTc/b0Q+ygTVy4ajSK52hCXsreSLG/nQrL7O+KRndhkfQdK4pPSCkAKs0OEAAexbfQEioir5+ItAPKIAXIbgCxigMxbR3Yd513/n5snPm5EoPU29T561G0qEWoqMeaznmuhSSfQR7zhvQ1AFzFAZwOgIwbQrw8gofQUofGnW2H+XhhtIgRorPOA9J9tRMa3c3vi2U2957hfTc7EQnyMYPePj4a+NpO5bsESuzfqcX9iUwsVXMZ8oeVs0x2OAshsMjTEGcsJtVU1ahQdkAaqk3ouQ12rkmb1DxyT+wFRsPecJ1ou88/JA7X3fOS7AZKyxmfWrSfeAF4A4B/i56vn070uTQAAAABJRU5ErkJggg=="
                       style={{height: 20,width: 20}}/>
          </button>
        </div>
      </div>
    );
  }
}
