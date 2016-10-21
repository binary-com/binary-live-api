var gulp        = require('gulp');
var gh          = require('gulp-gh-pages');
var webpack     = require('webpack');
var gutil       = require('gulp-util');
var pkg         = require('./package.json');
/**
 * Push build to gh-pages
 */

gulp.task('build', function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());

        callback();
    });
});

gulp.task('versioning', ['build'], function () {
    var v = pkg.version;
    return gulp.src(['lib/*.*'])
        .pipe(gulp.dest('lib/' + v));
});

gulp.task('deploy', ['versioning'], function () {
    return gulp.src(["./lib/**/*", "./CNAME"])
        .pipe(gh({ force: true }));
});

gulp.task('deploy-prod', ['versioning'], function () {
    return gulp.src(["./lib/**/*", "./CNAME"])
        .pipe(gh({ force: true, origin: 'upstream' }));
});
