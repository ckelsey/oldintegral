'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();


/* BROWSER SYNC
* Starts bower server
*/

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "."
		},
		https: true,
		port: 3004
	});
});

gulp.task('default', [
	'browser-sync'
], function () { });