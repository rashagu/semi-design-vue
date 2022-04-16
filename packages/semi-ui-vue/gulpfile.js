const path = require('path');
const {Buffer} = require('buffer');
const through2 = require('through2');
const gulp = require('gulp');
const merge2 = require('merge2');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');
const del = require('del');

gulp.task('cleanLib', function cleanLib() {
  return del(['lib/**/*']);
});

function compileTSX(isESM) {
  const jsStream = gulp.src(['lib/**/*.js','lib/**/*.d.ts'])
    .pipe(replace(/(import\s+)['"]@douyinfe\/semi-foundation\/([^'"]+)['"]/g, '$1\'@douyinfe/semi-foundation/lib/es/$2\''))
    .pipe(replace(/((?:import|export)\s+.+from\s+)['"]@douyinfe\/semi-foundation\/([^'"]+)['"]/g, '$1\'@douyinfe/semi-foundation/lib/es/$2\''))
    .pipe(replace(/(import\(['"])@douyinfe\/semi-foundation\/(.+)/g, '$1@douyinfe/semi-foundation/lib/es/$2'))
    .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
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
  return gulp.src(['src/components/**/*.scss'])
    .pipe(through2.obj(
      function (chunk, enc, cb) {
        let rootPath = path.join(__dirname, '../../');
        rootPath = rootPath.replaceAll('\\', '/')
        const scssVarStr = `@import "${rootPath}node_modules/@douyinfe/semi-theme-default/scss/index.scss";\n`;
        const cssVarStr = `@import "${rootPath}node_modules/@douyinfe/semi-theme-default/scss/global.scss";\n`;
        const scssBuffer = Buffer.from(scssVarStr);
        const buffers = [scssBuffer];
        if (/_base\/base\.scss/.test(chunk.path) || /_base\\base\.scss/.test(chunk.path) || /base\/base\.scss/.test(chunk.path) || /base\\base\.scss/.test(chunk.path)) {
          buffers.push(Buffer.from(cssVarStr));
        }
        chunk.contents = Buffer.concat([...buffers, chunk.contents]);
        cb(null, chunk);
      }
    ))
    .pipe(sass({
      importer: (url, prev) => {
        let rootPath = path.join(__dirname, '../../');
        rootPath = rootPath.replaceAll('\\', '/')
        let realUrl = url;
        if (/~@douyinfe\/semi-foundation/.test(url)) {
          const semiUIPath = path.join(rootPath, 'packages/semi-foundation');
          realUrl = url.replace(/~@douyinfe\/semi-foundation/, semiUIPath);
        }
        return {url: realUrl};
      },
      charset: false
    }).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('lib'))
});

gulp.task('moveScss', function moveScss() {
  return gulp.src(['src/components/**/*.scss'])
    .pipe(gulp.dest('lib'))
});

gulp.task('compileLib', gulp.series(['compileScss', 'moveScss', gulp.parallel('compileTSXForESM')]));
