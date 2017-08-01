import JobGeneratorPanel from './jobgeneratorpanel';
import Collapse from 'rc-collapse'
var Panel = Collapse.Panel;
import DeleteBtn from '../../accordion/button/deletebtn';
require('../../../css/collapse.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.lastVersion = this.props.typeDataContainer.version;
        return { };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(this.lastVersion != nextProps.typeDataContainer.version) {
            this.lastVersion = nextProps.typeDataContainer.version;
            return true;
        }
        return false;
    },
    render: function() {
        var typeData = this.props.typeDataContainer.data;
        var jobGeneratorPanel = [];
        var newTypePanel = [];
        var keys = Object.keys(typeData);
        keys.forEach(function (key) {
            var newPanel =
                <Panel key={key} header={
                    <span style={{width: '100%'}}>
                        {key}
                        {
                            key !== 'Feeder' && key !== 'Processor' &&
                            <DeleteBtn type={key}/>
                        }
                    </span>
                }>
                    <JobGeneratorPanel type={key} data={typeData[key]}/>
                </Panel>
            ;
            if (key === 'Processor' || key === 'Feeder') jobGeneratorPanel.push(newPanel);
            else newTypePanel.push(newPanel);
        });

        return (
            <Collapse accordion={true}>
                {jobGeneratorPanel}
                {newTypePanel}
            </Collapse>
        )
    }
});
