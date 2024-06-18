import { Router } from 'express'

import { putUserProfile } from '../controllers/profile.controller.js'

export const ProfileRouter = Router()

ProfileRouter.put('/', putUserProfile)
