var logger = require('../../../../index')('TestModel');

module.exports = function(TestModel) {

    logger.debug('Initializing TestModel');

    TestModel.findCustom = function(cb) {
        var childModel = TestModel.app.models.childModel;
        var weather = TestModel.app.models.weather;
        //console.log('result',childModel.name);
        //cb(null,{});
        childModel.find(function(err,result){

            weather.getWeatherData('paris', function(err, weatherData) {
                result.push(weatherData);
                cb(err,result);
            })
        });
    };

    TestModel.remoteMethod('findCustom', {
    http: {
      path: '/findCustom',
      verb: 'get'
    },
    returns: {
      arg: 'data',
      type: 'object',
      root: true
    },
    description: 'Get some custom data',
    notes: 'Get some custom data'
  });

};
