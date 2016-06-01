'use strict';

var chai = require('chai');
var expect = chai.expect;
var bunyan = require('bunyan');
var loopback = require('loopback');
var supertest = require('supertest');
var path = require('path');

if (require.cache[path.resolve(__dirname + '/../../index.js')])
    delete require.cache[path.resolve(__dirname + '/../../index.js')];

var logger = require('../../index');

describe('Adding basic performance logs', function () {

    var app,api, catcher;

    before(function(){

        app = require('../fixtures/sample/server/server');
        api = supertest(app);

        function Catcher() {
            this.records = [];
        }
        Catcher.prototype.write = function (record) {
            this.records.push(record);
        }
        catcher = new Catcher();
        var log = new bunyan.createLogger({
            name: 'log',
            streams: [
                {
                    type: 'raw',
                    stream: catcher,
                    level: 'debug'
                }
            ]
        });

        var rootLogger = logger(log);
        logger(app,{});
    });

    it('should log response time (API & Overall)', function (done) {

        api.get('/api/Authors')
        .expect(200)
        .end(function(err,res){
            if (err) return done(err);
            var rec = catcher.records[catcher.records.length - 1];
            expect(rec).to.have.property('APIResponseTime');
            expect(rec).to.have.property('OverallResponseTime');
            done();
        });


    });
});
