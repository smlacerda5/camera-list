var ActionBtn = require('./button/alignbtn');
var ExportBtn = require('./button/export');
var ImportBtn = require('./button/import');
var JobContainer = require('./panel/jobcontainer');
var DropController = require('./panel/dropcontroller');
var CoordinateAligner = require('./panel/coordinatealigner');
var ZoomPanController = require('./panel/zoompancontroller');
var OverlayPanel = require('./panel/overlaypanel');
require('../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div className="layout-fit no-carrot">
                <OverlayPanel>
                    <div>
                        <ExportBtn />
                        <ImportBtn />
                    </div>
                    <div>
                        <ActionBtn mode='C'/>
                        <ActionBtn mode='V'/>
                        <ActionBtn mode='H'/>
                    </div>
                </OverlayPanel>,
                <DropController key='graph' drawConfig={this.props.drawConfig} >
                    <ZoomPanController initToCenter={true}>
                        <CoordinateAligner drawConfig={this.props.drawConfig} modeConfig={this.props.modeConfig} >
                            <JobContainer drawConfig={this.props.drawConfig} modeConfig={this.props.modeConfig} />
                        </CoordinateAligner>
                    </ZoomPanController>
                </DropController>
            </div>
        );
    }
});
