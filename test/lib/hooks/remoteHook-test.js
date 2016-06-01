'use strict';

var chai = require('chai');
var expect = chai.expect;
var bunyan = require('bunyan');
var loopback = require('loopback');
var remoteHook = require('../../../lib/hooks/remoteHook');
var path = require('path');


describe('Adding remote hook for response times', function () {

    var app;

    before(function(){
        if (require.cache[path.resolve(__dirname + '/../../fixtures/sample/server/server.js')])
            delete require.cache[path.resolve(__dirname + '/../../fixtures/sample/server/server.js')];
        app = require('../../fixtures/sample/server/server');
    });

    it('should be able to add remote hooks', function (done) {
        expect(app).to.have.property('loopback');
        var fn = function(){
            remoteHook(app,{});
        };
        expect(fn).to.not.throw(Error);
        done();
    });
});
