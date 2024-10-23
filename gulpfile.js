// import the base gulp node module
var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var sourcemaps = require("gulp-sourcemaps");
var obfuscate = require('gulp-obfuscate');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');


function runSequential(tasks) {
    if (!tasks || tasks.length <= 0) return;

    const task = tasks[0];
    gulp.series(task, () => {
        console.log(`${task} finished`);
        runSequential(tasks.slice(1));
    });
}

gulp.task('minify', function (done) {
    return gulp
        .src(["nutritionLabel.js"])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/"))
        .pipe(notify({ message: "JS files successfully reduced" }));
});

gulp.task('minifyCSS', function (done) {
    return (
        gulp
            .src("nutritionLabel.css")
            .pipe(cleanCSS())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest("dist/css"))
    );
});

gulp.task("default", gulp.series([ "minify", "minifyCSS" ]), function (done) {
    done();
    // return gulp.series([ "minify", "obfuscate" ])

});
gulp.task('watch', function () {
    // Watch .js files in all folders within our src directory, when a file changes
    // perform the default task defined above.
    gulp.watch('src/**/*.js', ['default']);
});