'use strict';

var rootLogger = null;
var defaultLogger = require('./lib/defaultLogger');
var loopbackHook = require('./lib/loopbackHook');
var bunyan = require('bunyan');

var componentInitialized = false;
var loggerMap = {};
module.exports = function(app, config) {
  app = app || defaultLogger;
  var hook;
  if (app.hasOwnProperty('loopback')) {
    // check if the app instance is loopback. This is called when
    // the component is getting initialized
    if (!rootLogger) {
      console.log('WARN: Logger not initialized correctly ',
      'using defaultLogger');
      rootLogger = defaultLogger;
    }

    loopbackHook.init(app, config, rootLogger, loggerMap);
    componentInitialized = true;

    return;
  } else {
    if (typeof app === 'string') {
      var moduleName = app;
      if (!loggerMap.hasOwnProperty(moduleName)) {
        // create child logger
        var childLogger = rootLogger.child({submodule: moduleName});
        loggerMap[moduleName] = childLogger;
      }

      return loggerMap[moduleName];
    } else {
      // if app is not a string than its a instance of a
      // bunyan logger. initialize only once
      if (!rootLogger) {
        if (app instanceof bunyan) {
          rootLogger = app;
          loggerMap['root'] = rootLogger;
        } else {
          var errStr = 'Logger provided is not an instance of bunyan';
          throw new TypeError(errStr);
        }
      }

      return rootLogger;
    }
  }
};
