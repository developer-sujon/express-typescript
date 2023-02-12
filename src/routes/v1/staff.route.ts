//External Lib Import
import express from 'express';

//External Lib Import
import { auth, accessPermission } from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { staffValidation } from '../../validations';
import { staffController } from '../../controllers';

const router = express.Router();

router.post(
  '/staffCreate',
  auth(),
  validate(staffValidation.staffCreate),
  staffController.staffCreate
);

router.get('/staffList', auth(), staffController.staffList);
router.get('/staffdropDown', auth(), staffController.staffDropDown);

router.get(
  '/staffDetails/:id',
  auth(),
  validate(staffValidation.staffDetails),
  staffController.staffDetails
);

router.patch(
  '/staffUpdate/:id',
  auth(),
  validate(staffValidation.staffUpdate),
  staffController.staffUpdate
);

router.delete(
  '/staffDelete/:id',
  auth(),
  validate(staffValidation.staffDelete),
  staffController.staffDelete
);

export default router;
