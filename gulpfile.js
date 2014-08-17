var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('libs', function() {
    gulp.
        src('bower_components/jquery/dist/jquery.js').
        pipe(gulp.dest('www/lib'));
    gulp.
        src('bower_components/requirejs/require.js').
        pipe(gulp.dest('www/lib'));
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
