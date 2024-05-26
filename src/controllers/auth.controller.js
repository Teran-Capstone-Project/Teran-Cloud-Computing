import jwt from 'jsonwebtoken'
import { createUser, findUser } from '../services/auth.service.js'
import { handleValidation } from '../helpers/validation.helper.js'
import { createUserValidation, userLoginValidation } from '../validations/auth.validation.js'

export const Login = async (requset, response) => {
  const { email } = requset.body
  const user = await findUser(email)

  if (!user) return response.status(404).json({ message: 'Pengguna Tidak ditemukan' })

  try {
    const validatedUser = await handleValidation(requset, response, userLoginValidation)

    if (!validatedUser.success) return null
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user?.profilePicture,
        role: user.role,
      },
      `${process.env.SECRET_KEY}`,
    )
    return response.status(200).json({ message: 'Berhasil masuk', token, user })
  } catch (error) {
    console.error('Internal server error:', error)
    return response.status(500).json({ message: error })
  }
}

export const Register = async (requset, response) => {
  const { email } = requset.body
  const user = await findUser(email)

  if (user) return response.json({ message: 'Pengguna Sudah Terdaftar' })

  try {
    const validatedUser = await handleValidation(requset, response, createUserValidation)

    if (!validatedUser.success) return null

    await createUser(validatedUser.data)

    return response.status(201).json({
      message: 'Berhasil registrasi',
    })
  } catch (error) {
    console.error('Internal server error:', error)
    return response.status(500).json({ message: error })
  }
}
