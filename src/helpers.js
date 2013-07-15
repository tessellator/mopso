/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

function rmin(x, y) {
  // exists for easier integration with reduce
  return y === undefined ?
    Math.min.apply(null, x) :
    Math.min(x, y);
}

function zip(x, y) {
  var len = Math.max(x.length, y.length);
  var arr = [];
  for(var i = 0; i < len; i++) {
    arr.push([x[i], y[i]]);
  }
  return arr;
}


function minmax_normalize(value, min, max, new_min, new_max) {
  return (value - min) * ((new_max - new_min) / (max - min)) + new_min;
}

function brand(min, max) {
  return min + (max - min) * Math.random();
}

function sinc(x) {
  return x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);
}

function getRows(matrix) {
  var count = matrix.rows();
  var rows = [];

  for(var i = 0; i < count; i++) {
    var elements = [];
    matrix.row(i + 1).each(function(x) { elements.push(x); })
    rows.push(elements);
  }

  return rows;
}

function createRand2DMatrix(bounds, rows) {
  var elements = [];
  for(var j = 0; j < rows; j++) {
    elements.push([
      brand(bounds.minX, bounds.maxX),
      brand(bounds.minY, bounds.maxY)
    ]);
  }

  return Matrix.create(elements);
}

function arrayToMatrix(arr, rows) {
  var r = [];
  for(var i = 0; i < rows; i++) {
    r.push(arr);
  }

  return Matrix.create(r);
}