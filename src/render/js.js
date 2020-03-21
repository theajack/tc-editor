
export function renderJS (val) {
    val = val.replace(/\&lt;/g, 'lllltttt').replace(/\&gt;/g, 'ggggtttt');
    return renderColor(val.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
}

var keyword1 = ['var', 'new', 'const', 'let', 'typeof', 'in', 'function', 'this', 'true', 'false', 'null', 'undefined', 'async', 'delete', 'class', 'extends']; // var
var keyword2 = ['return', 'for', 'while', 'else if', 'if', 'else', 'switch', 'case', 'default', 'break', 'continue', 'await', 'yield', 'try', 'catch', 'finally', 'throw', 'export', 'import', 'from']; // return
var keyword3 = ['console', 'window', 'document', 'Date', 'Array', 'Object', 'Boolean', 'Number', 'String', 'alert', 'RegExp', 'Function', 'JSON', 'Date']; // Date
// var sign = ['"', "'", "`", ",", ";", "\\:", "\\.", "\\(", "\\)", "\\{", "\\}", "\\[", "\\]", "\\+", "\\-", "\\*", "\\/", "_", "\\|", "\\", "\\&", "\\%", "\\$", "\\!", "\\<", "\\=", "\\>",  "\\^", "~", "@", "#"];
var sign = ['\\/', '\\', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', '\\+', '\\-', '\\*', '\\=', ',', '\\.', ':', '%', '_', '\\$', '@', '#', '\\^', '\\|', '!', '~'];

var signBegin = '(^|(&lt;)|(&lt;)|[\\n\\t;<> ' + sign.join('') + '])';
var signEnd = '([' + sign.join('') + '\\n;<> ]|(&lt;)|(&lt;)|$)';

// var punc = ''
// var reg = {
//     str:1,
//     comment:1,
//     keyword(){

//     }
// }


function sp (str, cls) {
    return '<span class="j-c-js-' + cls + '">' + str + '</span>';
}

function _replace (str, reg, cls, word) {
    return str.replace(reg, function (s) {
        if (typeof word === 'string') {
            return s.replace(word, sp(word, cls));
        } else if (typeof word === 'object') {
            return s.replace(word, function (s2) {
                return sp(s2, cls);
            });
        }
        return sp(s, cls);
    });
}

function replace (str, reg, cls, word) {
    if (str.indexOf('</span>') !== -1) {
        var _regExp = (typeof reg === 'string') ? regExp(reg) : reg[0];
        str = str.replace(_regExp, function (s1) {
            // 只有字符串
            var _regExp2 = (typeof reg === 'string') ? new RegExp(reg, 'g') : reg[1];
            return _replace(s1, _regExp2, cls, word);
        });
    } else {
        var _regExp = (typeof reg === 'string') ? new RegExp(reg, 'g') : reg[1];
        str = _replace(str, _regExp, cls, word);
    }
    return str;
}

function regExp (reg) {
    return new RegExp(reg + '(?![^<]*>|[^<>]*<\/)', 'g');
}
function renderColor (text) {
    // text = text.replace('\t', '    ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    text = pipe(text, [
        // /("(?:[^"\\]|\.)*")|(`(?:[^"\\]|\.)*`)|('(?:[^"\\]|\.)*')/g
        // ['("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)','str'],// 有bug：需要不包含字符串本身
        [
            [
                /("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)(?![^<]*>|[^<>]*<\/)/g,
                /("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)/g
            ],
            'str'
        ], // 有bug：需要不包含字符串本身
        ['(//.*(\n|$))|(\\/\\*(.|\n)*?\\*\\/)', 'cm'],
        ['\\/[a-zA-Z0-9' + sign.slice(1).join('') + ' ]+\\/[gi]?', 'reg'], // 正则
        [signBegin + '[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]* ?\\(', 'f', new RegExp('[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]*', 'g')],
        // ['\\.[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]* ?\\' + signEnd, 'a', new RegExp('[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]*', 'g')],
        grArr(keyword1, 'k1'),
        grArr(keyword1, 'k1'), // 重复是为了解决相邻同类元素 无法被匹配 比如 function function 只有第一个function被匹配，因为他们共享一个空格
        grArr(keyword2, 'k2'),
        grArr(keyword2, 'k2'),
        grArr(keyword3, 'k3'),
        grArr(keyword3, 'k3'),
        [signBegin + '[0-9]+(\\.?[0-9]+)?' + signEnd, 'num', /[0-9]+(.?[0-9]+)?/g],
        [signBegin + '[0-9]+(\\.?[0-9]+)?' + signEnd, 'num', /[0-9]+(.?[0-9]+)?/g],
        // [signBegin+'[0-9]+'+signEnd,'num',/[0-9]+/g],
        ['[' + sign.join('') + ']', 'punc', new RegExp('[' + sign.join('') + ']', 'g')],
    ]);
    text = text.replace(/\&lt;/g, sp('<', 'punc')).replace(/\&gt;/g, sp('>', 'punc')).replace(/;/g, sp(';', 'punc')).replace(/&/g, sp('&', 'punc'));
    text = text.replace(/lllltttt/g, '&amp;lt;').replace(/ggggtttt/g, '&amp;gt;');
    return text;
}

// var signEnd = '[ \\(\\.\\n]';

function grArr (array, cls) {
    return [signBegin + '((' + array.join(')|(') + '))' + signEnd, cls, new RegExp('((' + array.join(')|(') + '))', 'g')];
}

function pipe (text, array) {
    for (var i = 0; i < array.length; i++) {
        array[i].unshift(text);
        text = replace.apply(null, array[i]);
    }
    return text;
}