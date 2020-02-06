"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setActiveLineDefTop = setActiveLineDefTop;
exports.initActiveLine = initActiveLine;
exports.setActiveLine = setActiveLine;
exports.activeLine = activeLine;
exports.setActiveLineHeight = setActiveLineHeight;
exports.setActiveLineTop = setActiveLineTop;

var _easyDomUtil = _interopRequireDefault(require("easy-dom-util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var paddingTop = 10;

function setActiveLineDefTop(t) {
  paddingTop = 10 + t;
  setActiveLineTop.call(this, 0);
}

function initActiveLine() {
  return _easyDomUtil["default"].create('div.code_active_line');
}

function setActiveLine(index) {
  if (index === 'hide') {
    this.els.activeLine.style('opacity', '0');

    if (this.els.line) {
      var active = this.els.line.query('.j-active')[0];

      if (active) {
        active.rmClass('j-active');
      }
    }
  } else if (index === 'show') {
    this.els.activeLine.style('opacity', '1');
  } else {
    var top = index * this._mark.lineHeight;
    this.els.activeLine.style('transform', 'translate(0,' + top + 'px)');
    this.els.activeLine.style('-webkit-transform', '-webkit-translate(0,' + top + 'px)');

    if (this.els.line && this.els.line.el.children.length > 0) {
      var _active = this.els.line.query('.j-active')[0];

      if (_active) {
        _active.rmClass('j-active');
      }

      this.els.line.child(index).addClass('j-active');
    }
  }
}

function activeLine() {
  var line = _getCurLine(this.els.codearea.el);

  setActiveLine.call(this, line);
}

function _getCurLine(obj) {
  var v = obj.value; // 开始到光标位置的内容

  var cv = '';

  if ('selectionStart' in obj) {
    cv = v.substr(0, obj.selectionStart);
  } else if (document.createRange) {
    var oSel = document.createRange();
    oSel.moveStart('character', -obj.value.length);
    cv = oSel.text;
  } else {
    var oSel = document.selection.createRange();
    oSel.moveStart('character', -obj.value.length);
    cv = oSel.text;
  } // 获取当前是几行


  var cl = cv.split('\n').length - 1; // console.log(cl);

  return cl;
}

function setActiveLineHeight() {
  this.el.child(0).style('height', this._mark.lineHeight + 'px'); // activeLine
}

function setActiveLineTop(top) {
  this.els.activeLine.style('top', top + paddingTop + 'px');
}