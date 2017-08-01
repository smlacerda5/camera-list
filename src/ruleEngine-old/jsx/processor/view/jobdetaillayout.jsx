require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        return (
            <div className='fit-parent' >
                <div style={{display: 'block', position:'absolute', width:'100%', top: '0', bottom: '0'}}>
                    <div className='detail-container' style={{width:'50%', height:'100%', float:'left'}}>
                        <div className='detail-inner-style fit-parent'>
                            {this.props.children[0]}
                        </div>

                    </div>
                    <div className='detail-container' style={{width:'50%', height:'100%', float:'left'}}>
                        <div className='detail-inner-style fit-parent'>
                            {this.props.children[1]}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
