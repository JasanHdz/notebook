import { Router, Request, Response } from 'express'
import { deleteUser, getUsers, postUser, putUser } from '../controllers/user-controller'
const router = Router()

router.get('/', getUsers)
router.post('/', postUser)
router.put('/:id', putUser)
router.delete('/', deleteUser)

export default router