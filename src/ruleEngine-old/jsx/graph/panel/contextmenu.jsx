var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            mode: 0
        };
    },
    show: function() {
        this.setState({mode:1});
    },
    hide: function() {
        this.setState({mode:2});
    },
    onRest: function() {
        if(this.state.mode == 2)
            this.setState({mode:0});
    },
    getMenuComponents: function(menuRadius) {
        var menuComponents = [];
        if(Array.isArray(this.props.children)) {
            for(var index in this.props.children) {
                var child = this.props.children[index];
                menuComponents.push(<span key={child.key} style={{float:'left', display:'inline', width: menuRadius * 2, height: menuRadius * 2}}>{child}</span>);
            }
        }
        else {
            menuComponents.push(<span key={this.props.children.key} style={{float:'left', display:'inline', width: menuRadius * 2, height: menuRadius * 2}}>{this.props.children}</span>);
        }
        return menuComponents;
    },
    render: function() {
        if(this.state.mode == 0)
            return null;

        var menuRadius = this.props.menuRadius == null ? 10 : this.props.menuRadius;
        var menuComponents = this.getMenuComponents(menuRadius);
        var menuWidth = menuRadius * menuComponents.length * 2;
        var elementRadius = (this.props.style.width >> 1);
        var topLimit = (elementRadius * Math.cos((Math.PI / 4)) + menuRadius) - 4;
        var top = this.props.style.top + elementRadius - menuRadius;
        var left = this.props.style.left + elementRadius - menuRadius;
        var a = (-elementRadius) / 2500;

        var startWeight = -50, endWeight = 22, stiffness = 150, damping = 26;

        if(this.state.mode == 2) { var temp = startWeight; startWeight = endWeight; endWeight = temp; stiffness = 120; damping = 26; }

        return (
            <Motion defaultStyle={{weight: startWeight}} style={{weight: spring(endWeight, {stiffness: stiffness, damping: damping}) }} onRest={this.onRest}>
                {value => {
                    var diff = (a * (value.weight * value.weight)) + topLimit;
                    return <span key='contextmenu' style={{ position:'absolute', left:left + diff, top:top - diff, width: menuWidth, zIndex: value.weight > 0 ? 1 : 0}}>{menuComponents}</span>
                }}
            </Motion>
        );
    }
});