//External Lib Import
import express from 'express';

//Internal Lib Import
import authRoute from './auth.route';
import conversationRoute from './conversation.route';
import messageRoute from './message.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/conversation',
    route: conversationRoute,
  },
  {
    path: '/message',
    route: messageRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
