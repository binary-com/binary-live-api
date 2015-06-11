var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src(['./src/liveevents.js', './src/liveapi.js', './src/livedata.js', './src/index.js'])
        .pipe(concat('binary-live-api.js'))
        .pipe(gulp.dest('./lib/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/', ['default']);
});
