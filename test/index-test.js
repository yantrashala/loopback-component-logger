'use strict';

var chai = require('chai');
var expect = chai.assert;
var app = require('./loggerTest/server/server');
var supertest = require('supertest');
var api = supertest('http://'+app.get('host')+':'+app.get('port'));

describe('server', function () {

    var serverInstance;
    //start server
    before(function () {
        serverInstance = app.start();
    });

    //stop server at the end
    after(function () {
        serverInstance.close();
    });

    //check if server response correctly
    describe('Test Server status ', function () {
        it('should respond with 200 status code', function (done) {
            api.get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should Logger model', function (done) {
            api.get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

    });
});