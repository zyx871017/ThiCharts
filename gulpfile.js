/**
 * Created by zhaoyuxiang on 2017/3/24.
 */
var gulp = require('gulp');


gulp.task('server', function () {
  var app = new (require('express'))();

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host);
    console.log(port);

    console.log('Example app listening at http://localhost:3001');
  });

});