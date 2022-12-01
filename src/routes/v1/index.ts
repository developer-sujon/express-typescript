//External Lib Import
import express from 'express';

//Internal Lib Import
import authRoute from './auth.route';
import categoryRoute from './category.route';
import subCategoryRoute from './subCategory.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/subCategory',
    route: subCategoryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
