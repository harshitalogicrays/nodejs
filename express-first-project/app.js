import createError from 'http-errors'
import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import 'dotenv/config'
import indexRouter  from './routes/index.js'
import formRouter from './routes/formhandling.js'
import connectDB from './db.js';

const app = express();

// view engine setup
const __dirname = path.resolve()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')))

app.use('/', indexRouter);
app.use('/form', formRouter);


connectDB(process.env.DBURL)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
