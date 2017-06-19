// 'use strict';
//
// var chai = require('chai');
// var expect = chai.expect;
// var bunyan = require('bunyan');
// var loopback = require('loopback');
// var supertest = require('supertest');
// var connectorHook = require('../../../lib/hooks/connectorHook');
// var path = require('path');
//
// var logger = require('../../../index');
//
//
// describe('Loading connectorHooks', function () {
//
//     var app,api;
//
//     before(function(){
//         if (require.cache[path.resolve(__dirname + '/../../fixtures/sample/server/server.js')])
//             delete require.cache[path.resolve(__dirname + '/../../fixtures/sample/server/server.js')];
//         app = require('../../fixtures/sample/server/server');
//         api = supertest(app);
//     });
//
//     it('should load connector hooks', function (done) {
//         expect(app).to.have.property('loopback');
//         var fn = function(){
//             connectorHook(app,{});
//         };
//         expect(fn).to.not.throw(Error);
//         done();
//     });
//
//     it('should execute after-before hooks', function (done) {
//         logger(app,{});
//         api.get('/api/weather/getWeatherData?city=paris')
//         .expect(200)
//         .end(function(err,res){
//           api.get('/api/weather/getWeatherData?city=paris')
//           .expect(200)
//           .end(function(err,res){
//               done();
//           });
//         });
//
//     });
// });
