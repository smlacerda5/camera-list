var ConfigBlock = require('./configblock');

require('../../css/metrictable.css');
require('../../css/jobdetail.css');
require('../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var innerContent = [];
        innerContent.push(<tr key='moduleName'><td className='metric-table-td metric key'>module name</td><td className='metric-table-td metric value'>{this.props.configBuilder.getModuleName()}</td></tr>);
        innerContent.push(<tr key='moduleType'><td className='metric-table-td metric key'>module type</td><td className='metric-table-td metric value'>{this.props.configBuilder.getModuleType()}</td></tr>);

        var self = this;
        this.props.configBuilder.getConfigKeys().map(function(key) {
            innerContent.push(
                <tr key={key}>
                    <td className='metric-table-td metric key'>{key}</td>
                    <td className='metric-table-td metric value'>
                        <ConfigBlock configBuilder={self.props.configBuilder} configKey={key}/>
                    </td>
                </tr>
            );
        });

        return (
            <table key='metricContent' className='metric-table'><tbody>
                {innerContent}
            </tbody></table>
        );
    }
});