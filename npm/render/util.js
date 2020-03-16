"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceWithArray = replaceWithArray;

function replaceWithArray(text, reg, array) {
  var rep = '___REP___';
  text = text.replace(reg, rep);
  array.forEach(function (a) {
    text = text.replace(rep, a);
  });
  return text;
}