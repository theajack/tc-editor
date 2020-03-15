
export function replaceWithArray (text, reg, array) {
    let rep = '___REP___';
    text = text.replace(reg, rep);
    array.forEach(a => {
        text = text.replace(rep, a);
    });
    return text;
}