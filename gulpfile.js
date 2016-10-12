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

        var v = pkg.version;

        gulp.src(['lib/*.*'])
            .pipe(gulp.dest('lib/' + v));

        callback();
    });
});

gulp.task('deploy', ['build'], function () {
    return gulp.src("./lib/**/*")
        .pipe(gh({ force: true }));
});
