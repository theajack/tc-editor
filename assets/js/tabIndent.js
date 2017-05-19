var tabIndent = {
	version: '0.1.8',
	config: {
		tab: '\t'
	},
	events: {
		keydown: function(e) {
			var a = tabIndent.config.tab;
			var b = a.length;
			if (e.keyCode === 9) {
				e.preventDefault();
				var c = this.selectionStart,
					currentEnd = this.selectionEnd;
				if (e.shiftKey === false) {
					if (!tabIndent.isMultiLine(this)) {
						this.value = this.value.slice(0, c) + a + this.value.slice(c);
						this.selectionStart = c + b;
						this.selectionEnd = currentEnd + b
					} else {
						var d = tabIndent.findStartIndices(this),
							l = d.length,
							newStart = undefined,
							newEnd = undefined,
							affectedRows = 0;
						while (l--) {
							var f = d[l];
							if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
							if (f >= c && d[l] < currentEnd) {
								this.value = this.value.slice(0, d[l]) + a + this.value.slice(d[l]);
								newStart = d[l];
								if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end');
								affectedRows++
							}
						}
						this.selectionStart = newStart;
						this.selectionEnd = (newEnd !== 'end' ? newEnd + (b * affectedRows) : this.value.length)
					}
				} else {
					if (!tabIndent.isMultiLine(this)) {
						if (this.value.substr(c - b, b) == a) {
							this.value = this.value.substr(0, c - b) + this.value.substr(c);
							this.selectionStart = c - b;
							this.selectionEnd = currentEnd - b
						} else if (this.value.substr(c - 1, 1) == "\n" && this.value.substr(c, b) == a) {
							this.value = this.value.substring(0, c) + this.value.substr(c + b);
							this.selectionStart = c;
							this.selectionEnd = currentEnd - b
						}
					} else {
						var d = tabIndent.findStartIndices(this),
							l = d.length,
							newStart = undefined,
							newEnd = undefined,
							affectedRows = 0;
						while (l--) {
							var f = d[l];
							if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
							if (f >= c && d[l] < currentEnd) {
								if (this.value.substr(d[l], b) == a) {
									this.value = this.value.slice(0, d[l]) + this.value.slice(d[l] + b);
									affectedRows++
								} else {}
								newStart = d[l];
								if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end')
							}
						}
						this.selectionStart = newStart;
						this.selectionEnd = (newEnd !== 'end' ? newEnd - (affectedRows * b) : this.value.length)
					}
				}
			} else if (e.keyCode === 27) {
				tabIndent.events.disable(e)
			} else if (e.keyCode === 13 && e.shiftKey === false) {
				var g = tabIndent,
					cursorPos = this.selectionStart,
					d = g.findStartIndices(this),
					numStartIndices = d.length,
					startIndex = 0,
					endIndex = 0,
					tabMatch = new RegExp("^" + a.replace('\t', '\\t').replace(/ /g, '\\s') + "+", 'g'),
					lineText = '';
				tabs = null;
				for (var x = 0; x < numStartIndices; x++) {
					if (d[x + 1] && (cursorPos >= d[x]) && (cursorPos < d[x + 1])) {
						startIndex = d[x];
						endIndex = d[x + 1] - 1;
						break
					} else {
						startIndex = d[numStartIndices - 1];
						endIndex = this.value.length
					}
				}
				lineText = this.value.slice(startIndex, endIndex);
				tabs = lineText.match(tabMatch);
				if (tabs !== null) {
					e.preventDefault();
					var h = tabs[0];
					var i = h.length;
					var j = cursorPos - startIndex;
					if (i > j) {
						i = j;
						h = h.slice(0, j)
					}
					this.value = this.value.slice(0, cursorPos) + "\n" + h + this.value.slice(cursorPos);
					this.selectionStart = cursorPos + i + 1;
					this.selectionEnd = this.selectionStart
				}
			}
		},
		disable: function(e) {
			var a = this;
			tabIndent.remove(e.target)
		},
		focus: function() {
			var c = tabIndent,
				el = this,
				delayedRefocus = setTimeout(function() {
					var a = (el.getAttribute('class') || '').split(' '),
						contains = a.indexOf('tabIndent');
					el.addEventListener('keydown', c.events.keydown);
					el.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAKZSURBVEjH7ZRfSFNRHMe/9+/+3G26tUn+ycywgURgUBAUJlIhWlEQEjN8yQcfolKJxJAefOjRCnT0IPYQ9iRa9FAYJiaUVP4twf7gzJzpnDbdzHt3z+3Fua3dO4Ne/f5ezjmc8+F7zvmeA2zrv0VFGlexAssFw1mG1pqqUL8npGY60Bw3ykYaOVjlrFXmEyw0AQj6g53UONQBO8DBzuiT2tUx+gR/mwACBQpIUoACBZoAZaOSiWwFIFs4oMMS9/boZVF8T8vtkbEofatiRKF9mXK6M7tTyyxRaPwWtJezIu9+9cNzxHk/n9938rz6IWpvgRdZd5/HcsvC9jadqk6Z0qkBiCaAF3UtX8cy6h1mwlnLhsuZuRvqABlyNJqb0q0ZWsb7uUVHlXAahWl1y3M2tVuQVR1Q0Pl0dwZ67KbZtGnX/ma++/FsCCY1ANlAxIuT2NZP3XB/GRKc9qKhKTYnd4auJbIqINEBDa5zoWWByoS1jocR+loKpKGJKqBLybN/OQN2Tmodv4jCtYIMYurnP5sLf+V5XK4DbFv4haaDCEABA/J88GdegD1I2+heY0Xj7M1itiMjP8srzutjXMbkIDZKCrAcfGOt8LwODimYnzzjLcHIx5VFwPekZrhVPYmxyVNAvZP8KV28SykClo6XF4/t9LpC2TTIteulJepJjD5nCjL8E56sMHt40NYYqE51ZnZIfmGXYBC68p/6v6UkApSI8Y2ejPVKhyE0PdLDPcg+Z003G0W7YUmmvo/WtjXgbiKAAQNGpjYRDOwWILx3dV16ZBsx3QsdYi4JNUw6uCvMbrUcWFAvPWznfH9/GQHR5xAbPuTumRFWvS+ZwDGyJFfidkxWk2oaIfTRk8RI0YqMAQBAL7YVrz/iUDx4QII4/QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0xMi0wMVQwMDowNjo0My0wNTowMLKpTWYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMTItMDFUMDA6MDY6NDMtMDU6MDDD9PXaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==)";
					el.style.backgroundPosition = 'top right';
					el.style.backgroundRepeat = 'no-repeat';
					if (contains !== -1) a.splice(contains, 1);
					a.push('tabIndent-rendered');
					el.setAttribute('class', a.join(' '));
					el.removeEventListener('focus', c.events.keydown)
				}, 500);
			el.addEventListener('blur', function b() {
				clearTimeout(delayedRefocus);
				el.removeEventListener('blur', b)
			})
		}
	},
	render: function(a) {
		var c = this;
		if (a.nodeName === 'TEXTAREA') {
			a.addEventListener('focus', c.events.focus);
			a.addEventListener('blur', function b(e) {
				c.events.disable(e)
			})
		}
	},
	renderAll: function() {
		var a = document.getElementsByTagName('textarea'),
			t = a.length,
			contains = -1,
			classes = [],
			el = undefined;
		while (t--) {
			classes = (a[t].getAttribute('class') || '').split(' ');
			contains = classes.indexOf('tabIndent');
			if (contains !== -1) {
				el = a[t];
				this.render(el)
			}
			contains = -1;
			classes = [];
			el = undefined
		}
	},
	remove: function(a) {
		if (a.nodeName === 'TEXTAREA') {
			var b = (a.getAttribute('class') || '').split(' '),
				contains = b.indexOf('tabIndent-rendered');
			if (contains !== -1) {
				a.removeEventListener('keydown', this.events.keydown);
				a.style.backgroundImage = '';
				b.splice(contains, 1);
				b.push('tabIndent');
				a.setAttribute('class', (b.length > 1 ? b.join(' ') : b[0]))
			}
		}
	},
	removeAll: function() {
		var a = document.getElementsByTagName('textarea'),
			t = a.length,
			contains = -1,
			classes = [],
			el = undefined;
		while (t--) {
			classes = (a[t].getAttribute('class') || '').split(' ');
			contains = classes.indexOf('tabIndent-rendered');
			if (contains !== -1) {
				el = a[t];
				this.remove(el)
			}
			contains = -1;
			classes = [];
			el = undefined
		}
	},
	isMultiLine: function(a) {
		var b = a.value.slice(a.selectionStart, a.selectionEnd),
			nlRegex = new RegExp(/\n/);
		if (nlRegex.test(b)) return true;
		else return false
	},
	findStartIndices: function(a) {
		var b = a.value,
			startIndices = [],
			offset = 0;
		while (b.match(/\n/) && b.match(/\n/).length > 0) {
			offset = (startIndices.length > 0 ? startIndices[startIndices.length - 1] : 0);
			var c = b.search("\n");
			startIndices.push(c + offset + 1);
			b = b.substring(c + 1)
		}
		startIndices.unshift(0);
		return startIndices
	}
};