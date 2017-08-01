module.exports = {
  // path:'/',
  path:'/dashboard/cameralist',
  component: require('./index'),
  indexRoute : { component: require('./object')},
  onEnter : function(nextState, replace){
  },
  childRoutes: [
    { path: '/dashboard/cameralist/object', component: require('./object') },
    // { path: '/dashboard/cameralist/object-type', component: require('./objectType') },
    // { path: '/dashboard/cameralist/data-feeder', component: require('./dataFeeder') },
    // { path: '/dashboard/cameralist/rule-engine', component: require('./ruleEngine') },
    // { path: '/dashboard/cameralist/rule-status', component: require('./ruleStatus') },
    // { path: '/dashboard/cameralist/rule-status-condition', component: require('./ruleStatusCondition') },

    // { path: 'metric', component: require('./metric/dev-metric') }
  ]
};