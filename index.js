'use strict';

var rootLogger;
var defaultLogger = require('./lib/defaultLogger');

module.exports = function(app, config) {

    app = app || defaultLogger;

    // check if the app instance is loopback
    if(app.hasOwnProperty('loopback')){
        //loopbackHook(app,config); - Feature to be added
        return;
    } else {
        if(typeof app === 'string') {
            // create child logger
            return rootLogger.child({
                submodule: app
            });
        } else {
            // if app is not a string than its a instanec of a
            // bunyan logger

            rootLogger = app;
            return rootLogger;
        }
    }
};
