import { Router } from 'express'

import { getUserProfile, putUserProfile } from '../controllers/profile.controller.js'

export const ProfileRouter = Router()
ProfileRouter.get('/:id', getUserProfile)
ProfileRouter.put('/', putUserProfile)
