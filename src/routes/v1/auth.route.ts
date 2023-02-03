//External Lib Import
import express from 'express';
import validate from '../../middlewares/validate';

//Internal Lib Import
import * as authController from '../../controllers/auth.controller';
import * as authValidation from '../../validations/auth.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.get(
  '/refreshTokens/:refreshToken',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  '/forgotPassword',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  '/resetPassword',
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post(
  '/sendVerificationEmail',
  auth(),
  authController.sendVerificationEmail
);
router.post(
  '/verifyEmail',
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

export default router;
