'use strict';

// function to calculate response time by ms
var responseTime = function (obj) {
    if (!obj) {
        return process.hrtime();
    } else {
        var diff = process.hrtime(obj);
        return (diff[0] * 1e9 + diff[1]) / 1e6;
    }
};


var loadModelHook = function(app, config) {
    var models = app.models();
    models.forEach(function (Model) {

        Model.beforeRemote('*', function (context, unused, next) {

            var key = context.methodString;
            context.res.perf = context.res.perf || {};
            context.res.perf[key] = responseTime(); //process.hrtime();

            next();
        });

        // remote method after hook
        Model.afterRemote('*', function (context, remoteMethodOutput, next) {

            var key = context.methodString;
            context.res.perf[key] = responseTime(context.res.perf[key]);
            next();
        });
    });
};

module.exports = function (app, config, logger) {

    loadModelHook(app,config);

    app.middleware('initial:before', function (req, res, next) {

        var ended = false;
        var end = res.end;
        var startTime = responseTime();
        var count = 0;
        var url = req.url;
        var method = req.method;

        res.end = function (chunk, encoding) {

            if (ended)
                return;

            ended = true;
            end.call(this, chunk, encoding);

            logger.info({
                'req': req,
                'ModelResponseTime': res.perf,
                'OverallResponseTime': responseTime(startTime)
            });
        };

        next();
    });
};
