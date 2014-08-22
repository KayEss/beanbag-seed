var exec = require('child_process').exec;
var glob = require('glob');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minimatch = require('minimatch');
var path = require('path');
var phantomjs = require('phantomjs');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var unzip = require('gulp-unzip');
var _ = require('underscore');


gulp.task('clean', function() {
    return gulp.
        src('www/lib').
        pipe(rimraf());
});

gulp.task('bower', function() {
    _.each(
        ['angularjs/angular', 'angular-mocks/angular-mocks',
            'angular-ui-router/release/angular-ui-router',
            'jquery/dist/jquery', 'requirejs/require'],
        function(item) {
            gulp.
                src(path.join('bower_components', item) + '.js').
                pipe(gulp.dest('www/lib'));
        }
    );
    _.each(
        ['ng-aloha-editor/libs/alohaeditor-0.23.26/aloha', 'bootstrap/fonts'],
        function(item) {
            gulp.
                src(path.join('bower_components', item, '**')).
                pipe(gulp.dest(path.join('www/lib', path.basename(item))));
        }
    );
    return gulp.
        src(path.join('bower_components/jasmine/dist/jasmine-standalone-2.0.1.zip')).
        pipe(unzip({
            filter: function(entry) {
                return minimatch(entry.path, 'lib/**/jasmine.*');
            }
        })).
        pipe(rename({dirname: ''})).
        pipe(gulp.dest('www/lib'));
});

gulp.task('less', function() {
    gulp.
        src('css/*.less').
        pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        })).
        pipe(gulp.dest('www/lib'));
});

gulp.task('javascript', function() {
    return gulp.
        src('js/**').
        pipe(jshint()).
            pipe(jshint.reporter('jshint-stylish')).
        pipe(gulp.dest('www/lib'));
});

gulp.task('test', ['bower', 'javascript'], function() {
    glob('spec/*.js', function(_, files) {
        files = files.map(function(f) { return '"../../'+f.replace('.js', '')+'"'; }).join(' ');
        exec(phantomjs.path + ' lib/phantom.js ' + files, function(error, stdout, stderr) {
            console.log(stdout);
        });
    });
});

gulp.task('watch', function() {
    gulp.watch('{js,lib,spec}/**', ['test']);
    gulp.watch('css/*', ['less']);
});

gulp.task('build', ['bower', 'javascript', 'less']);
gulp.task('default', ['build', 'test', 'watch']);

