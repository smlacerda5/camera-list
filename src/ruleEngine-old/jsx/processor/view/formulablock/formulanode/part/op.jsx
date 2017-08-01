require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            mode: 0
        };
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.setState({mode: 1});
    },
    onMouseLeave: function() {
        this.setState({mode: 0});
    },
    onOPClick: function(op, e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.control.setOP(op);
        this.setState({mode: 0});
    },
    getOPTable: function() {
        var innerComponent = [];
        if(this.state.mode == 1) {
            innerComponent.push(
                <div key='opPanel' className='op-panel'>
                    <div>
                        <span className='op' style={{left:'0px', top:'0px'}} onClick={this.onOPClick.bind(this, '+')}>+</span>
                        <span className='op' style={{left:'20px', top:'0px'}} onClick={this.onOPClick.bind(this, '-')}>-</span>
                        <span className='op' style={{left:'40px', top:'0px'}} onClick={this.onOPClick.bind(this, '*')}>*</span>
                    </div>
                    <div>
                        <span className='op' style={{left:'0px', top:'20px'}} onClick={this.onOPClick.bind(this, '/')}>/</span>
                        <span className='op' style={{left:'40px', top:'20px'}} onClick={this.onOPClick.bind(this, '%')}>%</span>
                    </div>
                    <div>
                        <span className='op' style={{left:'0px', top:'40px'}} onClick={this.onOPClick.bind(this, '&')}>&</span>
                        <span className='op' style={{left:'20px', top:'40px'}} onClick={this.onOPClick.bind(this, '|')}>|</span>
                        <span className='op' style={{left:'40px', top:'40px'}} onClick={this.onOPClick.bind(this, '^')}>^</span>
                    </div>
                </div>
            );
        }
        return innerComponent
    },
    render: function() {
        return (
            <span className='op' style={{left: '-10px', bottom: '5px'}} onClick={this.onClick} onMouseLeave={this.onMouseLeave}>
                {this.props.control.getOP()}
                {this.getOPTable()}
            </span>
        )
    }
});
