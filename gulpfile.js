var gulp = require('gulp')

gulp.task('libs', function() {
    gulp.src('bower_components/jquery/dist/jquery.js').
        pipe(gulp.dest('www/lib'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', []);
});

gulp.task('default', ['libs', 'watch']);
