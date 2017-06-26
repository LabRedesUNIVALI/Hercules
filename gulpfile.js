const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const templateCache = require('gulp-angular-templatecache');
const cssmin = require('gulp-cssmin');
const ngAnnotate = require('gulp-ng-annotate');
const merge = require('merge2');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    libs: {
        js: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-aria/angular-aria.min.js',
            'node_modules/angular-cookies/angular-cookies.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-messages/angular-messages.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-translate/dist/angular-translate.min.js',
            'node_modules/angular-ui-mask/dist/mask.min.js',
            'node_modules/jspdf/dist/jspdf.min.js',
            'node_modules/angular-material/angular-material.min.js',
            'node_modules/angular-material-data-table/dist/md-data-table.min.js'
        ],
        css: [
            'node_modules/angular-material/angular-material.min.css',
            'node_modules/angular-material-data-table/dist/md-data-table.min.css',
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
    dist: 'src/public/dist',
};

gulp.task('min:js:vendors', () =>
    gulp.src(paths.libs.js)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('min:js:app', () =>
    gulp.src(paths.scripts)
        .pipe(ngAnnotate())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist))
);

gulp.task('min:css', () =>
    merge(
        gulp.src(paths.libs.css),
        gulp.src(paths.styles)
            .pipe(cssmin())
    )
        .pipe(concat('build.min.css'))
        .pipe(gulp.dest(paths.dist))
);

gulp.task('min:html', () =>
    gulp.src(paths.templates)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache({
            module: 'hercules',
            filename: 'templates.min.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist))
);

gulp.task('build:prod', [
    'min:js:vendors',
    'min:js:app',
    'min:html',
    'min:css'
]);

gulp.task('build:dev:watch', ['build:prod'], () => {
    gulp.watch(paths.styles, ['min:css']);
    gulp.watch(paths.templates, ['min:html']);
    gulp.watch(paths.scripts, ['min:js:app'])
});
