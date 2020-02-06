import {checkSizeAuto} from './event';

export function initSize () {
    let item = this.el;
    let w = this.config.width;
    let h = this.config.height;
    if (typeof w === 'number') {w += 'px';}
    if (typeof h === 'number') {h += 'px';}
    item.style({
        width: w,
        height: h
    });
    if (h === 'auto') {
        this.els.bottomView.data('height', h).style('height', h);
        this.els.topView.data('height', h).style('height', h);
        this.els.codearea.data('height', h).style({
            'overflow-y': 'hidden',
            'height': h
        });
        checkSizeAuto.call(this, 'height');
    } else {
        [
            this.els.bottomView.data('height', '100%'),
            this.els.topView,
            this.els.codearea
        ].forEach(each => {
            each.style('height', '100%');
        });
    }
    window.checkSizeAuto = checkSizeAuto;
    window._this = this;
    if (w === 'auto') {
        this.els.bottomView.style('width', w);
        this.els.topView.data('width', w).style('width', w);
        this.els.codearea.data('width', 'auto').style({
            'overflow-x': 'hidden',
            'width': w
        });
        checkSizeAuto.call(this, 'width');
    } else {
        this.els.bottomView.style('width', '100%');
        this.els.topView.style('width', '100%');
        this.els.codearea.style('width', '100%');
    }
}