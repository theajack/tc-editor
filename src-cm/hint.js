import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint';

import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/show-hint.css';

var orig = CodeMirror.hint.javascript;
CodeMirror.hint.javascript = function (cm) {
    // debugger;
    var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
    let word = cm.getLine(inner.from.line).substring(inner.from.ch, inner.to.ch);
    inner.list.sort();
    if (word !== '') {
        inner.list = inner.list.map((text) => {
            return {
                text,
                render (el, data, cur) {
                    el.innerHTML = cur.text.replace(new RegExp(word, 'g'), `<span class='hint-char'>${word}</span>`);
                }
            };
        });
    }
    return inner;
};