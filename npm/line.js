"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLine = initLine;
exports.setLinePT = setLinePT;
exports.reinitLine = reinitLine;
exports.initLineDivHeight = initLineDivHeight;
exports.setLineHeight = setLineHeight;
exports.setLineTop = setLineTop;

var _easyDomUtil = _interopRequireDefault(require("easy-dom-util"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var lineTop = 10;

function initLine() {
  if (this.config.lineIndex) {
    this._mark.line = true;
    this.els.line = _easyDomUtil["default"].create('div.code_line_w').append(_easyDomUtil["default"].create('div').text('01').style('line-height', this._mark.lineHeight + 'px'));
    this.el.append(this.els.line);
  } else {
    this._mark.line = false;
    var pl = '10px';
    this.els.bottomView.style('padding-left', pl);
    this.els.topView.style('padding-left', pl);
    this.els.codearea.style('padding-left', pl);
  }
}

function setLinePT(top) {
  if (!this._mark.line) {
    return;
  }

  lineTop = 10 + top;
  this.els.line.style('padding-top', lineTop + 'px');
  lineTop += 10;
}

function reinitLine() {
  if (!this._mark.line) {
    return;
  }

  var len = this.els.line.el.children.length;
  var lines = getLines.call(this);
  initLineDivHeight.call(this, lines);

  if (lines > len) {
    for (var i = 1; i <= lines - len; i++) {
      this.els.line.append(_easyDomUtil["default"].create('div').text((0, _util.fixNum)(len + i)).style('line-height', this._mark.lineHeight + 'px'));
    }
  } else if (lines < len) {
    for (var i = lines; i < len; i++) {
      this.els.line.child(lines).remove();
    }
  }
}

function initLineDivHeight(lines) {
  if (this.els.line) {
    if (typeof lines === 'undefined') {
      lines = getLines.call(this);
    }

    this.els.line.style('height', this._mark.lineHeight * lines + lineTop + 'px');
  }
}

function getLines() {
  return this.els.codearea.value().split('\n').length;
}

function setLineHeight() {
  var _this = this;

  if (this._mark.line) {
    this.els.line.child().forEach(function (lineItem) {
      lineItem.style({
        height: _this._mark.lineHeight + 'px',
        'line-height': _this._mark.lineHeight + 'px'
      });
    });
    initLineDivHeight.call(this);
  }
}

function setLineTop(top) {
  if (this.els.line) this.els.line.style('top', top + 'px');
}