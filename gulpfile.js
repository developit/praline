var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	babel = require('gulp-babel');

gulp.task('babel', function() {
	return gulp.src(['**/*.es6', '!tests/**/*'])
		.pipe( sourcemaps.init() )
		.pipe( babel({
			modules: 'umd',
			loose: 'all'
		}) )
		.pipe( sourcemaps.write() )
		.pipe( rename({ extname:'.js' }) )
		.pipe( gulp.dest('./') );
});

gulp.task('watch', function() {
	gulp.watch('**/*.es6', ['babel']);
});

gulp.task('default', ['babel']);
gulp.task('build-watch', ['default', 'watch']);
