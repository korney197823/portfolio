var gulp = require("gulp"),
		jade = require('gulp-jade'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload;


	// =====================================================
	// =====================================================
	// ========= Локальная разработка АРР ==================
//Компилируем Jade в html
gulp.task('jade', function() {
	gulp.src('src/templates/pages/*.jade')
	.pipe(jade())
	.on('error', log)
	.pipe(gulp.dest('src/'))
	.pipe(reload({stream: true}));
});
//Запускаем локальный сервер (только после компиляции Jade)
gulp.task('server', ['jade'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('watch', function () {
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch([
		'src/*.html',
		'src/js/**/*.js',
		'src/css/**/*.css'
		]).on('change', reload);
});

gulp.task('default', ['server', 'watch']);

// =====================================================
// =====================================================
// ================== Функции ==========================

var log = function (error) {
	console.log([
		'',
		"--------ERROR MESSAGE START--------",
		("[" + error.name+ " in " + error.plagin + "]"),
		error.message,
		"--------ERROR MESSAGE END--------",
		''
	].join('\n'));
	this.end();
}

// =====================================================
// =====================================================
// ================== Важные моменты ===================
// gulp task(name, deps, fn)
// deps - массив задач, которые будут выполнены ДО запуска
// задачи name внимательно следите за порядком выполнения задач!
