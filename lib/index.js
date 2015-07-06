/*
 * cylonsoft-sequelize-datatables
 * https://github.com/Cylonsoft/sequelize-datatables
 *
 * Copyright (c) 2015 Gabo Acosta
 * Licensed under the MIT license.
 */

'use strict';

var DtBuilder = require('./builder');

exports.getResponse = function(model, req) {
  var builder = new DtBuilder(model, req);
  return builder.serve();
};
