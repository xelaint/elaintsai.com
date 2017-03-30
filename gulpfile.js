var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify = require('gulp-browserify');

var outputFolder = "docs";
var srcFolder = "src/";

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch(srcFolder + "sass/components/*.scss", ['sass']);
    gulp.watch(srcFolder + "**/*.html").on('change', browserSync.reload);
});

gulp.task('build', ['html','sass','scripts', 'assets']);

gulp.task('assets', function(){
  return gulp.src(srcFolder + "assets/**/*")
      .pipe(gulp.dest( outputFolder + "/assets"))
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(srcFolder + "sass/app.scss")
        .pipe(sass({
          includePaths: './node_modules/bootstrap-sass/assets/stylesheets'
        }))
        .pipe(gulp.dest( outputFolder + "/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src(srcFolder + "**/*.html")
      .pipe(gulp.dest( outputFolder + "/html"));
});

gulp.task('default', ['serve']);

gulp.task('scripts', function() {
	// Single entry point to browserify
	gulp.src(srcFolder + 'js/app.js')
		.pipe(browserify({
		}))
		.pipe(gulp.dest(outputFolder +'/js'))
});
