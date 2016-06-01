'use strict';

var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var bunyan = require('bunyan');
var path = require('path');

if (require.cache[path.resolve(__dirname + '/../index.js')])
    delete require.cache[path.resolve(__dirname + '/../index.js')];

var logger = require('../index');

describe('Testing Logger initialization', function () {

    it('should give error if initialized with non-bunyan logger',
                                                            function (done) {
        var fn = function() {
                var customObj = {'name':'customLogger'};
                logger(customObj);
            };
        expect(fn).to.throw(TypeError);
        done();
    });

    it('should use default logger if no logger is provided', function (done) {
        var a = logger();
        expect(a).to.be.a('object');
        expect(a).to.be.an.instanceof(bunyan);
        expect(a.fields.name).to.equal('defaultLogger');
        done();
    });

    it('should maintain the logger instance', function (done) {
        var log = bunyan.createLogger({name: "myapp"});
        var a = logger(log);
        expect(a.fields.name).to.equal('defaultLogger');
        done();
    });
});
