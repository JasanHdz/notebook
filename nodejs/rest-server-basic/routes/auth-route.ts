import { Router } from 'express'
import { login } from '../controllers/auth-controller'
import { check } from 'express-validator'
import fieldsValidate from '../middlewares/fields-validate'

const router = Router()

router.post('/login', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  fieldsValidate
], login)

export default router