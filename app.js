import express from 'express';
import logger from 'morgan';
import config from 'config';
import passport from 'passport';
import expressSession from 'express-session';
import indexRouter from './routes/index';
import './middleware/locals';
import './middleware/error-handler';
import './middleware/authentication/index';



const app = express();
app.use(logger(config.get('logger')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
   expressSession({
      secret: config.get('cookieSecret'),
      resave: false,
      saveUninitialized: true,
      cookie: {secure: config.util.getEnv('NODE_ENV') === 'production'}
   })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);

export default app;
