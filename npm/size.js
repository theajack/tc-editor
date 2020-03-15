"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSize = initSize;

var _event = require("./event");

function initSize() {
  var item = this.el;
  var w = this.config.width;
  var h = this.config.height;

  if (typeof w === 'number') {
    w += 'px';
  }

  if (typeof h === 'number') {
    h += 'px';
  }

  item.style({
    width: w,
    height: h
  });

  if (h === 'auto') {
    this.els.bottomView.data('height', h).style('height', h);
    this.els.topView.data('height', h).style('height', h);
    this.els.codearea.data('height', h).style({
      'overflow-y': 'hidden',
      'height': h
    });

    _event.checkSizeAuto.call(this, 'height');
  } else {
    [this.els.bottomView.data('height', '100%'), this.els.topView, this.els.codearea].forEach(function (each) {
      each.style('height', '100%');
    });
  }

  window.checkSizeAuto = _event.checkSizeAuto;
  window._this = this;

  if (w === 'auto') {
    this.els.bottomView.style('width', w);
    this.els.topView.data('width', w).style('width', w);
    this.els.codearea.data('width', 'auto').style({
      'overflow-x': 'hidden',
      'width': w
    });

    _event.checkSizeAuto.call(this, 'width');
  } else {
    this.els.bottomView.style('width', '100%');
    this.els.topView.style('width', '100%');
    this.els.codearea.style('width', '100%');
  }
}