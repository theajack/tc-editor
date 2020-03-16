const gulp = require('gulp');
const rename = require('gulp-rename');
const fs = require('fs');
const babel = require('gulp-babel');
let version = require('../package.json').version;
let files = [
    '../npm/package.json',
];

function modVersion () {
    files.forEach(file => {
        let pkg = require(file);
        pkg.version = version;
        fs.writeFile(file.substr(1), JSON.stringify(pkg, null, 4), 'utf8', (err) => {
            if (err) throw err;
        });
    });
}

function task () {
    modVersion();
    copyToNPM();
    copyLatest();
    transEs6ByBabel();
}

function copyToNPM () {
    gulp.src(['src/index.d.ts', 'README.md', 'LICENSE'])
        .pipe(gulp.dest('npm'));
}
function copyLatest () {
    gulp.src(`dist/*.${version}.min.js`)
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(version, 'latest');
            return path;
        }))
        .pipe(gulp.dest('dist'));
}
function transEs6ByBabel () {
    gulp.src('src/**/*.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('npm').on('finish', () => {
            zipCss();
        }));
}

function zipCss () {
    let file = './npm/style.js';
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        // let reg = new RegExp('function initStyle() {(.|\\r\\n)*?}', 'g');
        let reg = new RegExp('function initStyle\\(\\) {[\\s\\S]*}', 'g');
        let array = data.match(reg);
        if (array === null) {
            return;
        }
        array.forEach(css => {
            data = data.replace(css, css.replace(new RegExp('\\\\n *', 'g'), '').replace(new RegExp(' *\\{', 'g'), '{'));
        });
        fs.writeFile(file, data, 'utf8', (err) => {
            if (err) throw err;
        });
    });
}

task();