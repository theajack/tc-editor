import {replaceWithArray} from './util';
export function renderHTML (val) {
    var html = val.replace(/</g, '&lt;').replace(/>/g, '&gt;') + ' ';// 为了不让最后一个字符是换行
    html = _geneHtmlNote(html);
    html = _geneHtmlElement(html);
    html = _geneHtmlContent(html);
    html = _geneString(html);
    return html;
}
function _geneHtmlElement (html) {
    return _geneCommon(html, /(&lt;)((.|\n)*?)(&gt;)/g, 'cd_tag', 'html');
}
function _geneHtmlContent (html) {
    return html.replace(/<\/cd_tag>(.|\n)*?<cd_tag>/g, function (str) {
        let tag = html.substr(html.indexOf(str) + str.length + 63, 6);
        if (tag.indexOf('script') !== 0 && tag.indexOf('style') !== 0) {
            if (!str.match(/cd_tag>( |\n)*<cd_tag/i) && str.indexOf('cd_note>') === -1) {
                return str.replace('cd_tag>', 'cd_tag><cd_html_c>').replace('<cd_tag', '</cd_html_c><cd_tag');
            }
        }
        return str;
    });
}
function _geneString (html) {
    return _geneCommon(html, /((")(.*?)("))|((')(.*?)('))/g, 'cd_str');
}
function _geneHtmlNote (html) {
    return _geneCommon(html, /(&lt;!--)((.|\n)*?)(--&gt;)/g, 'cd_note');
}
function _geneCommon (html, reg, tag, type) {
    var arr = html.match(reg);
    if (arr != null) {
        arr.forEach((a, i) => {
            if (type === 'html') {
                a = _geneCommon(a, /(&lt;)|(&gt;)|(\/)/g, 'cd_attr_punc');
                a = _geneCommon(a, /( |\n)(\S*?)(=)/g, 'cd_attr', 'attr');
            }
            if (type === 'attr') {
                a = a.replace('=', '<cd_attr_equal>=</cd_attr_equal>');
            }
            arr[i] = '<' + tag + '>' + a + '</' + tag + '>';
        });
        html = replaceWithArray(html, reg, arr);
    }
    return html;
}