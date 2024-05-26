import { Router } from 'express'
import { Login, Register } from '../controllers/auth.controller.js'

export const AuthRouter = Router()

AuthRouter.post('/login', Login)
AuthRouter.post('/register', Register)
