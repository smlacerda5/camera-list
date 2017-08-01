var JobInput = require('../element/jobinput');
require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            mode: 0,
            modeConfig: { }
        };
    },
    getPosition: function(e) {
        var xPos = 0;
        var yPos = 0;

        while (e) {
            if (e.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = e.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = e.scrollTop || document.documentElement.scrollTop;

                xPos += (e.offsetLeft - xScroll + e.clientLeft);
                yPos += (e.offsetTop - yScroll + e.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (e.offsetLeft - e.scrollLeft + e.clientLeft);
                yPos += (e.offsetTop - e.scrollTop + e.clientTop);
            }

            e = e.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    },
    onDragOver: function (e) {
        e.preventDefault();
    },
    onDrop: function(e) {
        var dropData = e.dataTransfer.getData('JobGraph').split(':_:_:');

        switch (dropData[0])
        {
            case 'generate':
                var parentPosition = this.getPosition(e.currentTarget);
                this.setState({mode:1, modeConfig: { moduleName: dropData[2], type: dropData[1], x: e.pageX - parentPosition.x, y: e.pageY - parentPosition.y }});
                break;
        }
    },
    onComplete: function(e) {
        this.setState({mode:0});
    },
    render: function(){
        var extraComponent = [];

        switch(this.state.mode)
        {
            case 1: // note : generate node
                extraComponent.push(<JobInput key='generator' config={this.state.modeConfig} onComplete={this.onComplete} drawConfig={this.props.drawConfig} />);
            case 0: // note : normal
            default:
                // note : do nothing
        }

        return (
            <div style={{position: 'absolute', top: '0', bottom: '0', width:'100%'}} onDragOver={this.onDragOver} onDrop={this.onDrop} >
                {this.props.children}
                {extraComponent}
            </div>
        );
    }
});