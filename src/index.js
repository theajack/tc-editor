import $ from 'easy-dom-util';
import './style';
import {initEvent, geneViewCode, checkSizeAuto} from './event';
import {initButtons} from './buttons';
import {initSize} from './size';
import {initLine, setLineHeight} from './line';
import {initActiveLine, setActiveLineHeight} from './activeLine';
import {copy} from './util';
import version from './version';
// import render from './render/index';
// document.getElementById('app').innerHTML = render(`<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     <style>
//         .aa{}
//     </style>

//     <script>
//         export function renderJS (val) {
//             if (html) {
//                 val = val.replace(/</g, '&lt;').replace(/>/g, '&gt;') + ' ';
//                 return val.replace(/&lt;script&gt;(.|\n)*?&lt;\/script&gt;/g, function (str) {
//                     // console.log(str);
//                     return (str.substring(0, str.indexOf('&gt;') + 4) +
//                     renderColor(str.substring(str.indexOf('&gt;') + 4, str.lastIndexOf('&lt;/') - 1)) +
//                     str.substring(str.lastIndexOf('&lt;/') - 1));
//                 });
//             }
//             return renderColor(val.replace(/</g, '&lt;').replace(/>/g, '&gt;') + ' ');
//         }
//     </script>
//     <script src='aaa'>aa</script>
//     <script src="aaa"></script>
// </body>
// </html>`, ['html', 'js']);
class Editor {
    constructor ({
        el,
        code,
        lineIndex = true,
        buttons = 'all',
        fontSize = 16,
        theme = 'dark',
        trim = true,
        disabled = false,
        width = 300,
        height = 200,
        tab = '\t',
        onload,
        onsubmit,
        fullScreen = false
    }) {
        this.el = $.query(el).style('opacity', '0');
        this.els = {};
        this._mark = {
            lineHeight: 20
        };
        this.config = {
            el,
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
            code,
            fullScreen
        };
        initCodeFrame.call(this);
        this.fontSize(this.config.fontSize);
        if (this.config.onload) {
            this.config.onload.call(this);
        }
        this.el.style('opacity', '1');
    }
    changeTheme (theme) {
        if (typeof theme === 'undefined') {
            theme = this.el.hasClass('j-c-dark') ? 'normal' : 'dark';
        }
        this.el[(theme === 'dark') ? 'addClass' : 'rmClass']('j-c-dark');
        this.config.theme = theme;
        return theme;
    }
    clearCode () {
        if (window.confirm('是否确认清空代码(该操作不可撤销)？')) {
            this.els.bottomView.empty();
            this.els.topView.empty();
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
        if (copy(this.code())) {
            alert('复制成功');
            return true;
        } else {
            this.els.codearea.select();
            alert('您的浏览器不支持该方法。请按Ctrl+V手动复制');
            return false;
        }
    }
    fullScreen (fullScreen) {
        var _ce_full = 'j_full',
            _ce_hidden = 'j_hidden';
        if (typeof fullScreen === 'undefined') {
            fullScreen = !this.el.hasClass(_ce_full);
        }
        this.config.fullScreen = fullScreen;
        if (fullScreen) {
            this.el.addClass(_ce_full);
            $.query('body').addClass(_ce_hidden);
        } else {
            this.el.rmClass(_ce_full);
            $.query('body').rmClass(_ce_hidden);
            checkSizeAuto.call(this);
        }
        return fullScreen;
    }

    fontSize (size) {
        var par = this.el;
        if (size !== undefined) {
            par.style({
                'font-size': size + 'px',
                'line-height': (size + 4) + 'px'
            });
            countLineHeight.call(this, this.els.bottomView, (lineHeight) => {
                this._mark.lineHeight = lineHeight;
                if (this.config.height === 'auto' || this.config.width === 'auto') {
                    geneViewCode.call(this);
                }
                par.style({
                    'line-height': this._mark.lineHeight + 'px'
                });
                setLineHeight.call(this);
                setActiveLineHeight.call(this);
            });
            this.config.fontSize = size;
            return size;
        } else {
            var fs = par.style('font-size');
            return parseInt(fs.substring(0, fs.length - 2));
        }
    }
    fontSizeUp () {
        var n = this.fontSize();
        if (n < 35) {
            return this.fontSize(n + 1);
        }
        alert('已达到最大大小(35px)');
        return n;
    }
    fontSizeDown () {
        var n = this.fontSize();
        if (n > 12) {
            return this.fontSize(n - 1);
        }
        alert('已达到最小大小(12px)');
        return n;
    }
    submit () {
        if (typeof this.config.onsubmit === 'function')
            this.config.onsubmit.call(this, this.code());
    }
    code (code) {
        var c = this.els.codearea;
        if (typeof code == 'undefined') {
            return c.value();
        } else {
            c.value(code).el.focus();
            geneViewCode.call(this);
        }
    }
    disable (disabled) {
        if (typeof disabled === 'undefined') {
            disabled = this.els.codearea.attr('disabled') === 'true';
        }
        if (disabled) {
            this.els.codearea.attr('disabled', 'true');
        } else {
            this.els.codearea.rmAttr('disabled');
        }
        this.config.disabled = disabled;
        return disabled;
    }
}

function initCodeFrame () {
    let item = this.el;
    this.el.addClass('j-code');
    var code = (this.config.code) ? this.config.code : this.el.html();
    if (this.config.trim === true) {
        while (code[0] == '\n') {
            code = code.substr(1);
        }
        code = code.replace(/(\s*$)/g, '');
    }
    this.els.activeLine = initActiveLine();
    this.els.bottomView = $.create('pre.code_editor_view._bottom').html(code);
    this.els.topView = $.create('pre.code_editor_view').html(code);
    this.els.codearea = $.create('textarea.code_editor[spellcheck=false]').html(code);
    this.els.codearea.data('code', code);

    if (this.config.disabled) {this.disable(true);}
    if (this.config.fullScreen) {this.fullScreen(true);}
    if (this.config.theme === 'dark') {this.changeTheme('dark');}

    item.empty().append(this.els.activeLine, this.els.bottomView, this.els.topView, this.els.codearea);
        
    initSize.call(this);
    initLine.call(this);
    initButtons.call(this);
    if (code !== '') {
        geneViewCode.call(this);
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
        if (padding.length === 1) {padding[2] = padding[0];}
        var lineHeight = (el.el.offsetHeight - (parseInt(padding[0])) - (parseInt(padding[2]))) / length; // 50是padding
        el.html(content);
        el.style('height', el.data('height'));
        cb(lineHeight);
    }, 10);
}

Editor.version = version;
Editor.tool = $;
Editor.create = (config) => {
    return new Editor(config);
};

export default Editor;