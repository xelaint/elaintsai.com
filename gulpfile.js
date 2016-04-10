var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify = require('gulp-browserify');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("sass/components/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("sass/app.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('scripts', function() {
	// Single entry point to browserify 
	gulp.src('js/app.js')
		.pipe(browserify({
		}))
		.pipe(gulp.dest('./build/js'))
});