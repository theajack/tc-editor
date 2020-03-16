"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = render;

var _constant = require("./constant");

var _html = require("./html");

var _js = require("./js");

var _css = require("./css");

function render(code) {
  var languages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_constant.LANG_TYPE.JS];

  if (languages.indexOf(_constant.LANG_TYPE.HTML) !== -1) {
    code = renderWithHTMLMode(code);
  } else if (languages.indexOf(_constant.LANG_TYPE.JS) !== -1) {
    code = (0, _js.renderJS)(code);
  } else if (languages.indexOf(_constant.LANG_TYPE.CSS) !== -1) {
    code = (0, _css.renderCSS)(code);
  }

  return code;
}

function renderWithHTMLMode(code) {
  var jsData = extractCommon(code, 'script');
  code = jsData.code;
  jsData.arr.forEach(function (item, index) {
    if (item.trim() !== '') {
      jsData.arr[index] = (0, _js.renderJS)(item);
    }
  });
  var cssData = extractCommon(code, 'style');
  code = cssData.code;
  cssData.arr.forEach(function (item, index) {
    if (item.trim() !== '') {
      cssData.arr[index] = (0, _css.renderCSS)(item);
    }
  });
  var htmlCode = (0, _html.renderHTML)(code);
  htmlCode = replaceWithArr(htmlCode, _constant.REP.JS, jsData.arr);
  htmlCode = replaceWithArr(htmlCode, _constant.REP.CSS, cssData.arr);
  return htmlCode;
}

function replaceWithArr(code, rep, arr) {
  arr.forEach(function (item) {
    code = code.replace(rep, item);
  });
  return code;
}

function extractCommon(code, type) {
  var arr = [];
  var rep = type === 'script' ? _constant.REP.JS : _constant.REP.CSS;
  var reg = new RegExp("<".concat(type, "(.|\\n)*?>(.|\\n)*?<\\/").concat(type, ">"), 'g');
  code = code.replace(reg, function (str) {
    var first = str.indexOf('>') + 1;
    var last = str.lastIndexOf("</".concat(type, ">"));
    var js = str.substring(first, last);
    arr.push(js);
    return str.substring(0, first) + rep + str.substring(last);
  });
  return {
    code: code,
    arr: arr
  };
}