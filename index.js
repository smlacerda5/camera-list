module.exports = {
  getMenu : function(){

  },
  register : function(){

  },
  unregister : function(){

  },
  getRoutes : function(){
    return require('./src/route');
  },
  getNavigationProps : function(){
    return {
      text : 'Cameras',
      value : '/dashboard/cameralist'
    };
  }
};