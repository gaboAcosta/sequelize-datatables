/*
 * cylonsoft-sequelize-datatables
 * https://github.com/Cylonsoft/sequelize-datatables
 *
 * Copyright (c) 2015 Gabo Acosta
 * Licensed under the MIT license.
 */

'use strict';

var DtBuilder = require('./builder');

exports.getResponse = function(model, req, modelConfig) {
  var builder = new DtBuilder(model, req, modelConfig);
  return builder.serve();
};
