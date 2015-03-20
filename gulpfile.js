// Dependencies
var gulp = require('gulp'),
    // Styles
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    // Scripts
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // Images
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    // Other
    clean = require('gulp-clean');

// Assets
var paths = {
    assets: {
        styles: {
            dir: 'assets/styles',
            files: 'assets/styles/**/*.scss'
        },
        images: {
            dir: 'assets/images',
            files: [
                'assets/images/**/*.png',
                'assets/images/**/*.jpg',
            ]
        },
        scripts: {
            dir: 'assets/scripts',
            files: [
                'assets/scripts/vendor/**',
                'assets/scripts/src/**',
                'assets/scripts/main.js'
            ]
        }
    },
    public: {
        styles: 'public/styles',
        images: 'public/images',
        scripts: 'public/scripts'
    }
}

//
// Styles task
// -----------
// Grabs everything inside the styles & sprites directories, concantinates
// and compiles scss, builds sprites, and then outputs them to their
// respective target directories.
//

gulp.task('styles', function() {
    gulp.src(paths.assets.styles.files)
        .pipe(sass())
        .pipe(autoprefix('last 5 version'))
        .pipe(gulp.dest(paths.public.styles));
});

//
// Images task
// -----------
// Grab all the images, optimise them, and whack them
// inside the public/images directory.
//

gulp.task('images', function() {
    gulp.src(paths.assets.images.files)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(paths.public.images));
});

//
// Scripts task
// ------------
// Take vendor, src, and the main JS files and concatenate them and minify.
//

gulp.task('scripts', function() {
    gulp.src(paths.assets.scripts.files)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.public.scripts));
});

//
// Cleaner task
// ------------
// This simply deletes all of the main assets folders.
//

gulp.task('clean', function() {
  return gulp.src([paths.public.styles, paths.public.images], {read: false})
    .pipe(clean());
});

//
// Cache clearing task
// -------------------
// Destroy the cache so that image name changes take effect etc
//

gulp.task('cache', function() {
    cache.clearAll();
});

//
// Watch task
// ----------
// Watches the different directores for changes and then
// runs their relevant tasks and livereloads.
//

gulp.task('watch', function() {
    // Run the appropriate task when assets change
    gulp.watch(paths.assets.styles.files, ['styles']);
    gulp.watch(paths.assets.scripts.files, ['scripts']);
    gulp.watch(paths.assets.images.files, ['images']);
});

//
// Deploy task
// -----------
// Runs all of the main tasks, without activating livereload.
//

gulp.task('deploy', ['clean'], function() {
    // Run the styles task, but minify the output
    gulp.src(paths.assets.styles.files)
        .pipe(sass())
        .pipe(autoprefix('last 4 version'))
        .pipe(minify())
        .pipe(gulp.dest(paths.public.styles));

    gulp.src(paths.assets.scripts.files)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.public.scripts));


    // Optimise the images
    gulp.start('images');
});

//
// Defualt task
// ------------
// Runs every task, and then watches files for changes.
//

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'watch');
});
