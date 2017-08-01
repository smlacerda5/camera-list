var Modal = require('../modal');
var DeleteView = require('../deleteview')

module.exports = React.createClass({
    getInitialState: function() {
        return {
 
       };
    },

    show: function() {
        this.refs.deleteViewModal.show();
    },

    hide: function() {
        this.refs.deleteViewModal.hide();
    },

    render: function() {
        return (
            <span>
                <span
                    style={{float: 'right', marginRight: 10, cursor: 'pointer'}}
                    onClick={(e)=>{
                        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
                        else e.cancelBubble = true; //IE
                        this.show();
                    }}>X
                </span>
                <Modal ref="deleteViewModal">
                    <DeleteView hide={this.hide}
                                type={this.props.type}/>
                </Modal>
            </span>
        );
    }
});
