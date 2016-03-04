'use strict';

var responseTime = require('../responseTime');

var loadRemoteHooks = function(app, config) {
    var models = app.models();
    models.forEach(function (Model) {

        Model.beforeRemote('*', function (context, unused, next) {

            var key = context.methodString;
            context.res.perf = context.res.perf || {};
            context.res.perf[key] = {};
            context.res.perf[key].api = responseTime(); //process.hrtime();

            next();
        });

        // remote method after hook
        Model.afterRemote('*', function (context, remoteMethodOutput, next) {

            var key = context.methodString;
            context.res.perf[key].api = responseTime(context.res.perf[key].api);
            next();
        });
    });
};

module.exports = loadRemoteHooks;
