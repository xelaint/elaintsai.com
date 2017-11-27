var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify = require('gulp-browserify');
const nunjucks = require('gulp-nunjucks-render');

var outputFolder = "docs";
var srcFolder = "src/";

// Static Server + watching scss/html files
gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: "./docs"
    });

    gulp.watch(srcFolder + "sass/components/*.scss", ['sass']);
    gulp.watch(srcFolder + "js/*.js", ["scripts", function(){browserSync.reload();}]);
    gulp.watch(srcFolder + "**/*.html", ['html', function(){browserSync.reload();}]);
    gulp.watch(srcFolder + "assets/*.*", ["assets", "reload"]);
});

gulp.task('reload', function(){
    browserSync.reload
})

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
  return gulp.src([
            srcFolder + "**/*.html",
            "!" + srcFolder+ "layouts/**/*.html"            
        ])
        .pipe(nunjucks({
            path: ['src/layouts']
          }))
        .pipe(gulp.dest( outputFolder));
});

gulp.task('default', ['serve']);

gulp.task('scripts', function() {
	// Single entry point to browserify
	gulp.src(srcFolder + 'js/app.js')
		.pipe(browserify({
		}))
		.pipe(gulp.dest(outputFolder +'/js'))
});
