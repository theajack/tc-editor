import $ from 'easy-dom-util';

export function checkFunction (a) {
    if (a == undefined) {
        return function () {};
    } else {
        var b = typeof a;
        if (b == 'function') {
            return a;
        } else if (b == 'string') {
            return new Function(a);
        } else {
            return function () {};
        }
    }
}

export function fixNum (d) { return (d < 10) ? '0' + d : d; };

export function copy (b) {
    var a = $.query('#j_c_copy');
    if (a === null) {
        a = $.create('textarea#j_c_copy');
        $.query('body').append(a);
    }
    a.value(b).el.select();
    if (document.execCommand('Copy')) {
        return true;
    } else {
        alert('Copy is not supported in your browser');
        return false;
    }
};

export function replaceWithArray (text, reg, array) {
    let rep = '___REP___';
    text = text.replace(reg, rep);
    array.forEach(a => {
        text = text.replace(rep, a);
    });
    return text;
}

// export function scrollTo (dom, a, b, c = 400) {
//     scrollBase(dom, 'scrollTop', a, b, c);
// }

// export function scrollXTo (dom, a, b, c = 400) {
//     scrollBase(dom, 'scrollLeft', a, b, c);
// }

// function scrollBase (dom, attr, a, b, c = 400) {
//     var n = 0;
//     var f = c / 10;
//     var g = c / f;
//     var d = dom[attr];
//     var h = setInterval(function () {
//         d += g;
//         dom[attr] = Math.round(d);
//         n++;
//         if (n === f) {
//             dom[attr] = a;
//             checkFunction(b)();
//             clearTimeout(h);
//         }
//     }, 10);
// }