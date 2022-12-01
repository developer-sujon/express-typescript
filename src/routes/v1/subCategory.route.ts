//External Lib Import
import express from 'express';
import validate from '../../middlewares/validate';

//Internal Lib Import
import * as subCategoryController from '../../controllers/subCategory.controller';
import * as subCategoryValidation from '../../validations/subCategory.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/subCategoryCreate',
  auth(['owner', 'manger']),
  validate(subCategoryValidation.subCategoryCreate),
  subCategoryController.subCategoryCreate
);

router.get(
  '/subCategoryList',
  auth(['owner', 'manger']),
  subCategoryController.subCategoryList
);
router.get(
  '/subCategoryDetails/:id',
  auth(['owner']),
  validate(subCategoryValidation.subCategoryDetails),
  subCategoryController.subCategoryDetails
);

router.get(
  '/subCategoryPaginate/:pageNumber/:perPage/:searchKeyword',
  auth(['owner', 'manger']),
  validate(subCategoryValidation.subCategoryPaginate),
  subCategoryController.subCategoryPaginate
);

router.patch(
  '/subCategoryUpdate/:id',
  auth(['owner']),
  validate(subCategoryValidation.subCategoryUpdate),
  subCategoryController.subCategoryUpdate
);

router.delete(
  '/subCategoryDelete/:id',
  auth(['owner']),
  validate(subCategoryValidation.subCategoryDelete),
  subCategoryController.subCategoryDelete
);

export default router;
