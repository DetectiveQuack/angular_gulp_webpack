const gulp = require('gulp'),
    watch = require('gulp-watch'),
    webpack = require('webpack-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    vendor = require('gulp-concat-vendor'),
    connect = require('gulp-connect'),
    del = require('del');

gulp.task('build', ['sass'], () => {
    gulp.src('./bower_components/*')
        .pipe(vendor('vendor.js'))
        .pipe(gulp.dest('./dist/'));

    return gulp.src(['./src/app.js', './src/**/*.js'])
        .pipe(webpack({
            devtool: 'source-map',
            //Use `gulp watch` instead
            watch: false,
            output: {
                filename: 'all.js',
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        plugins: ['transform-runtime'],
                        presets: ['es2015'],
                    }
                }]
            }
        }))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('serve', () => {
    connect.server({
        root: './',
        livereload: true
    });

    watch(['./src/app.js', './src/**/*.js', 'assets/styles/*.scss'], () => {
        gulp.start('build');
    });

    watch(['./dist/all.js'], function(){
        connect.reload();
    });
});

gulp.task('watch-sass', () => {
    watch('assets/styles/*.scss', () => {
        gulp.start('sass');
    });
});

gulp.task('sass', function () {
    return gulp.src('./assets/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('assets/styles/'));
});

gulp.task('clean', () => {
    const cleanScripts = [
        'dist',
        'assets/styles.css'
    ];

    return del(cleanScripts);
});

gulp.task('clean-build', ['clean', 'build']);

gulp.task('default', ['clean-build']);