"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFunction = checkFunction;
exports.fixNum = fixNum;
exports.copy = copy;
exports.replaceWithArray = replaceWithArray;

var _easyDomUtil = _interopRequireDefault(require("easy-dom-util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function checkFunction(a) {
  if (a == undefined) {
    return function () {};
  } else {
    var b = _typeof(a);

    if (b == 'function') {
      return a;
    } else if (b == 'string') {
      return new Function(a);
    } else {
      return function () {};
    }
  }
}

function fixNum(d) {
  return d < 10 ? '0' + d : d;
}

;

function copy(b) {
  var a = _easyDomUtil["default"].query('#j_c_copy');

  if (a === null) {
    a = _easyDomUtil["default"].create('textarea#j_c_copy');

    _easyDomUtil["default"].query('body').append(a);
  }

  a.value(b).el.select();

  if (document.execCommand('Copy')) {
    return true;
  } else {
    alert('Copy is not supported in your browser');
    return false;
  }
}

;

function replaceWithArray(text, reg, array) {
  var rep = '___REP___';
  text = text.replace(reg, rep);
  array.forEach(function (a) {
    text = text.replace(rep, a);
  });
  return text;
} // export function scrollTo (dom, a, b, c = 400) {
//     scrollBase(dom, 'scrollTop', a, b, c);
// }
// export function scrollXTo (dom, a, b, c = 400) {
//     scrollBase(dom, 'scrollLeft', a, b, c);
// }
// function scrollBase (dom, attr, a, b, c = 400) {
//     var n = 0;
//     var f = c / 10;
//     var g = c / f;
//     var d = dom[attr];
//     var h = setInterval(function () {
//         d += g;
//         dom[attr] = Math.round(d);
//         n++;
//         if (n === f) {
//             dom[attr] = a;
//             checkFunction(b)();
//             clearTimeout(h);
//         }
//     }, 10);
// }