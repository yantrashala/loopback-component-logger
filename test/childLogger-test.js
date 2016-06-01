'use strict';

var chai = require('chai');
var expect = chai.expect;
var bunyan = require('bunyan');
var path = require('path');

if (require.cache[path.resolve(__dirname + '/../index.js')])
    delete require.cache[path.resolve(__dirname + '/../index.js')];

var logger = require('../index');

describe('Adding child loggers', function () {

    var rootLogger;

    before(function(){
        var rootLogger = logger();
    });

    it('should be able to add child loggers', function (done) {
        var childLogger = logger('child1');
        childLogger.key = 'testing';
        expect(childLogger).to.be.a('object');
        expect(childLogger).to.be.an.instanceof(bunyan);
        expect(childLogger.fields.submodule).to.equal('child1');
        done();
    });

    it('should not be able to add same child again', function (done) {
        var childLogger = logger('child1');
        expect(childLogger).to.be.a('object');
        expect(childLogger).to.be.an.instanceof(bunyan);
        expect(childLogger.fields.submodule).to.equal('child1');
        expect(childLogger.key).to.equal('testing');
        done();
    });
});
