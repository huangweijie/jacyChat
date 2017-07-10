var gulp = require('gulp');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
	connect.server({
		root: './',
		port: 8080,
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src('./style/*.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('./dist/css'))
	.pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src('./scripts/*.js')
	.pipe(gulp.dest('./dist/js'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./index.html', ['html']);
	gulp.watch('./style/*.css', ['css']);
	gulp.watch('./scripts/*.js', ['js']);
});

gulp.task('bundle', function() {
	
})

gulp.task('default', ['bundle', 'watch', 'connect']);