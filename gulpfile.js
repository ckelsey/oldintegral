"use strict";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var path = require("path")
var exec = require('child_process').exec
const { spawn } = require('child_process');
var fs = require("fs")
const gulpSequence = require('gulp-sequence')

var paths = {
    watch: ["src/**/*.*", "src/**/**/*.*"]
}

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        https: true,
        single: true
    });
})

function pack() {
    console.log(__dirname)
    return new Promise(resolve => {

        const child = spawn(`webpack`, [`--config`, path.join(__dirname, 'webpack.config.js'), `--progress`]);

        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        child.on('exit', function (code, signal) {
            exec(`osascript -e 'display notification "Complete" with title "WEBPACK"'`)
            exec(`cp ./src/index.html ./dist`)
            exec(`cp -r ./src/assets ./dist`)
            resolve()
        });
    })
}

gulp.task('set-dev-env', function () {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-env', function () {
    return process.env.NODE_ENV = 'production';
});

gulp.task('publish', () => {
    console.log(`START WEBPACK`)

    return pack()
        .then(() => {
            // browserSync.reload()
        })
})

gulp.task("dev", [`server`, `set-dev-env`, `publish`], function () {
    gulp.watch(paths.watch, [`set-dev-env`, `publish`]);
});

gulp.task("build", function (cb) {
    gulpSequence(`set-prod-env`, `publish`)(cb)
});

gulp.task("default", [
    "dev"
], function () { });