const path = require('path');
const { Buffer } = require('buffer');
const through2 = require('through2');
const gulp = require('gulp');
const merge2 = require('merge2');
const gulpBabel = require('gulp-babel');
const gulpTS = require('gulp-typescript');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');
const del = require('del');
const getBabelConfig = require('./getBabelConfig');

gulp.task('cleanLib', function cleanLib() {
    return del(['lib/**/*']);
});

function compileTSX(isESM) {
  const jsStream = gulp.src(['lib/**/*.js'])
    .pipe(replace(/(require\(['"])([^'"]+)(\.scss)(['"]\))/g, '$1$2.css$4'))
    .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/, '$1\'$2.css\''))
    .pipe(replace(/(import\s+)['"]@douyinfe\/semi-foundation\/([^'"]+)(\.css)['"]/, '$1\'@douyinfe/semi-foundation/lib/$2.css\''))
    .pipe(gulp.dest('lib'));

  return merge2([jsStream]);
}

gulp.task('compileTSXForESM', function compileTSXForESM() {
    return compileTSX(true);
});

gulp.task('compileTSXForCJS', function compileTSXForCJS() {
    return compileTSX(false);
});

gulp.task('compileScss', function compileScss() {
    return gulp.src(['src/icons/**/*.scss'])
        .pipe(through2.obj(
            function (chunk, enc, cb) {
                let rootPath = path.join(__dirname, '../../');
                rootPath = rootPath.replaceAll('\\','/')
                const scssVarStr = `@import "${rootPath}node_modules/@douyinfe/semi-theme-default/scss/index.scss";\n`;
                const scssBuffer = Buffer.from(scssVarStr);
                const buffers = [scssBuffer];
                chunk.contents = Buffer.concat([...buffers, chunk.contents]);
                cb(null, chunk);
            }
        ))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('lib'))
});

gulp.task('moveScss', function moveScss() {
    return gulp.src(['src/icons/**/*.scss'])
        .pipe(gulp.dest('lib'))
});

gulp.task('compileLib', gulp.series(['compileScss', 'moveScss', gulp.parallel('compileTSXForESM')]));
