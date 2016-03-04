'use strict';

var responseTime = require('./responseTime');

module.exports = function (app, config, logger) {

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
                'APIResponseTime': res.perf || 'NOT_AN_API',
                'OverallResponseTime': responseTime(startTime)
            });
        };

        next();
    });
};
