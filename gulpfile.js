// Dependencies
var gulp = require('gulp'),
    // Styles
    compass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    // Other
    clean = require('gulp-clean');

// Assets
var paths = {
    assets: {
        styles: {
            dir: 'assets/styles',
            files: 'assets/styles/**/*.scss'
        }
    },
    public: {
        styles: 'public/styles'
    }
}

//
// Styles task
// -----------------
// Grabs everything inside the styles & sprites directories, concantinates
// and compiles scss, builds sprites, and then outputs them to their
// respective target directories.
//

gulp.task('styles', function() {
    gulp.src(paths.assets.styles.files)
        .pipe(sass())
        .pipe(autoprefix('last 4 version'))
        .pipe(gulp.dest(paths.public.styles));
});

//
// Cleaner task
// ------------
// This simply deletes all of the main assets folders.
//

gulp.task('clean', function() {
  return gulp.src([paths.public.styles], {read: false})
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
});

//
// Deploy task
// -----------
// Runs all of the main tasks, without activating livereload.
//

gulp.task('deploy', ['clean'], function() {
    // Run the styles task, but minify the output
    gulp.src(paths.assets.styles.files)
        .pipe(compass({
            config_file: './config.rb',
            sass: paths.assets.styles.dir,
            css: paths.public.styles,
            image: paths.assets.img.dir
        }))
        .pipe(autoprefix('last 4 version'))
        .pipe(minify())
        .pipe(gulp.dest(paths.public.styles));
});

//
// Defualt task
// ------------
// Runs every task, and then watches files for changes.
//

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'watch');
});
