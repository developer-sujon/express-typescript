//External Lib  import
import express, { Application } from 'express';
import helmet from 'helmet';
// import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import expressMongoSanitize from 'express-mongo-sanitize';
import httpStatus from 'http-status';
import passport from 'passport';

//Internal Lib  import
import routes from './routes/v1';
import CustomError from './helpers/CustomError';
import { errorConverter, errorHandler } from './middlewares/error';
import { morganSuccessHandler, morganErrorHandler } from './config/morgan';
import { IS_TEST, APP_PREFIX_PATH } from './config/config';
import initI18next from './locales/i18n';
import { jwtStrategy } from './config/passport';

const app: Application = express();

if (!IS_TEST) {
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
app.use(expressMongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//i18next Internationalized
initI18next(app);

app.get('/', (req, res) => {
  res.send(req.t('Successfull Request'));
});

app.use(APP_PREFIX_PATH, routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new CustomError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
