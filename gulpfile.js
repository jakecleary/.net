// Dependencies
var gulp = require('gulp'),
    // Styles
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
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
        }
    },
    public: {
        styles: 'public/styles',
        images: 'public/images'
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

    // Optimise the images
    gulp.start('images');
});

//
// Defualt task
// ------------
// Runs every task, and then watches files for changes.
//

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'images', 'watch');
});
