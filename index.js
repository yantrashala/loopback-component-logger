'use strict';

var rootLogger;
var defaultLogger = require('./lib/defaultLogger');
var loopbackHook = require('./lib/loopbackHook');

var componentInitialized = false;
var loggerMap = {};

module.exports = function(app, config) {

    app = app || defaultLogger;
    var hook;

    // check if the app instance is loopback
    if(app.hasOwnProperty('loopback')){

        if(!rootLogger) {
            console.log('WARN: Logger not initialized correctly');
            rootLogger = defaultLogger;
        }

        loopbackHook.init(app,config, rootLogger, loggerMap);
        componentInitialized = true;

        return;
    } else {
        if(typeof app === 'string') {

            var moduleName = app;
            if(!loggerMap.hasOwnProperty(moduleName)) {
                // create child logger
                var childLogger = rootLogger.child({
                    submodule: moduleName
                });
                loggerMap[moduleName] = childLogger;
                // if loopback app is initialized than add child logger to
                // logger Model
                if(componentInitialized)
                    loopbackHook.addLoggerModel(moduleName,childLogger);
            }

            return loggerMap[moduleName];
        } else {
            // if app is not a string than its a instanec of a
            // bunyan logger

            rootLogger = app;
            loggerMap['root'] = rootLogger;
            return rootLogger;
        }
    }
};
