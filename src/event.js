import keyDown from './key_down';
import {renderHTML, renderJS} from './render';
import {setActiveLine, activeLine, setActiveLineTop} from './activeLine';
import {reinitLine, setLineTop} from './line';

export function initEvent () {
    // this
    let code = this.els.codearea;
    code.on({
        mouseleave: () => {
            // showResult(false);
        },
        keydown: (event) => {
            // _codeChange.call(this, event);
            keyDown.call(code.el, event, this.config.tab);
            if (event.ctrlKey) {
                if (event.keyCode === 187 || event.keyCode === 189) {
                    event.keyCode === 187 ? this.fontSizeUp() : this.fontSizeDown();
                    setActiveLine.call(this, 'hide');
                    event.preventDefault();
                }
            }
        },
        keyup: (e) => {
            var k = e.keyCode;
            if (k == 13 || k == 9) {// 回车和tab键
                geneViewCode.call(this);
            }
            if (
                k === 38 || k === 40 || k === 13 || k === 8 || // 上下 回车 删除
                (e.ctrlKey && (k === 86 || k === 88 || k === 89 || k === 90)) // ctrl + v x y z
            ) {
                activeLine.call(this);
            }
        },
        input: () => {
            geneViewCode.call(this);
        },
        scroll: () => {
            _getView(this.el).forEach(el => {
                el.el.scrollTop = code.el.scrollTop;
                el.el.scrollLeft = code.el.scrollLeft;
            });
            let top = -code.el.scrollTop;
            setLineTop.call(this, top);
            setActiveLineTop.call(this, top);
        },
        click: () => {
            activeLine.call(this);
            setActiveLine.call(this, 'show');
        }, blur: () => {
            setActiveLine.call(this, 'hide');
        }
        // onclick:moveCursor
    });
    // _tabEnable(code);
}
// function _codeChange (e) {
//     // if (this.el.attr('jet-change') === '0') {
//     //     this.el.attr('jet-change', '1');
//     // }
//     if (e.keyCode === 13 || e.keyCode === 9) {
//         geneViewCode.call(this);
//     }
//     // geneViewCode();
// }

export function geneViewCode () {
    var val = this.els.codearea.value();
    var html = renderHTML(val);
    _getView(this.el, 1).html(html);
    var js = renderJS(val);
    _getView(this.el, 0).html(js);
    checkSizeAuto.call(this);
    reinitLine.call(this);
}

function _getView (obj, i) {
    if (i != undefined) {
        return obj.child(i + 1);
    }
    return obj.query('.code_editor_view');
}
export function checkSizeAuto (type = 'all') {
    if (type === 'all' || type === 'height') {
        _checkSizeAutoPart.call(this, 'height');
    }
    if (type === 'all' || type === 'width') {
        _checkSizeAutoPart.call(this, 'width');
    }
}
function _checkSizeAutoPart (s) {
    let obj = this.els.codearea;
    if (obj.data(s) === 'auto' && !this.config.fullScreen) {
        var n = obj.prev().data(s);
        if (n === 'auto') {
            obj.style(s, obj.prev().style(s));
        } else {
            obj.style(s, n);
        }
    }
}
