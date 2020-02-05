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
    if (h == 'auto') {
        this.els.view1.style('height', h);
        this.els.view2.style('height', h);
        this.els.codearea.data('height', 'auto');
        this.els.codearea.style('overflow-y', 'hidden').style('height', h);
    } else {
        [this.els.view1, this.els.view2, this.els.codearea].forEach(each => {
            each.style('height', '100%');
        });
    }
    if (w == 'auto') {
        this.els.view1.style('width', h);
        this.els.view2.style('width', h);
        this.els.codearea.data('width', 'auto').style({
            'overflow-x': 'hidden',
            'width': w
        });
    } else {
        this.els.view1.style('width', '100%');
        this.els.view2.style('width', '100%');
        this.els.codearea.style('width', '100%');
    }
}