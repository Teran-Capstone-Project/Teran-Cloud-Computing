import { handleValidation } from '../helpers/validation.helper.js'
import { findUserProfileById, updateUserProfile } from '../services/profile.service.js'
import { createUserValidation } from '../validations/auth.validation.js'

export const getUserProfile = async (request, response) => {
  try {
    const { id } = request.params

    const userProfile = await findUserProfileById(id)

    if (!userProfile) return response.status(404).json({ message: 'User profile not found' })

    return response.status(200).json({ message: 'User profile retrieved successfully', userProfile })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const putUserProfile = async (request, response) => {
  try {
    const { id } = request.params
    const profile = await findUserProfileById(id)

    if (!profile) return response.status(404).json({ message: 'Profile not found' })

    const validatedProfile = await handleValidation(request, response, createUserValidation)

    if (!validatedProfile.success) return

    await updateUserProfile(validatedProfile.data, id)

    return response.status(200).json({ message: 'Profile succesfully updated' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

// export const postUserProfile = async (request, response) => {
//   try {
//     const { id } = request.params
//     const validatedUserProfile = await handleValidation(request, response, createUserValidation)

//     if (!validatedUserProfile.success) return

//     await createUserValidation(validatedUserProfile.data, id)

//     return response.status(201).json({ message: 'User profile successfully created' })
//   } catch (error) {
//     console.error('Internal server error:', error.message)
//     return response.status(500).json({ message: error })
//   }
// }
