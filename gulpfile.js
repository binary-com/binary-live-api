var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {

    var source = [
        './src/liveevents.js',
        './src/liveapi.js',
        './src/ticks.js',
        './src/livedata.js',
        './src/index.js'
    ];

    return gulp.src(source)
        .pipe(concat('binary-live-api.js'))
        .pipe(gulp.dest('./lib/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/*', ['default']);
});
