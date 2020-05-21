const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');

// Tarea sass Compila SCSS en CSS y autoinyectar en navegadores
gulp.task('sass_bootstrap', gulp.series(() => {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss'
  ])
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('src/public/css/bootstrap/'));
  // .pipe(browserSync.stream());
}));

// Mueve los archivos javascript a la carpeta src/public/js/bootstrap
gulp.task('js', gulp.series(() => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js.map',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery/dist/jquery.min.map',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js.map'
  ])
    .pipe(gulp.dest('src/public/js/bootstrap/'));
  // .pipe(browserSync.stream());
}));

// Mueve los archivos fonts a la carpeta src/public/fonts
gulp.task('font-awesome', gulp.series(() => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/public/fonts/'));
}));

gulp.task('fonts', gulp.series(() => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/public/fonts/'));
}));


gulp.task('sass_jcc', gulp.series(() => {
  return gulp.src(['src/sass/*.scss'])
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('src/public/css/'))
    .pipe(browserSync.stream());
}));

// Inicia Servidor estático queda atento (watch) a los cambios de los archivos scss y html
gulp.task('serve', gulp.series(['sass_jcc'], () => {
  browserSync.init({
    server: './src'
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch(['src/sass/**/*.scss'], gulp.parallel(['sass_jcc']));
}));

gulp.task('default', gulp.series(['sass_bootstrap', 'js', 'font-awesome', 'fonts', 'serve',]));
