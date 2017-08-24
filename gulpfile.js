var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require("gulp-util"),
    nested = require('postcss-nested');
    rename = require('gulp-rename');

gulp.task('default', ['watch:js', 'watch:sss']);
 
gulp.task('sugarss', function () {
    var assets = require('postcss-assets');
    var sugarss = require('sugarss');

    var plugins = [
        require("postcss-import"),
        require('postcss-cssnext'),
        require('postcss-nested'),
        require('lost'),
        require('postcss-import-url'),
        
    ];
    return gulp.src('sss/zanim.sss')
        .pipe(postcss(plugins, { parser: sugarss }))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('concat', function() {
    var concat = require('gulp-concat'),
        beautify = require('gulp-beautify'),
        babel = require('gulp-babel');

    return gulp.src('main.js')
    .pipe(concat('main.js'))
    .pipe(beautify({indent_size: 4}))
    .pipe(babel({
			presets: ['es2017', 'stage-3']
    }))
    .pipe(rename({ basename: 'zanim' }))
    .pipe(gulp.dest(''))
});

gulp.task('watch:sss', function() {
    gulp.watch('sss/*.sss', ['sugarss']);
    gulp.watch('sss/**/*.sss', ['sugarss']);
});

gulp.task('watch:js', function() {
    gulp.watch('main.js', ['concat'])
    gulp.watch('components/**.js', ['concat'])
});
