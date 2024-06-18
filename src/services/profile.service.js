import { userModel } from '../models/user.model.js'

export const findUserProfileById = async (id) => {
  return await userModel.findById(id)
}

export const updateUserProfile = async (payload, id) => {
  return await userModel.findByIdAndUpdate(id, {
    name: payload.name,
  })
}
