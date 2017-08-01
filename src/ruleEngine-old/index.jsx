import DataContext from './jsx/data/datacontext';
import ActionRequester from './jsx/data/dispatcher/actionrequester';
import Main from './jsx/main';

module.exports = React.createClass({
    displayName: 'RuleEngine',
    getInitialState: function() {
        this.dataContainer = {
            version: 0,
            align: '',
            data: [],
            extra: {}
        };
        return {
            mode: 0,
            drawConfig: { radius: 70 },
            modeConfig: this.dataContainer,
            typeDataContainer: {    // todo : graph side panel ���η� �����ְ� ���� ����
                version: 0,
                data: {}
            }
        };
    },
    componentDidMount: function() {
        DataContext.regist(DataContext.callbackType.Data, this.dataUpdated);
        DataContext.regist(DataContext.callbackType.DetailData, this.detailDataUpdated);
        DataContext.regist(DataContext.callbackType.Align, this.alignUpdated);
        ActionRequester.updateData();
    },
    componentWillUnmount: function() {
        DataContext.unregist(DataContext.callbackType.Data, this.dataUpdated);
        DataContext.unregist(DataContext.callbackType.DetailData, this.detailDataUpdated);
        DataContext.unregist(DataContext.callbackType.Align, this.alignUpdated);
    },
    dataUpdated: function(jobData, jobTypeData) {
        this.dataContainer.version++;
        this.dataContainer.data = jobData;
        this.state.typeDataContainer.version++;
        this.state.typeDataContainer.data = jobTypeData;

        this.setState({
            mode: 0,
            drawConfig: this.state.drawConfig,
            modeConfig: this.dataContainer,
            typeDataContainer: this.state.typeDataContainer
        });
    },
    alignUpdated: function(align) {
        if(this.dataContainer.align != align)
        {
            this.dataContainer.version++;
            this.dataContainer.align = align;
            this.setState({
                mode: 0,
                drawConfig: this.state.drawConfig,
                modeConfig: this.dataContainer,
                typeDataContainer: this.state.typeDataContainer
            });
        }
    },
    detailDataUpdated: function(detailDataContainer) {
        if(!$.isEmptyObject(detailDataContainer)) {
            this.setState({
                mode: 1,
                drawConfig: this.state.drawConfig,
                modeConfig: detailDataContainer,
                typeDataContainer: this.state.typeDataContainer
            });
        }
        else {
            this.setState({
                mode: 0,
                drawConfig: this.state.drawConfig,
                modeConfig: this.dataContainer,
                typeDataContainer: this.state.typeDataContainer
            });
        }
    },
    render: function() {
        return (
            < n.Panel title="Rule Engine" fit={true} >
                <Main config={this.state} />
            </ n.Panel>
        );
    }
});
