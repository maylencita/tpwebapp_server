import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'

import router from './routes'
import { error } from './templates'

const _app = express()

// enable cors
_app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header('Origin'));
  res.header("Access-Control-Allow-Credentials", "true");  
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");  
  res.header("Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, pragma, cache-control");
  next();
});

_app.use(bodyParser.json());

_app.use(express.static('public'))

_app.use('/', router)

// catch 404 and forward to error handler
_app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.name = '404' //.status = 404;
  next(err);
});

// error handler
_app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(error);
})

export default _app
