const getJobListOptions = (function(cb) {
   n.call('job.list', {}, function(e, res) {
      const results = res.body;

      let options = [];
      
      results.forEach((object, idx) => {
         let data = {
            value: object.Name,
            text: object.Name
         };
         
         options.push(data);
      });

      return options;
   });
})();

module.exports = getJobListOptions;
