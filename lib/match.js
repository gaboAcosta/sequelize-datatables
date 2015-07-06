/**
 * Created by gabriel.acosta on 7/6/15.
 */
var _ = require('lodash');

function DtMatch(term, columns){
  this.term = '%'+term.value+'%';
  this.columns = columns;
  this.result = {$or:[]};
  this.init();
}

DtMatch.prototype.init = function(){
  var term = this.term;
  var $or = this.result.$or;
  _(this.columns).each(function(column){
    var searchTerm = {};
    // In order to allow custom columns we might receive empty colu
    if(column.data != '' && column.searchable){
      searchTerm[column.data] = {$like: term};
      $or.push(searchTerm);
    }
  });
};

DtMatch.prototype.getResult = function(){
  return this.result;
};

DtMatch.prototype.hasMatch = function(){
  return this.result.$or.length > 0;
};


module.exports = DtMatch;
