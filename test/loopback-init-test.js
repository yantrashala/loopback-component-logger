'use strict';

var chai = require('chai');
var expect = chai.expect;
var bunyan = require('bunyan');
var loopback = require('loopback');
var path = require('path');

if (require.cache[path.resolve(__dirname + '/../index.js')])
    delete require.cache[path.resolve(__dirname + '/../index.js')];

var logger = require('../index');

describe('Testing Loopback component initialization', function () {

    describe('should load without error', function() {
        var app;

        before(function(){
            app = loopback();
        });

        it('should use configured logger when loopback is initialized', function (done) {
            expect(app).to.have.property('loopback');
            var log = bunyan.createLogger({name: "myapp"});
            var rootLogger = logger(log);
            logger(app,{});
            expect(rootLogger.fields.name).to.equal('myapp');
            done();
        });
    });

    describe('should display warning', function () {

        var app;
        var orgconsolelog = console.log;
        var logArray = [];

        before(function(){
            if (require.cache[path.resolve(__dirname + '/../index.js')])
                delete require.cache[path.resolve(__dirname + '/../index.js')];

            logger = require('../index');
            app = loopback();
        });

        it('should use default logger if no logger is provided and loopback' +
                                                'is initialized', function (done) {
            expect(app).to.have.property('loopback');
            console.log = function() {
                var logStr ='';
                var args = Array.prototype.slice.call(arguments);
                args.forEach(function(str){
                    logStr = logStr + str;
                });
                logArray.push(logStr);
            };

            logger(app,{});
            console.log = orgconsolelog;
            expect(logArray).to.include.members(['WARN: Logger not initialized correctly using defaultLogger']);
            done();
        });
    });
});
