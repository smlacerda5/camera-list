var ReactDOM = require('react-dom');
import ActionRequester from '../data/dispatcher/actionrequester';

module.exports = React.createClass({
    getInitialState: function() {
        return {
 
       };
    },

    hide: function() {
        this.props.hide();
    },

    render: function() {
        var self = this;
        return (
            <div style={{position: 'fixed', width: '408px', height: '298px', top: '50%', left: '50%', marginTop: '-149px', marginLeft: '-204px', borderRadius: '4px'}}>
                <div style={{height: 45, background: '#1991eb'}}>
                    <span style={{fontSize: 24, marginLeft: '16px', fontFamily: 'Heebo-Medium', color: 'white', lineHeight: '45px'}}>Delete</span>
                    <span style={{position: 'absolute', right: '5px', lineHeight: '45px', fontSize: 24, color: 'white'}}
                          onClick={this.hide}>X</span>
                </div>
                <div style={{height: 185, background: '#222c3c', lineHeight: '185px', fontFamily: 'Heebo-Regular', textAlign: 'center', color: 'white', fontSize: 16}}>
                    Are you sure you want to delete this item?
                </div>
                <div style={{height: 68, background: '#273142', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <button style={{display: 'inline-block', width: '78px', height: '36px', marginRight: '6px', background: '#1991eb', color: 'white', borderRadius: '4px', border: 0}}
                                onClick={this.hide}>Cancel</button>
                        <button style={{display: 'inline-block', width: '78px', height: '36px', marginLeft: '6px', background: '#1991eb', color: 'white', borderRadius: '4px', border: 0}}
                                onClick={()=>{
                                    n.call("accordion.remove", self.props.type, function(err, res){
                                        if(res.success) {
                                            ActionRequester.updateAlign();
                                            ActionRequester.updateData();
                                            self.hide();
                                        }
                                    });                                    
                                }}>Delete</button>
                </div>
            </div>
        );
    }
});
