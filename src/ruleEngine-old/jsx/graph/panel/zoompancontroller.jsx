var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');
var Panner = require('centered-pan-zoom');
require('../../../css/zoompancontroller.css');
require('../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this._startX = 0;
        this._startY = 0;
        this.vw = 1;
        this.vh = 1;
        this._panner = new Panner({
            screenWidth: this.vw,
            screenHeight: this.vh
        });

        return {
            scale: this._panner.scale,
            translate: {
                x: this._panner.viewport.x,
                y: this._panner.viewport.y
            }
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
    componentDidMount: function() {
        this.vw = this.refs.rootContainer.offsetWidth;
        this.vh = this.refs.rootContainer.offsetHeight;
        this._panner = new Panner({ screenWidth: this.vw, screenHeight: this.vh });
        if(this.props.initToCenter) this._panner.pan((this.vw/ 2), (this.vh / 2));
        this.setState({scale:this._panner.scale, translate: { x: this._panner.viewport.x, y: this._panner.viewport.y}});
    },
    onMouseDown: function(event){
        this._startX = event.pageX;
        this._startY = event.pageY;
        document.addEventListener('mouseup', this.onMouseUp, true);
        document.addEventListener('mousemove', this.onMouseMove, true);
    },
    onMouseUp: function(){
        document.removeEventListener('mouseup', this.onMouseUp, true);
        document.removeEventListener('mousemove', this.onMouseMove, true);
    },
    onMouseMove: function(event){
        this._panner.panFrom(
            {
                x: this._startX,
                y: this._startY
            },
            {
                x: event.pageX,
                y: event.pageY
            });
        this._startX = event.pageX;
        this._startY = event.pageY;
        this.setState({
            translate: {
                x: this._panner.viewport.x,
                y: this._panner.viewport.y
            },
            scale: this._panner.scale
        });
    },
    onWheel: function(event){
        let zoomFactor;
        if(event.deltaY < 0){
            zoomFactor = this.state.scale * 1.05;
        } else {
            zoomFactor = this.state.scale * 0.95;
        }
        var parentPosition = this.getPosition(this.refs.rootContainer);
        this._panner.zoom(zoomFactor, {x: event.pageX - parentPosition.x, y: event.pageY - parentPosition.y});
        this.setState({
            translate: {
                x: this._panner.viewport.x + 0 * (this.vw * this._panner.scale) / 2,
                y: this._panner.viewport.y + 0 * (this.vh * this._panner.scale) / 2
            },
            scale: this._panner.scale
        });
    },
    render: function(){
        var style = {background: '#17202e'};
        if('background' in this.props)
            style = {background: this.props.background};

        return (
            <div ref='rootContainer' className="pan-zoom-element fit-parent" style={style} onWheel={this.onWheel} onMouseDown={this.onMouseDown} >
                <div key='zpController' className='content-container' style={{ transform: `translate(${this.state.translate.x}px, ${this.state.translate.y}px) scale(${this.state.scale})`, transformOrigin: 'top left'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});