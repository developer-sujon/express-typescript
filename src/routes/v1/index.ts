//External Lib Import
import express from 'express';

//Internal Lib Import
import authRoute from './auth.route';
import roleRoute from './role.route';
import staffRoute from './staff.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  },
  {
    path: '/staff',
    route: staffRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
