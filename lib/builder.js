/**
 * Created by gabriel.acosta on 7/6/15.
 */
'use strict';
var Promise = require('bluebird');
function DtBuilder(model, config){
  if(model === undefined || config === undefined){ throw 'You must provide a model and a config';}
  this.model = model;
  this.config = config;
  this.params = {};
  this.response = {};
  this.init();
}
DtBuilder.prototype.orderBy = function(){
  this.params.order = [
    [this.config.columns[this.config.order[0]["column"]]['data'], this.config.order[0]["dir"].toUpperCase()]
  ];
};
DtBuilder.prototype.init = function(){
  this.response.draw = this.config.draw;
  if(this.config.order !== undefined){
    this.orderBy(this.config.order);
  }
};
DtBuilder.prototype.getParams = function(){
  return this.params;
};
DtBuilder.prototype.getResponse = function(){
  return this.response;
};
DtBuilder.prototype.fetchResults = function(){
  var response = this.response,
    promises = [];
  promises.push(this.model.count({}).then(function(total){
    response.recordsTotal = total;
  }));
  promises.push(this.model.findAndCountAll(this.getParams()).then(function(results){
    response.recordsFiltered = results.count;
    response.data = results.rows;
  }));
  return Promise.all(promises);
};
DtBuilder.prototype.getResponse = function(){
  return this.response;
};
DtBuilder.prototype.serve = function(){
  var dtBuilder = this;
  return this.fetchResults().then(function(){
    return dtBuilder.getResponse();
  });
};
module.exports = DtBuilder;