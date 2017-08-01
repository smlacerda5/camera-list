require('../../../../css/metrictable.css');

// note : ��Ÿ�ӿ� ���� ��ȭ�� ���� ���� table�� ������ �ڵ��� ���� ����

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onChange: function(e) {
        this.props.config.join = e.target.value;
        this.setState({});
    },
    render: function() {
        return (
            <table className='metric-table' style={{height:'100%'}}>
                <tbody>
                    <tr>
                        <td className='metric-table-td'><div className='metric key'><p>Join Type</p></div></td>
                        <td className='metric-table-td'>
                            <div className='metric value'>
                                <select ref='joinselector' className='fit-parent' onChange={this.onChange} value={this.props.config.join}>
                                    <option value='inner'>both</option>
                                    <option value='full'>any</option>
                                    <option value='left'>target</option>
                                    <option value='right'>my</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='metric-table-td'><div className='metric key'><p>Target OT</p></div></td>
                        <td className='metric-table-td'><div className='metric value'><p>{this.props.dplBuilder.formatControl.from.getName(this.props.config.targetID)}</p></div></td>
                    </tr>
                    <tr>
                        <td className='metric-table-td'><div className='metric key'><p>Target Key</p></div></td>
                        <td className='metric-table-td'><div className='metric value'><p>{this.props.config.targetKey}</p></div></td>
                    </tr>
                    <tr>
                        <td className='metric-table-td'><div className='metric key'><p>My Key</p></div></td>
                        <td className='metric-table-td'><div className='metric value'><p>{this.props.config.myKey}</p></div></td>
                    </tr>
                </tbody>
            </table>
        )
    }
});
