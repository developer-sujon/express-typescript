//External Lib Import
import express from 'express';

//External Lib Import
import { auth, accessPermission } from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { roleValidation } from '../../validations';
import { roleController } from '../../controllers';

const router = express.Router();

router.post(
  '/roleCreate',
  auth(),
  validate(roleValidation.roleCreate),
  roleController.roleCreate
);

router.get('/roleList', auth(), roleController.roleList);
router.get('/roledropDown', auth(), roleController.roleDropDown);

router.get(
  '/roleDetails/:id',
  auth(),
  validate(roleValidation.roleDetails),
  roleController.roleDetails
);

router.patch(
  '/roleUpdate/:id',
  auth(),
  validate(roleValidation.roleUpdate),
  roleController.roleUpdate
);

router.delete(
  '/roleDelete/:id',
  auth(),
  validate(roleValidation.roleDelete),
  roleController.roleDelete
);

export default router;
