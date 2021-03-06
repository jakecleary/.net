// Dependencies
// ============

var gulp = require('gulp'),

    // Styles
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),

    // Scripts
    uglify = require('gulp-uglify'),
    strip = require('gulp-strip-debug'),
    concat = require('gulp-concat'),

    // Images
    img = require('gulp-imagemin'),
    cache = require('gulp-cache'),

    // Other
    util = require('gulp-util'),
    del = require('del'),
    notify = require('gulp-notify'),
    notifier = require('node-notifier'),
    merge = require('merge-stream');

// Assets
// ======

var paths = {
    assets: {
        styles: {
            dir: 'assets/styles',
            files: 'assets/styles/**/*.scss',
        },
        js: {
            dir: 'assets/scripts/',
            files: [
                'assets/scripts/vendor/**/*.js',
                'assets/scripts/src/**/*.js',
                'assets/scripts/main.js'
            ],
        },
        img: {
            dir: 'assets/images',
            files: 'assets/images/**/*'
        }
    },
    public: {
        styles: 'public/styles',
        js: 'public/scripts',
        img: 'public/images',
    }
}

// General Settings
// ================

var settings = {
    autoprefix: {
        versions: 'last 4 version'
    }
}

// Deployment
// ==========

var deployment = {

    // The files we want to deploy
    files: [
        '**/*',
        '!{_deploy,_deploy/**}',
        '!{assets,assets/**}',
        '!{node_modules,node_modules/**}',
        '!package.json',
        '!gulpfile.js',
        '!readme.md',
        '!LICENSE.md',
        '!yarn.lock'
    ],

    // The folder to store them in
    destination: '_deploy'
}

// Styles
// ======
// Grabs everything inside the styles & sprites
// directories, concantinates and compiles scss,
// builds sprites, and then outputs them to their
// respective target directories.

gulp.task('styles', function() {
    gulp.src(paths.assets.styles.files)
        .pipe(sass())
        .pipe(autoprefix(settings.autoprefix.versions))
        .pipe(gulp.dest(paths.public.styles));
});

// Scripts
// =======
// Grabs everything inside the js directory,
// concantinates and minifies, and then outputs
// them to the target directory.

gulp.task('scripts', function() {
    gulp.src(paths.assets.js.files)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.public.js));
});

// Images
// ======
// Grabs everything inside the img directory,
// optimises each image, and then outputs them to
// the target directory.

gulp.task('images', function() {
    gulp.src(paths.assets.img.files)
        .pipe(gulp.dest(paths.public.img));
});

// Cache-buster
// ============
// Completely clear the cache to stop image-min
// outputting oncorrect image names etc.

gulp.task('clear', function(done) {
    return cache.clearAll(done);
});

// Cleaner
// =======
// Deletes all the public asset folders.

gulp.task('clean', function() {
    return del([
        paths.public.styles,
        paths.public.js,
        paths.public.img
    ]);
});

// Watcher
// =======
// Watches the different directores for changes and then
// runs their relevant tasks and livereloads.

gulp.task('watch', function() {
    // Run the appropriate task when assets change
    gulp.watch(paths.assets.styles.files, ['styles']);
    gulp.watch(paths.assets.js.files, ['scripts']);
    gulp.watch(paths.assets.img.files, ['images']);
});

// Production assets
// =================
// Goes through all our assets and readies them for production.
// - Minification
// - Concatenation
// - Debug stripping

gulp.task('production', ['clean'], function() {

    // Styles
    var styles = gulp.src(paths.assets.styles.files)
        .pipe(sass())
        .pipe(autoprefix(settings.autoprefix.versions))
        .pipe(minify())
        .pipe(gulp.dest(paths.public.styles));

    // Scripts
    var scripts = gulp.src(paths.assets.js.files)
        .pipe(concat('main.js'))
        .pipe(strip())
        .pipe(uglify())
        .pipe(gulp.dest(paths.public.js));

    // Images.
    var imgs = gulp.src(paths.assets.img.files)
        .pipe(img()).pipe(gulp.dest(paths.public.img));

    // Return the streams in one combined stream
    return merge(styles, scripts, imgs);
});

// Deployment
// ==========
// This task runs 'production' and then grabs all the files
// we want to upload and puts them in there own folder.

gulp.task('deploy', ['production'], function() {
    gulp.src(deployment.files, { base: '.' })
        .pipe(gulp.dest(deployment.destination));
});

//
// Default
// =======
// Runs every task, and then watches the project  for changes.

gulp.task('default', ['clean', 'styles', 'scripts', 'images', 'watch'], function() {
    notifier.notify({ message: 'Tasks complete' });
});