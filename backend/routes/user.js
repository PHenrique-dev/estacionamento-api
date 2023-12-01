import { Router } from 'express'
import {NewUserController} from '../controllers/registerControllers'
import { User, getUser, checkToken } from '../controllers/userControllers'
const router = Router()
router.get('/user/:id', getUser, checkToken)
router.post('/auth/register', NewUserController)
router.post('/auth/user', User)
module.exports = router