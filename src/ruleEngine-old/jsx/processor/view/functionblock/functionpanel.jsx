var OpBtn = require('./opbtn');
var FuncBtn = require('./funcbtn');
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var self = this;
        // todo : operator 받아올 부분들은 받아올것..
        var operator = [ '+', '-', '*', '/', '%', '&', '|', '^', '()' ];
        var func = [ 'SUM', 'AVG', 'MIN', 'MAX', 'KSUM' ];

        return (
            <div className='fit-parent' >
                <div className='detail-container' style={{width:'60%', height:'100%', float:'left'}}>
                    { operator.map(function(item) { return <OpBtn key={item} op={item} dplBuilder={self.props.dplBuilder} /> } ) }
                </div>
                <div className='detail-container' style={{width:'40%', height:'100%', float:'left', overflowY:'scroll'}}>
                    { func.map(function(item) { return <FuncBtn key={item} op={item} dplBuilder={self.props.dplBuilder} /> } ) }
                </div>
            </div>
        )
    }
});