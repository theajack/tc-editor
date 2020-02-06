"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSize = initSize;

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

  if (h == 'auto') {
    this.els.bottomView.style('height', h);
    this.els.topView.style('height', h);
    this.els.codearea.data('height', 'auto');
    this.els.codearea.style('overflow-y', 'hidden').style('height', h);
  } else {
    [this.els.bottomView, this.els.topView, this.els.codearea].forEach(function (each) {
      each.style('height', '100%');
    });
  }

  if (w == 'auto') {
    this.els.bottomView.style('width', h);
    this.els.topView.style('width', h);
    this.els.codearea.data('width', 'auto').style({
      'overflow-x': 'hidden',
      'width': w
    });
  } else {
    this.els.bottomView.style('width', '100%');
    this.els.topView.style('width', '100%');
    this.els.codearea.style('width', '100%');
  }
}