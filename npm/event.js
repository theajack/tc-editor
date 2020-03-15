"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEvent = initEvent;
exports.geneViewCode = geneViewCode;
exports.checkSizeAuto = checkSizeAuto;

var _key_down = _interopRequireDefault(require("./key_down"));

var _render = require("./render");

var _activeLine = require("./activeLine");

var _line = require("./line");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function initEvent() {
  var _this = this;

  // this
  var code = this.els.codearea;
  code.on({
    mouseleave: function mouseleave() {// showResult(false);
    },
    keydown: function keydown(event) {
      // _codeChange.call(this, event);
      _key_down["default"].call(code.el, event, _this.config.tab);

      if (event.ctrlKey) {
        if (event.keyCode === 187 || event.keyCode === 189) {
          event.keyCode === 187 ? _this.fontSizeUp() : _this.fontSizeDown();

          _activeLine.setActiveLine.call(_this, 'hide');

          event.preventDefault();
        }
      }
    },
    keyup: function keyup(e) {
      var k = e.keyCode;

      if (k == 13 || k == 9) {
        // 回车和tab键
        geneViewCode.call(_this);
      }

      if (k === 38 || k === 40 || k === 13 || k === 8 || // 上下 回车 删除
      e.ctrlKey && (k === 86 || k === 88 || k === 89 || k === 90) // ctrl + v x y z
      ) {
          _activeLine.activeLine.call(_this);
        }
    },
    input: function input() {
      geneViewCode.call(_this);
    },
    scroll: function scroll() {
      _getView(_this.el).forEach(function (el) {
        el.el.scrollTop = code.el.scrollTop;
        el.el.scrollLeft = code.el.scrollLeft;
      });

      var top = -code.el.scrollTop;

      _line.setLineTop.call(_this, top);

      _activeLine.setActiveLineTop.call(_this, top);
    },
    click: function click() {
      _activeLine.activeLine.call(_this);

      _activeLine.setActiveLine.call(_this, 'show');
    },
    blur: function blur() {
      _activeLine.setActiveLine.call(_this, 'hide');
    } // onclick:moveCursor

  }); // _tabEnable(code);
} // function _codeChange (e) {
//     // if (this.el.attr('jet-change') === '0') {
//     //     this.el.attr('jet-change', '1');
//     // }
//     if (e.keyCode === 13 || e.keyCode === 9) {
//         geneViewCode.call(this);
//     }
//     // geneViewCode();
// }


function geneViewCode() {
  var val = this.els.codearea.value();
  var html = (0, _render.renderHTML)(val);

  _getView(this.el, 1).html(html);

  var js = (0, _render.renderJS)(val);

  _getView(this.el, 0).html(js);

  checkSizeAuto.call(this);

  _line.reinitLine.call(this);
}

function _getView(obj, i) {
  if (i != undefined) {
    return obj.child(i + 1);
  }

  return obj.query('.code_editor_view');
}

function checkSizeAuto() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

  if (type === 'all' || type === 'height') {
    _checkSizeAutoPart.call(this, 'height');
  }

  if (type === 'all' || type === 'width') {
    _checkSizeAutoPart.call(this, 'width');
  }
}

function _checkSizeAutoPart(s) {
  var obj = this.els.codearea;

  if (obj.data(s) === 'auto' && !this.config.fullScreen) {
    var n = obj.prev().data(s);

    if (n === 'auto') {
      obj.style(s, obj.prev().style(s));
    } else {
      obj.style(s, n);
    }
  }
}