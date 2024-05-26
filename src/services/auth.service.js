import userModel from '../models/user.model.js'
import { hashPassword } from '../utils/hashing.js'

export const createUser = async (payload) => {
  const hashedPassword = await hashPassword(payload.password)

  const newUser = await userModel.create({
    email: payload.email,
    name: payload.name,
    password: hashedPassword,
    profilePicture: payload.profilePicture
      ? payload.profilePicture
      : `https://api.multiavatar.com/${payload.name}.svg?apikey=${process.env.AVATAR_API_KEY}`,
  })
  return newUser
}

export const findUser = async (email) => {
  const user = await userModel.findOne(
    {
      email,
    },
    'name email profilePicture',
  )
  return user
}
