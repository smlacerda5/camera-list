// for Dev...
// window.M = {
//   player: {
//     video: require('@player/video'),
//     chart: require('@player/chart')
//   }
// };

require('./index.css');

module.exports = React.createClass({
  displayName: 'Camera',
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleMenuChange(_menu, _item){
    this.context.router.push({ pathname:'/dashboard/cameralist/' + _item });
  },
  _getOptions: function() {
    return [
      {icon: 'viewer_video', text: 'Camera', value: 'object'},
      // {icon: 'cubes',text: 'Object Type',value: 'object-type'},
      // {icon: 'contents_share',text: 'Rule Engine',value: 'rule-engine'},
      // {icon: 'contents_copy',text: 'Status Rule',value: 'rule-status-condition'},
      // {icon: 'file-text',text: 'Status',value: 'rule-status'},
    ];
  },
  _getActiveIndex: function() {
    var activeIndex = 0;
    var path = window.location.pathname;
    var currentPath = path.substring(path.lastIndexOf('/') + 1, path.length);
    this._getOptions().forEach(function(val, index) {
      if(val.value === currentPath) activeIndex = index
    });

    return activeIndex;
  },

  componentDidMount : function() {},

  render: function () {
    return (
      <div style={{display: "flex", height: "100%"}}>
        <n.Menubar
          ref="menuBar"
          ui={"icon"}
          activeIndex={this._getActiveIndex()}
          collapsed={true}
          options={this._getOptions()}
          direction="vertical"
          onChange={this.handleMenuChange}
          onCollapse={this.handleMenuCollapse}
        />

        <div style={{flex: 1, position: "relative"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
});