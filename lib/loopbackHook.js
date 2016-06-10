'use strict';

var loggerModel = require('./loggerModel');

 exports.init = function(app, config, rootLogger, loggerMap) {

     // adding basic performance logger
     var perfLogger = rootLogger.child({submodule: 'perfLogger'});
     // setting info as default level for perfLogger
     perfLogger.level(30);
     loggerMap['perfLogger'] = perfLogger;
     require('./basicPerfLogger')(app,config, perfLogger);

     require('./hooks/remoteHook.js')(app, config);
     require('./hooks/connectorHook.js')(app, config);

     var enableAPI = config.enableAPI || false;
     if(enableAPI) {
         // adding log management api
         loggerModel.addModel(app);
         app.once('started', function(){
             loggerModel.attachLoggerMap(loggerMap);
         });
     }
};

// exports.addLoggerModel = function(moduleName,childLogger) {
//     loggerModel.addChild(moduleName,childLogger);
// };
