'use strict';

var bunyan = require('bunyan');
var defaultLogger;
defaultLogger = bunyan.createLogger({name: 'defaultLogger'});
defaultLogger.level('debug');
module.exports = defaultLogger;
