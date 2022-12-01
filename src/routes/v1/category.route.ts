//External Lib Import
import express from 'express';
import validate from '../../middlewares/validate';

//Internal Lib Import
import * as categoryController from '../../controllers/category.controller';
import * as categoryValidation from '../../validations/category.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/categoryCreate',
  auth(['owner']),
  validate(categoryValidation.categoryCreate),
  categoryController.categoryCreate
);

router.get('/categoryList', auth(['owner']), categoryController.categoryList);
router.get(
  '/categoryDetails/:id',
  auth(['owner']),
  validate(categoryValidation.categoryDetails),
  categoryController.categoryDetails
);

router.get(
  '/categoryPaginate/:pageNumber/:perPage/:searchKeyword',
  auth(['owner']),
  validate(categoryValidation.categoryPaginate),
  categoryController.categoryPaginate
);

router.patch(
  '/categoryUpdate/:id',
  auth(['owner']),
  validate(categoryValidation.categoryUpdate),
  categoryController.categoryUpdate
);

router.delete(
  '/categoryDelete/:id',
  auth(['owner']),
  validate(categoryValidation.categoryDelete),
  categoryController.categoryDelete
);

export default router;
