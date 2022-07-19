/**
 * common.js - General utility scripts.
 */

const Compare = {
  eq:   function (x, y) { return x == y; },
  neq:  function (x, y) { return x != y; },
  lt:   function (x, y) { return x < y; },
  gt:   function (x, y) { return x > y; },
  lte:  function (x, y) { return x <= y; },
  gte:  function (x, y) { return x >= y; }
};

Math.sign = function (x) { return x >= 0 ? 1 : -1; }
