import $ from 'easy-dom-util';

let paddingTop = 11;

export function setActiveLineDefTop (t) {
    paddingTop = 11 + t;
    setActiveLineTop.call(this, 0);
}

export function initActiveLine () {
    return $.create('div.code_active_line');
}

export function setActiveLine (index) {
    if (index === 'hide') {
        this.els.activeLine.style('opacity', '0');
        if (this.els.line) {
            let active = this.els.line.query('.j-active')[0];
            if (active) {
                active.rmClass('j-active');
            }
        }
    } else if (index === 'show') {
        this.els.activeLine.style('opacity', '1');
    } else {
        var top = index * this.mark.lineHeight;
        this.els.activeLine.style('transform', 'translate(0,' + top + 'px)');
        this.els.activeLine.style('-webkit-transform', '-webkit-translate(0,' + top + 'px)');
        if (this.els.line && this.els.line.el.children.length > 0) {
            let active = this.els.line.query('.j-active')[0];
            if (active) {
                active.rmClass('j-active');
            }
            this.els.line.child(index).addClass('j-active');
        }
    }
}

export function activeLine () {
    var line = _getCurLine(this.els.codearea.el);
    setActiveLine.call(this, line);
}

function _getCurLine (obj) {
    var v = obj.value;
    // 开始到光标位置的内容
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
    }
    // 获取当前是几行
    var cl = cv.split('\n').length - 1;
    // console.log(cl);
    return cl;
}

export function setActiveLineHeight () {
    this.el.child(0).style('height', this.mark.lineHeight + 'px'); // activeLine
}


export function setActiveLineTop (top) {
    this.els.activeLine.style('top', (top + paddingTop) + 'px');
}