require('../../../css/overlaypanel.css');

module.exports = React.createClass({
    render: function() {
    return (
        <div className='overlayPanel' >
            {this.props.children}
        </div>
    );
}
});
