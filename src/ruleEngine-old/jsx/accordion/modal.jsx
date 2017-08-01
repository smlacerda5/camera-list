var ReactDOM = require('react-dom');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            mode: 0
        };
    },

    componentDidMount: function () {
        var self = this;
        this.modalTarget = document.createElement('div');
        this.modalTarget.className = 'modal';
        this.modalTarget.setAttribute("style", "width: 100%; height: 100%; position: fixed; top: 0; left: 0; background-color: rgba(0,0,0,.65); cursor:pointer");
        var self = this;
    },

    componentDidUpdate: function() {
        this.state.mode === 1 && this._render();
    },

    show: function() {
        document.body.appendChild(this.modalTarget);
        this._render();
        this.setState({mode: 1});
    },

    hide: function() {
        document.body.removeChild(this.modalTarget);
    },

    componentWillUnmount: function() {
        ReactDOM.unmountComponentAtNode(this.modalTarget);
    },

    _render: function () {
        ReactDOM.render(
            <div style={{width: '100%', height: '100%', zIndex: 1}}>{this.props.children}</div>,
            this.modalTarget
        );
    },

    render: function() {
        return (
            <div/>
        );
    }
});
