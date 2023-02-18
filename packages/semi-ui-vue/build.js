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
  const srcFilePaths = fg.sync([`src/components/**/*.ts`, `src/components/**/*.tsx`], {
    ignore: [`**/*.spec.*`, '**/*.test.*', '**/*.d.ts', '**/__tests__/**', '**/__test__/**'],
  });

  for (let i = 0; i < srcFilePaths.length; i++) {
    const item = srcFilePaths[i]
    const pathSS = path.resolve(__dirname, item)
    const outDir = item.split('/')
    const filename = outDir.splice(outDir.length-1, 1)
    await build({
      mode: 'production',
      configFile: false,
      logLevel: 'error',
      build:{
        outDir: outDir.join('/').replaceAll('src/components','dist'),
        emptyOutDir: false,
        sourcemap: 'hidden',
        lib: {
          entry: pathSS,
          formats: ['es'],
          // the proper extensions will be added
          // fileName: filename[0].split('.')[0]
          fileName: () => {
            return filename[0].split('.')[0] + '.js'
          }
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: (source, importer, isResolved)=>{
            if (source.indexOf('lodash') > -1){
              return false
            }
            return importer !== undefined
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
        vueJsx({
          // options are passed on to @vue/babel-plugin-jsx
        }),
      ],
    })
  }
  // fs.copyFileSync(path.resolve(__dirname, 'lib/_base/base.css'), './dist/_base/base.css');
});




gulp.task('compileBuild', gulp.series(['buildSS']));


const taskInstance = gulp.task('compileBuild');
if (taskInstance === undefined) {
  console.error('no task named compileLib registered');
}
taskInstance.apply(gulp);
