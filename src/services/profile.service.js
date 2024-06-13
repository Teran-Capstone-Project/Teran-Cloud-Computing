import { userModel } from '../models/user.model.js'

export const findUserProfileById = async (id) => {
  return await userModel
    .find()
    .where({
      user: id,
    })
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .sort({ createdAt: -1 })
}

export const updateUserProfile = async (payload, id) => {
  return await userModel.findByIdAndUpdate(id, {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    profilePicture: payload.profilePicture,
  })
}
