import {LANG_TYPE, REP} from './constant';
import {renderHTML} from './html';
import {renderJS} from './js';
import {renderCSS} from './css';


export default function render (code, languages = [LANG_TYPE.JS]) {
    if (languages.indexOf(LANG_TYPE.HTML) !== -1) {
        code = renderWithHTMLMode(code);
    } else if (languages.indexOf(LANG_TYPE.JS) !== -1) {
        code = renderJS(code);
    } else if (languages.indexOf(LANG_TYPE.CSS) !== -1) {
        code = renderCSS(code);
    }
    return code;
}

function renderWithHTMLMode (code) {
    let jsData = extractCommon(code, 'script');
    code = jsData.code;
    jsData.arr.forEach((item, index) => {
        if (item.trim() !== '') {
            jsData.arr[index] = renderJS(item);
        }
    });
    let cssData = extractCommon(code, 'style');
    code = cssData.code;
    cssData.arr.forEach((item, index) => {
        if (item.trim() !== '') {
            cssData.arr[index] = renderCSS(item);
        }
    });

    let htmlCode = renderHTML(code);
    htmlCode = replaceWithArr(htmlCode, REP.JS, jsData.arr);
    htmlCode = replaceWithArr(htmlCode, REP.CSS, cssData.arr);
    return htmlCode;
}

function replaceWithArr (code, rep, arr) {
    arr.forEach((item) => {
        code = code.replace(rep, item);
    });
    return code;
}

function extractCommon (code, type) {
    let arr = [];
    let rep = (type === 'script') ? REP.JS : REP.CSS;
    let reg = new RegExp(`<${type}(.|\\n)*?>(.|\\n)*?<\\/${type}>`, 'g');
    code = code.replace(reg, (str) => {
        let first = str.indexOf('>') + 1;
        let last = str.lastIndexOf(`</${type}>`);
        let js = str.substring(first, last);
        arr.push(js);
        return str.substring(0, first) + rep + str.substring(last);
    });
    return {code, arr};
}