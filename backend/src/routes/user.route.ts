import { Router } from 'express'
import { signUp, listUserTypes, login } from '../controllers/user.controller'

const router = Router();

router.get('/types', listUserTypes)
router.post('/login', login)
router.post('/sign-up', signUp)

export default router;