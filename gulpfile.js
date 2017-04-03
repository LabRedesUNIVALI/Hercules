var gulp = require('gulp');

var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

var merge2 = require('merge2');
var runSequece = require('run-sequence');

var paths = {
    libs: {
        js: [
            'src/public/app/assets/libs/angular/angular.min.js',
            'src/public/app/assets/libs/angular-animate/angular-animate.min.js',
            'src/public/app/assets/libs/angular-aria/angular-aria.min.js',
            'src/public/app/assets/libs/angular-cookies/angular-cookies.min.js',
            'src/public/app/assets/libs/angular-material/angular-material.min.js',
            'src/public/app/assets/libs/angular-material-data-table/dist/md-data-table.min.js',
            'src/public/app/assets/libs/angular-messages/angular-messages.min.js',
            'src/public/app/assets/libs/angular-route/angular-route.min.js',
            'src/public/app/assets/libs/angular-sanitize/angular-sanitize.min.js',
            'src/public/app/assets/libs/angular-translate/angular-translate.min.js',
            'src/public/app/assets/libs/angular-ui-mask/dist/mask.min.js',
            'src/public/app/assets/libs/jspdf/dist/jspdf.min.js'
        ],
        css: [
            'src/public/app/assets/libs/angular-material/angular-material.min.css',
            'src/public/app/assets/libs/angular-material-data-table/dist/md-data-table.min.css',
        ]
    },
    scripts: [
        'src/public/app/app.module.js',
        'src/public/app/app.routes.js',
        'src/public/app/app.messages.pt-br.js',
        'src/public/app/components/**/*.js',
        'src/public/app/shared/*.js'
    ],
    styles: 'src/public/app/assets/css/app.css',
    templates: 'src/public/app/components/**/*.html',
    dist: 'src/public/dist'
};

gulp.task('clean:dist', function () {
    return del([paths.dist]);
});

gulp.task('min:js', ['min:html'], function () {
    return merge2(
        gulp.src(paths.libs.js),
        gulp.src(paths.scripts).pipe(ngAnnotate()).pipe(uglify()),
        gulp.src(`${paths.dist}/templates.js`).pipe(uglify())
    )
    .pipe(concat('build.min.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('min:css', function () {
    return merge2(
        gulp.src(paths.libs.css),
        gulp.src(paths.styles).pipe(cssmin())
    )
    .pipe(concat('build.min.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('min:html', function () {
    return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
        root: 'public/components',
        module: 'hercules'
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:index', function () {
    return gulp.src('src/public/index.html.dist')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('prod', function (callback) {
    return runSequece(
        'clean:dist',
        ['min:js', 'min:css', 'copy:index'],
        callback
    );
});
