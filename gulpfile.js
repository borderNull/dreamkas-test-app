var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'http-proxy-middleware', 'run-sequence']
});


gulp.task('server:json', function() {
  return gulp.src("db.json")
    .pipe($.jsonSrv.create({
      baseUrl: '/api',
      port: 3001
    }).pipe());
});

gulp.task('server:http', function() {
  $.connect.server({
    port: 3002,
    root: "dist",
    middleware: function(connect, opt) {
      return [
        $.httpProxyMiddleware('/api', {
          target: 'http://localhost:3001'
        })
      ];
    }
  });
});

gulp.task('server', function(callback){
  $.runSequence(
    'server:json',
    'server:http',
    callback
  );
});

gulp.task('default', function(){
  console.info('"gulp server" - run test server');
})
