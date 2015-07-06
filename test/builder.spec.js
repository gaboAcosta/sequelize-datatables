/**
 * Created by gabriel.acosta on 7/6/15.
 */
'use strict';

var Builder = require('../lib/builder.js');
var expect = require('chai').expect;
var Promise = require('bluebird');

describe('DtBuilder basic response', function() {
  context('The Builder receives the base request', function(){
    it('Should return the same draw value', function() {
      var req, res, builder;
      req = require('./mocks/requests/base.json');
      builder = new Builder({}, req);
      res = builder.getResponse();
      expect(res.draw).to.equal(req.draw);
    });
  });
});

describe('DtBuilder Ordering', function() {
  context('The builder gets an order field in the request', function () {
    it('should return a params object with Sequelize order options', function () {
      var expected, req, builder;
      req = require('./mocks/requests/base.json');
      expected = {order:[['id','ASC']],offset: "11",limit: "10"};
      builder = new Builder({},req);
      expect(expected).to.deep.equal(builder.getParams());
    });
  });
});
describe('DtBuilder Search', function() {
  context('The builder gets a search field in the request', function () {
    it('should return a params object with Sequelize where options', function () {
      var expected, req, builder;
      req = require('./mocks/requests/search.json');
      expected = {
        order:[['id','ASC']],
        where:{
          $or: [
            {id: { $like: '%test%'}},
            {name: { $like: '%test%'}},
            {email: { $like: '%test%'}},
          ]
        },
        offset: "11",
        limit: "10"
      };
      builder = new Builder({},req);
      expect(expected).to.deep.equal(builder.getParams());
    });
  });
});
describe('DtBuilder Pagination', function() {
  context('The builder gets a start and length parameter in the request', function () {
    it('should return a params object with Sequelize offset and limit options', function () {
      var expected, req, builder;
      req = require('./mocks/requests/search.json');
      expected = {
        order:[['id','ASC']],
        where:{
          $or: [
            {id: { $like: '%test%'}},
            {name: { $like: '%test%'}},
            {email: { $like: '%test%'}},
          ]
        },
        offset: "11",
        limit: "10"
      };
      builder = new Builder({},req);
      expect(builder.getParams()).to.deep.equal(expected);
    });
  });
});
describe('DtBuilder calls Model findAndCountAll', function(){
  context('get result is called on the builder', function(){
      it('Should call on the model findAndCountAll and using a promise return the result', function(){
        var model, req, expected, builder;
        expected = require('./mocks/response/responseMock.json');
        req = require('./mocks/requests/base.json');
        model = {
          findAndCountAll: function(){
            return new Promise(function (resolve) {
              resolve({
                count: expected.recordsFiltered,
                rows: expected.data
              });
            });
          },
          count: function(){
            return new Promise(function (resolve) {
              resolve(expected.recordsTotal);
            });
          }
        };
        Promise.promisifyAll(model.findAndCountAll);
        builder = new Builder(model, req);

        builder.fetchResults().then(function(){
          var response = builder.getResponse();
          expect(response.data).to.deep.equal(expected.data);
          expect(response.recordsTotal).to.equal(expected.recordsTotal);
          expect(response.recordsFiltered).to.equal(expected.recordsFiltered);
        });

      });
  });
});
