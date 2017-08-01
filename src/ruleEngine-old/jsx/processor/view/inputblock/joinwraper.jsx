var InputTable = require('./inputtable');
require('../../../../css/metrictable.css');

// note : select, where, remove/join 에서 랜덤 엑세스 할 목적으로 현 데이터 구조 선택함..
// note : 다른 동작에서 이득을 보지만 join 정렬에서만 손해를 봄
module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    selectEntryTable: function(retGroupList, leftJoinTable) {
        var self = this;
        var inputConfig = this.props.dplBuilder.dpl.config.from;
        var inputData = this.props.dplBuilder.dpl.data.input;
        var tableKeyList = Object.keys(inputConfig);
        tableKeyList.map(function(value){
            var targetTableInfo = inputConfig[value];
            if(targetTableInfo.targetID.length > 0) {
                if(targetTableInfo.targetID in leftJoinTable) {
                    leftJoinTable[targetTableInfo.targetID].push(targetTableInfo)
                }
                else {
                    leftJoinTable[targetTableInfo.targetID] = [ targetTableInfo ];
                }
            }
            else {
                var targetData = {};
                if(targetTableInfo.name in inputData)
                    targetData = inputData[targetTableInfo.name];

                retGroupList.push({
                    tableInfo: targetTableInfo,
                    tableComponents: [ <InputTable  key={value} config={targetTableInfo} data={targetTableInfo.name in inputData ? inputData[targetTableInfo.name] : {}} dplBuilder={self.props.dplBuilder}/> ]
                });
            }
        });
    },
    pushLeftTables: function(currentGroup, leftJoinTable, outputComponents) {
        var inputData = this.props.dplBuilder.dpl.data.input;
        for(var key in currentGroup) {
            var referencedTable = currentGroup[key];
            if(referencedTable.id in leftJoinTable) {
                var nextGroup = leftJoinTable[referencedTable.id];
                delete leftJoinTable[referencedTable.id];

                for(var index in nextGroup) {
                    var nextTable = nextGroup[index];
                    outputComponents.push(<InputTable  key={nextTable.id} config={nextTable} data={nextTable.name in inputData ? inputData[nextTable.name] : {}} dplBuilder={this.props.dplBuilder}/>)
                }
                this.pushLeftTables(nextGroup, leftJoinTable, outputComponents);
            }
        }
    },
    alignJoinGroup: function(){
        var retGroupList = [];
        var leftJoinTable = {};
        this.selectEntryTable(retGroupList, leftJoinTable);

        for(var groupIndex in retGroupList) {
            var groupInfo = retGroupList[groupIndex];
            this.pushLeftTables([groupInfo.tableInfo], leftJoinTable, groupInfo.tableComponents);
        }

        return retGroupList;
    },
    render: function() {
        var inputComponents = [];
        var joinGroupList = this.alignJoinGroup();

        joinGroupList.map(function(group){
            var className = '';
            var joinComponents = [];
            if(group.tableComponents.length > 1) {
                className = 'metric-table-join';
                joinComponents.push(<div key='join title'>Joined</div>);
                joinComponents = joinComponents.concat(group.tableComponents);
            }
            else {
                className = 'metric-table-single';
                joinComponents = group.tableComponents;
            }

            inputComponents.push(<div key={group.tableInfo.id} className={className}>{joinComponents}</div>);
        });

        return (
            <div>{inputComponents}</div>
        )
    }
});
