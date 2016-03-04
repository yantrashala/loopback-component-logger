var logger = require('../../../../index')('TestModel');

module.exports = function(TestModel) {

    logger.debug('Initializing TestModel');

    TestModel.findCustom = function(cb) {
        var childModel = TestModel.app.models.childModel;
        //console.log('result',childModel.name);
        //cb(null,{});
        childModel.find(function(err,result){
            console.log('result',result);
            cb(err,result);
        });
    };

    TestModel.remoteMethod('findCustom', {
    http: {
      path: '/findCustom',
      verb: 'get'
    },
    returns: {
      arg: 'testModel',
      type: 'testModel',
      root: true
    },
    description: 'Get Account List By Customer Id',
    notes: 'Returns Account List for a given id'
  });

};
