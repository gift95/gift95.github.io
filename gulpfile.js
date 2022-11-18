const gulp = require("gulp")
//用到的各个插件
const htmlMin = require('gulp-html-minifier-terser')
const htmlClean = require('gulp-htmlclean')
const terser = require('gulp-terser')
const cssnano = require('gulp-cssnano')
const fontmin = require('gulp-fontmin')

// 压缩js
gulp.task('minify-js', () =>
    gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
        .pipe(terser({}))
        .pipe(gulp.dest('./public'))
)

//压缩css
gulp.task('minify-css', () =>
    gulp.src(['./public/**/*.css'])
        .pipe(cssnano({
            mergeIdents: false,
            reduceIdents: false,
            discardUnused: false,
            zIndex: false
        })).pipe(gulp.dest('./public'))
)

//压缩html
gulp.task('minify-html', () =>
    gulp.src('./public/**/*.html')
        .pipe(htmlClean())
        .pipe(htmlMin({
            removeComments: true, //清除html注释
            collapseWhitespace: true, //压缩html
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            noNewlinesBeforeTagClose: false,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            //省略布尔属性的值，例如：<input checked="true"/> ==> <input />
            removeEmptyAttributes: true,
            //删除所有空格作属性值，例如：<input id="" /> ==> <input />
            removeScriptTypeAttributes: true,
            //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,
            //删除<style>和<link>的 type="text/css"
            minifyJS: true, //压缩页面 JS
            minifyCSS: true, //压缩页面 CSS
            minifyURLs: true  //压缩页面URL
        }))
        .pipe(gulp.dest('./public'))
)

//压缩字体
function minifyFont(text, cb) {
    gulp
        .src('./public/fonts/*.ttf') //原字体所在目录
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('./public/fontsdest/')) //压缩后的输出目录
        .on('end', cb);
}

gulp.task('minify-ttf', (cb) => {
    var buffers = [];
    gulp
        .src(['./public/**/*.html']) //HTML文件所在目录请根据自身情况修改
        .on('data', function (file) {
            buffers.push(file.contents);
        })
        .on('end', function () {
            var text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        });
});

//压缩
gulp.task("zip", gulp.parallel('minify-js', 'minify-css', 'minify-html', 'minify-ttf'))