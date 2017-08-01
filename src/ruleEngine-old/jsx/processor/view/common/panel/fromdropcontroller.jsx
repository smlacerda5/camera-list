var ActionRequester = require('../../../../data/dispatcher/actionrequester');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onDragOver: function (e) {
        e.preventDefault();
    },
    onDrop: function(e) {
        var dropData = e.dataTransfer.getData('FromData').split(':_:_:');
        switch (dropData[0])
        {
            case 'add':
                this.props.dplBuilder.formatControl.from.add(dropData[2]);
                break;
        }
    },
    render: function(){
        if(this.props.dplBuilder.dpl.error.from != null){
            return (
                <div style={{position:'relative', width: '100%', height: '100%'}} onDragOver={this.onDragOver} onDrop={this.onDrop} >
                    <div style={{position:'relative', top: '48%', textAlign:'center'}}>add input data to here</div>
                </div>
            );
        }
        else {
            return (
                <div style={{position:'relative', width: '100%', height: '100%'}} onDragOver={this.onDragOver} onDrop={this.onDrop} >
                    {this.props.children}
                </div>
            );
        }
    }
});