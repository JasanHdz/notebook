import { Router } from 'express'
import { check } from 'express-validator'
import { deleteUser, getUsers, postUser, putUser } from '../controllers/user-controller'
import userValidate from '../middlewares/user-validate'
import { validateRole, emailExist, userExistById } from '../helpers/db-validator'

const router = Router()

router.get('/', getUsers)

router.post('/', [
  check('name', 'El nombre no es válido').not().isEmpty(),
  check('email', 'El email no es válido').isEmail(),
  check('email').custom(emailExist),
  check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
  // check('role', 'No es un role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(validateRole),
  userValidate
], postUser)

router.put('/:id', [
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom(userExistById),
  check('role').custom(validateRole),
  userValidate
], putUser)

router.delete('/:id', [
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom(userExistById),
  userValidate
] ,deleteUser)

export default router