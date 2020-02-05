import $ from 'easy-dom-util';
import './style';
import {initEvent, geneViewCode} from './event';
import {initButtons} from './buttons';
import {initSize} from './size';
import {initLine, setLineHeight} from './line';
import {initActiveLine, setActiveLineHeight} from './activeLine';
import {copy} from './util';
import version from './version';
var _ce_disabled = 'disabled',
    _ce_full = 'j_full',
    _ce_hidden = 'j_hidden';

class Editor {
    constructor ({
        el,
        code,
        lineIndex = true,
        buttons = 'all',
        fontSize,
        theme = 'dark',
        trim = true,
        disabled = false,
        width = 300,
        height = 200,
        tab = '\t',
        onload,
        onsubmit
    }) {
        this.el = $.query(el);
        this.els = {};
        this.mark = {
            lineHeight: 20,
            fontSize: 16
        };
        this.config = {
            lineIndex,
            buttons,
            fontSize,
            onsubmit,
            theme,
            trim,
            disabled,
            onload,
            width,
            height,
            tab,
            code
        };
        initCodeFrame.call(this);
        if (typeof this.config.fontSize === 'number') {
            this.fontSize(this.config.fontSize);
        }
        if (this.config.onload) {
            this.config.onload.call(this);
        }
    }

    fix () {
        if (this.mark.flag) {
            this.mark.flag = false;
            this.els.view1.style('left', '3px');
            this.els.view2.style('left', '3px');
        } else {
            this.mark.flag = true;
            this.els.view1.style('left', '0px');
            this.els.view2.style('left', '0px');
        }
    }
    changeTheme () {
        this.el.toggleClass('j-c-dark');
    }
    clearCode () {
        if (window.confirm('是否确认清空代码(该操作不可撤销)？')) {
            this.els.view1.empty();
            this.els.view2.empty();
            this.els.codearea.value('').el.focus();
        }
    }
    resetCode () {
        if (window.confirm('是否确认重置代码(该操作不可撤销)？')) {
            var c = this.els.codearea;
            c.value(c.data('code').replace(/&lt;/g, '<').replace(/&gt;/g, '>')).el.focus();
            geneViewCode.call(this);
        }
    }
    copy () {
        if (copy(this.text())) {
            alert('复制成功');
        } else {
            this.els.codearea.select();
            alert('您的浏览器不支持该方法。请按Ctrl+V手动复制');
        }
    }
    fullScreen () {
        this.el.toggleClass(_ce_full);
        $.query('body').toggleClass(_ce_hidden);
    }

    fontSize (size) {
        var par = this.el;
        if (size !== undefined) {
            par.style({
                'font-size': size + 'px',
                'line-height': (size + 4) + 'px'
            });
            countLineHeight.call(this, par.query('._bottom')[0], (lineHeight) => {
                this.mark.lineHeight = lineHeight;
                if (this.config.height === 'auto') {
                    geneViewCode.call(this);
                }
                par.style({
                    'line-height': this.mark.lineHeight + 'px'
                });
                setLineHeight.call(this);
                setActiveLineHeight.call(this);
            });
        } else {
            var fs = par.style('font-size');
            return parseInt(fs.substring(0, fs.length - 2));
        }
    }
    fontSizeUp () {
        var n = this.fontSize();
        if (n < 35) {
            this.fontSize(n + 1);
        } else {
            alert('已达到最大大小(35px)');
        }
    }
    fontSizeDown () {
        var n = this.fontSize();
        if (n > 12) {
            this.fontSize(n - 1);
        } else {
            alert('已达到最小大小(12px)');
        }
    }
    submit () {
        if (typeof this.config.onsubmit === 'function')
            this.config.onsubmit.call(this, this.text());
    }
    text (text) {
        var c = this.els.codearea;
        if (typeof text == 'undefined') {
            return c.value();
        } else {
            c.value(text).el.focus();
            geneViewCode.call(this);
        }
    }
    disable (disabled = true) {
        if (disabled) {
            this.el.attr('disabled', 'true');
        } else {
            this.el.rmAttr('disable');
        }
    }
}

function initCodeFrame () {
    let item = this.el;
    this.el.addClass('j-code');
    if (this.config.theme === 'dark') {
        item.addClass('j-c-dark');
    }
    var code = (this.config.code) ? this.config.code : this.el.html();
    if (this.config.trim === true) {
        while (code[0] == '\n') {
            code = code.substr(1);
        }
        code = code.replace(/(\s*$)/g, '');
    }
    this.els.activeLine = initActiveLine();
    this.els.view1 = $.create('pre.code_editor_view._bottom').html(code);
    this.els.view2 = $.create('pre.code_editor_view').html(code);
    this.els.codearea = $.create('textarea.code_editor[spellcheck=false]').html(code);
    this.els.codearea.data('code', code);
    if (this.config.disable) {
        this.els.codearea.attr(_ce_disabled, _ce_disabled).style('cursor', 'no-drop');
    }
    item.empty().append(this.els.activeLine, this.els.view1, this.els.view2, this.els.codearea);
        
    initSize.call(this);
    initLine.call(this);
    initButtons.call(this);
    if (code !== '') {
        geneViewCode.call(this);
    }
    if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
        this.els.view1.style('left', '3px');
        this.els.view2.style('left', '3px');
    }
    initEvent.call(this);
}

function countLineHeight (el, cb) {
    el.style('height', 'auto');
    setTimeout(() => {
        var length = 100, strLine = '';
        for (var i = 0; i < length; i++) {strLine += '1\n';}
        var content = el.html();
        el.html(strLine);
        var padding = el.style('padding').replace(/px/g, '').split(' ');
        var lineHeight = (el.el.offsetHeight - (parseInt(padding[0])) - (parseInt(padding[2]))) / length; // 50是padding
        el.html(content);
        el.style('height', this.config.height + ((typeof this.config.height === 'number') ? 'px' : ''));
        cb(lineHeight);
    }, 10);
}

Editor.version = version;

export default Editor;