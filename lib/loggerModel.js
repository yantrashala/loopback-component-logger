'use strict';

var loggerModel;
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

    loggerModel.disableRemoteMethod('create', true);
    loggerModel.disableRemoteMethod('deleteById', true);
    loggerModel.disableRemoteMethod('upsert', true);
    loggerModel.disableRemoteMethod('exists', true);
    loggerModel.disableRemoteMethod('findOne', true);
    loggerModel.disableRemoteMethod('createChangeStream',true);

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

    loggerMap = loggerMap || {};
    Object.keys(loggerMap).forEach(function(moduleName){
        var moduleLevel = loggerMap[moduleName].level();

        loggerModel.create({
            'name': moduleName,
            'level': moduleLevel
        },function(err){
            if(err)
                console.log(err);
        });
    });

    // Adding after save hook on loggerModel
    loggerModel.observe('after save', function(ctx, next) {

        if (ctx.instance) {
            console.log('Updating level for logger with name',
                        ctx.instance.name, ', New level is',ctx.instance.level);
            loggerMap[ctx.instance.name].level(ctx.instance.level);
        }

        next();
    });
};

exports.addChild = function(moduleName,childLogger) {
    loggerModel.create({
        'name': moduleName,
        'level': childLogger.level()
    },function(err){
        if(err)
            console.log(err);
    });
};
