'use strict';

var debug = require('debug')('loopback:component:logger');

// function to calculate response time by ms
var responseTime = require('../responseTime');

var restKey = function(ctx,name) {
    return ctx.req.uri;
};

var mongoKey = function(ctx,name) {
    return ctx.model + '-' + ctx.req.command;
};

var memoryKey = function(ctx,name) {
    return name;
};

var connectorObj = {
    'rest' : restKey,
    'memory' : memoryKey,
    'mongodb' : mongoKey
};

var loadHooks = function(app, config) {
    var models = app.models();
    debug('Adding connector hooks for models');
    models.forEach(function (Model) {
        debug('Found Model',Model.modelName);
        if(!Model.getDataSource() || !Model.getDataSource().connector)
          return;

        var connector = Model.getDataSource().connector;

        var name = Model.getDataSource().settings.name;
        var type = connector.dataSource.name || '';

        debug('Found connector ',name, 'of type', type);

        connector.observe('before execute', function(ctx, next) {
            debug('connector before execute for',name);
            ctx.perf = responseTime();
            next();
        });

        connector.observe('after execute', function(ctx, next) {
            debug('connector after execute for',name);
            var loopbackContext = app.loopback.getCurrentContext();
            if(loopbackContext && loopbackContext.active && loopbackContext.active.http) {
                var httpContext = loopbackContext.active.http;
                var key = connectorObj[type] && connectorObj[type](ctx,name);
                httpContext.res.perf = httpContext.res.perf || {};
                httpContext.res.perf[name] = httpContext.res.perf[name] || [];

                var perfData = {
                    'key' :  key,
                    'responseTime' : responseTime(ctx.perf)
                };

                httpContext.res.perf[name].push(perfData);
            }
            next();
        });
    });
};

module.exports = loadHooks;
