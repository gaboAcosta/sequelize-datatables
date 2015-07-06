'use strict';

var main = require('../lib');
var expect = require('chai').expect;
/*
  ======== A Handy Little Mocha Reference ========


 var assert = require("assert")

 describe('Array', function() {
   context('#indexOf()', function () {
     it('should return -1 when the value is not present', function () {
       assert.equal(-1, [1,2,3].indexOf(5));
       assert.equal(-1, [1,2,3].indexOf(0));
     });
   });
 });
*/


describe('Datatables main', function() {
  context('The Serve Function does not receive a model or request object', function () {
    it('should throw an exception when no model', function () {
      expect(function(){
        main.getResponse(undefined, {});
      }).to.throw('You must provide a model and a config');
    });
    it('should throw an exception when no request', function () {
      expect(function(){
        main.getResponse({}, undefined);
      }).to.throw('You must provide a model and a config');
    });
  });
});
