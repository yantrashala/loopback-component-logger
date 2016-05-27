'use strict';

var chai = require('chai');
var expect = chai.assert;
var app = require('./loggerTest');
var supertest = require('supertest');
var api = supertest(app);

describe('server', function () {

    //check if server response correctly
    describe('Test Server status ', function () {
        it('should respond with 200 status code', function (done) {
            api.get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    //check if server response correctly
    describe('Test Log for REST CALL', function () {
        it('should respond with 200 status code', function (done) {
            api.get('/api/weather/getWeatherData?city=london')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});
