var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');
var webpack     = require('webpack');
var gutil       = require('gulp-util');
/**
 * Push build to gh-pages
 */

gulp.task('build', function(callback) {
    webpack({}, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task('deploy', ['build'], function () {
    return gulp.src("./lib/**/*")
        .pipe(deploy());
});
