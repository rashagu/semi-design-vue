const {build} = require('vite')
const fg = require('fast-glob')
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const path = require("path");
const gulp = require("gulp");
const fs = require("fs");



gulp.task('buildSS', async function moveScss() {
  // 获取默认为项目根目录下 src 文件夹包括子文件夹的所有 js、ts、jsx、tsx、vue、sevele 文件路径，除开 .test.*、.spec.* 和 .d.ts 三种后缀名的文件
// 返回格式为 ['src/**/*.ts', 'src/**/*.tsx']
  const srcFilePaths = fg.sync([`lib/**/*.js`], {
    ignore: [`**/*.spec.*`, '**/*.test.*', '**/*.d.ts', '**/__tests__/**'],
  });
  await Promise.all(srcFilePaths.map(item=>{
    const pathSS = path.resolve(__dirname, item)
    const outDir = item.split('/')
    const filename = outDir.splice(outDir.length-1, 1)
    return build({
      mode: 'production',
      configFile: false,
      logLevel: 'error',
      build:{
        outDir: outDir.join('/').replaceAll('lib','dist'),
        lib: {
          entry: pathSS,
          formats: ['es'],
          // the proper extensions will be added
          fileName: filename[0].split('.')[0]
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: (source, importer, isResolved)=>{
            return source.replaceAll('/').replaceAll('\\') !== pathSS.replaceAll('/').replaceAll('\\')
          },
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue'
            }
          }
        },
      },
      plugins: [
        vue(),

        // @ts-ignore
        vueJsx({
          // options are passed on to @vue/babel-plugin-jsx
        }),
      ],
    })
  }))
  // fs.copyFileSync(path.resolve(__dirname, 'lib/_base/base.css'), './dist/_base/base.css');
});



gulp.task('moveScss2', function moveScss() {
  return gulp.src(['lib/**/*.css'])
    .pipe(gulp.dest('dist'))
});

gulp.task('compileBuild', gulp.series(['buildSS', 'moveScss2']));


const taskInstance = gulp.task('compileBuild');
if (taskInstance === undefined) {
  console.error('no task named compileLib registered');
  return;
}
taskInstance.apply(gulp);
