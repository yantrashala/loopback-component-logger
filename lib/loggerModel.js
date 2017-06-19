'use strict';

var loggerModel;
var debug = require('debug')('loopback:component:logger');
exports.addModel = function(app) {

  loggerModel = app.loopback.PersistedModel.extend('Logger', {
    'name': {
      'type': 'string',
      'required': true,
      'id': true
    },
    'level': {
      'type': 'number',
      'required': true
    }
  });

  loggerModel.disableRemoteMethodByName('create', true);
  loggerModel.disableRemoteMethodByName('deleteById', true);
  loggerModel.disableRemoteMethodByName('upsert', true);
  loggerModel.disableRemoteMethodByName('exists', true);
  loggerModel.disableRemoteMethodByName('findOne', true);
  loggerModel.disableRemoteMethodByName('createChangeStream',true);

  app.model(loggerModel,{
    'public' : true,
    'dataSource' : null
  });

  var memory = app.loopback.createDataSource({
    connector: app.loopback.Memory
  });

  loggerModel.attachTo(memory);
};

exports.attachLoggerMap = function(loggerMap) {

  Object.keys(loggerMap).forEach(function(moduleName){
    var moduleLevel = loggerMap[moduleName].level();

    loggerModel.create({
      'name': moduleName,
      'level': moduleLevel
    },function(err){
      if(err)
        console.log("Error=",err);
    });
  });
};
