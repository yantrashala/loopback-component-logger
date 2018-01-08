# loopback-component-logger

Logging component for [loopback] using [bunyan] logger with additional loopback specific hooks and log management API

[![NPM](https://nodei.co/npm/loopback-component-logger.png?downloads=true)](https://nodei.co/npm/loopback-component-logger/)

 [![NPM](https://nodei.co/npm-dl/loopback-component-logger.png?months=3&height=3)](https://nodei.co/npm/loopback-component-logger/)

 [![Build status](https://img.shields.io/travis/yantrashala/loopback-component-logger/master.svg?style=flat-square)](https://travis-ci.org/yantrashala/loopback-component-logger)

### Note: Removing support for connector hook instrumentation given changes with loopback-context.

# Features

- Default logger using [bunyan]
- Can use of custom bunyan [streams] to create root logger
- Hook: Basic performance instrumentation for remote execution
- Hook: Log management API (configurable)

# Usage

Example _server.js_:

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var bunyan = require('bunyan');
var rootLogger = bunyan.createLogger({name: 'myloopbackAPI'});
var logger = require('loopback-component-logger')(rootLogger);
var app = module.exports = loopback();

```

If rootLogger is not provide, the component creates a logger with default
 [bunyan] settings:

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var logger = require('loopback-component-logger')();
var app = module.exports = loopback();

```

Child loggers can be created for model as shown below. By default child loggers
inherit the log level from root.

```js

var logger = require('loopback-component-logger')('TestModel');
module.exports = function(TestModel) {
    logger.debug('Initializing TestModel');
};

```

To add hooks and log management API to [loopback], add configuration to component-config.json:

```js
{
  "loopback-component-explorer": {
    "mountPath": "/explorer"
  },
  "loopback-component-logger": {
      "enableAPI" : true
  }
}

```

# License

[MIT](./LICENSE).

# See Also

- [Loopback][loopback]
- [bunyan][bunyan]

[bunyan]: https://github.com/trentm/node-bunyan
[loopback]: http://loopback.io
[streams]: https://github.com/trentm/node-bunyan#streams
