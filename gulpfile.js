var gulp = require('gulp');

var jshint = require('gulp-jshint');
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
var inquirer = require('inquirer');

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
};

gulp.task('hint:js', function () {
    return gulp.src('src/public/app/components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean:dist', function () {
    return del(['src/public/app/dist']);
});

gulp.task('min:js', ['min:html'], function () {
    return merge2(
        gulp.src(paths.libs.js),
        gulp.src(paths.scripts).pipe(ngAnnotate()).pipe(uglify()),
        gulp.src('src/public/app/dist/templates.js').pipe(uglify())
    )
    .pipe(concat('build.min.js'))
    .pipe(gulp.dest('src/public/app/dist'));
});

gulp.task('min:css', function () {
    return merge2(
        gulp.src(paths.libs.css),
        gulp.src(paths.styles).pipe(cssmin())
    )
    .pipe(concat('build.min.css'))
    .pipe(gulp.dest('src/public/app/dist'));
});

gulp.task('min:html', function () {
    return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
        root: 'public/components',
        module: 'hercules'
    }))
    .pipe(gulp.dest('src/public/app/dist'));
});

gulp.task('copy:index', function () {
    return gulp.src('src/public/index.html.dist')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('src/public'));
});

gulp.task('clean:trash', function () {
    return del([
        'src/public/index.html.dist',
        'src/public/app/**',
        '!src/public/app',
        '!src/public/app/dist',
        '!src/public/app/dist/build.min.js',
        '!src/public/app/dist/build.min.css'
    ]);
});

gulp.task('prod', function (callback) {
    inquirer.prompt({
        type: 'confirm',
        name: 'answer',
        message: 'You\'re about to erase all \'public\' folder content. \n  After that, only production environment files will remain. Continue?',
        default: false
    }).then(function (data) {
        if (data.answer) {
            return runSequece(
                'clean:dist',
                [
                    'min:js',
                    'min:css',
                    'copy:index'
                ],
                'clean:trash',
                callback
            );
        } else {
            console.log('\n  You\'re safe... For now.\n');
        }
    });
});
