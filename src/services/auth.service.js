import { userModel } from '../models/user.model.js'
import { hashPassword } from '../utils/hashing.js'

export const createUser = async (payload) => {
  const hashedPassword = await hashPassword(payload.password)

  return await userModel.create({
    email: payload.email,
    name: payload.name,
    password: hashedPassword,
    profilePicture:
      payload.profilePicture ?? `https://api.multiavatar.com/${payload.name}.svg?apikey=${process.env.AVATAR_API_KEY}`,
  })
}

export const findUserByEmail = async (email) => {
  return await userModel.findOne({
    email,
  })
}
