
module.exports = function loader (source) {
    let reg = new RegExp('\\/\\* *css *\\*\\/ *`(.|\\r\\n)*?`', 'g');
    let array = source.match(reg);
    if (array === null) {
        return source;
    }
    array.forEach(css => {
        source = source.replace(css, css.replace(new RegExp('\\r\\n *', 'g'), '').replace(new RegExp(' *\\{', 'g'), '{'));
    });
    source = source.replace(new RegExp('\\/\\*(.|\\r\\n)*?\\*\\/', 'g'), '');

    return source;
};