'use strict';

// function to calculate response time by ms
var responseTime = require('../responseTime');

var restKey = function(ctx,name) {
    return ctx.req.uri;
};

var mongoKey = function(ctx,name) {
    return ctx.req.command;
};

var memoryKey = function(ctx,name) {
    return name;
};

var connectorObj = {
    'rest' : restKey,
    'memory' : memoryKey,
    'mongo' : mongoKey
};

var loadHooks = function(app, config) {
    var models = app.models();
    models.forEach(function (Model) {

        var connector = Model.getDataSource().connector;

        var name = Model.getDataSource().settings.name;
        var type = connector.dataSource.name || '';

        connector.observe('before execute', function(ctx, next) {

            var currentCtx = app.loopback.getCurrentContext();
            if(currentCtx && currentCtx.active && currentCtx.active.http) {
                var context = currentCtx.active.http;
                var key = connectorObj[type] && connectorObj[type](ctx,name);
                context.res.perf = context.res.perf || {};
                context.res.perf[name] = context.res.perf[name] || {};
                context.res.perf[name][key] = responseTime();
            }
            next();
        });

        connector.observe('after execute', function(ctx, next) {

            var currentCtx = app.loopback.getCurrentContext();
            if(currentCtx && currentCtx.active && currentCtx.active.http) {
                var context = currentCtx.active.http;
                var key = connectorObj[type] && connectorObj[type](ctx,name);
                context.res.perf[name][key] = responseTime(context.res.perf[name][key]);
            }
            next();
        });
    });
};

module.exports = loadHooks;
