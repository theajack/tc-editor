const STATUS = {
    MOD: 'mod',
    DEL: 'del',
    ADD: 'add'
};

const MTI_TYPE = { // 多行类型
    HTML_TAG: 'html_tag',
    HTML_CM: 'html_cm',
    JS_CM: 'html_cm',
    ES6_STR: 'es6_str',
};

const MTI_POS = {
    HEAD: 'head',
    BODY: 'body',
    FOOT: 'foot'
};

const CODE_TYPE = {
    HTML: 'html',
    CSS: 'css',
    JS: 'js'
};

export let CodeUtil = {
    getLines (code) {
        
        return [{
            type: CODE_TYPE.CSS,
            startLine: 0,
            endLine: 3,
            startIndex: 2, // head
            endIndex: 5, // tail
        }];
    },
    countLines (code) {
        let arr = [];
        let reg = /<( ?)*(script|style)(.|\n)*?>(.|\n)*?<\/( ?)*(script|style)( ?)*>/g;
        let res = code.match(reg);
        if (!res) {
            return arr;
        }
        arr.forEach((item) => {
            let headTag = item.match(/<( ?)*(script|style)(.|\n)*?>/i)[0];
            let type = (/<( ?)*script/.test(headTag)) ? CODE_TYPE.JS : CODE_TYPE.JS;
            if (type === CODE_TYPE.JS) {
                if (/ src( ?)*=/.test(headTag)) {
                    return;
                }
                arr.push(this.extractData(code, ));
            } else {
                
            }
        });
        code = code.replace(reg, (str) => {
            let first = str.indexOf('>') + 1;
            let last = str.lastIndexOf(`</${type}>`);
            let js = str.substring(first, last);
            arr.push(js);
            return str.substring(0, first) + rep + str.substring(last);
        });
        return {code, arr};
    },
    extractData (code, piece) {
        
    }
};

export class CoderRender {
    constructor ({
        code = '',
        view = null,
        language = CODE_TYPE.HTML
    }) {
        this.language = language;
        this.code = code;
        this.view = view;
        this.codes = null;// 代码行数组
        this.doms = null;// dom数组
        this._initCode();
    }
    rerender () {
        this.codes = [];
        this.doms = [];
        this._initCode();
    }
    setCode (code) {
        let changes = this._diff(code);
        this._patch(changes);
    }
    _initCode () {
        this.code.split('\n').forEach((code, index) => {
            this.codes.push(this._buildSingleLine(code, index));
        });

    }
    _buildSingleLine (code, index) {
        
    }

    _diff () {

        return [
            {
                index: 0,
                type: STATUS.MOD,
                codeType: 'html'
            }
        ];
    }
    _patch () {

    }
    _renderSingleLine ({
        index
    }) {
        
    }
}