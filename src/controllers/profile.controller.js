import { handleValidation } from '../helpers/validation.helper.js'
import { findUserProfileById, updateUserProfile } from '../services/profile.service.js'
import { updateProfileValidation } from '../validations/profile.validation.js'

export const putUserProfile = async (request, response) => {
  try {
    const { id } = request.user

    const user = await findUserProfileById(id)

    if (!user) return response.status(404).json({ message: 'Profile not found' })

    const validatedProfile = await handleValidation(request, response, updateProfileValidation)

    if (!validatedProfile.success) return

    await updateUserProfile(validatedProfile.data, id)

    return response.status(200).json({ message: 'Profile succesfully updated' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
