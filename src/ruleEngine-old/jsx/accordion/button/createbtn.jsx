var Modal = require('../modal');
var CreateView = require('../createview')

module.exports = React.createClass({
    getInitialState: function() {
        return {
 
       };
    },

    componentDidMount: function () {

    },

    componentDidUpdate: function() {

    },

    show: function() {
        this.refs.createViewModal.show();
    },

    hide: function() {
        this.refs.createViewModal.hide();
    },

    componentWillUnmount: function() {

    },

    render: function() {
        return (
            <div>
                <div style={{position: 'fixed', width: '50px', height: '50px', background: '#006400', border: '2px solid #26b110', borderRadius: '3px', bottom: '33px', right: '26px', cursor: 'pointer'}}
                    onClick={()=>{this.show()}}>
                    <div style={{position: 'absolute', width: '20px', height: '6px', left: '13px', top: '20px', background: 'white'}}/>
                    <div style={{position: 'absolute', width: '6px', height: '20px', left: '20px', top: '13px', background: 'white'}}/>
                </div>
                <Modal ref="createViewModal">
                    <CreateView hide={this.hide}/>
                </Modal>
            </div>
        );
    }
});
