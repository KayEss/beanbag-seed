var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var _ = require('underscore');

gulp.task('libs', function() {
    _.each(
        ['jquery/dist/jquery', 'requirejs/require'],
        function(item) {
            gulp.
                src(path.join('bower_components', item) + '.js').
                pipe(gulp.dest('www/lib'));
        }
    );
});

gulp.task('less', function() {
    gulp.
        src('css/*.less').
        pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        })).
        pipe(gulp.dest('www/css'));
});

gulp.task('javascript', function() {
    gulp.
        src('js/*').
        pipe(gulp.dest('www/lib'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['javascript']);
    gulp.watch('css/*.less', ['less']);
});

gulp.task('default', ['libs', 'javascript', 'less', 'watch']);
