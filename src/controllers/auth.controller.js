import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../services/auth.service.js'
import { handleValidation } from '../helpers/validation.helper.js'
import { createUserValidation, userLoginValidation } from '../validations/auth.validation.js'
import { checkPassword } from '../utils/hashing.js'

export const Login = async (requset, response) => {
  try {
    const { email, password } = requset.body

    const user = await findUserByEmail(email)

    if (!user) return response.status(404).json({ message: 'User not found' })

    const isPasswordMatch = await checkPassword(password, user.password)

    if (!isPasswordMatch) return response.json(401).json({ message: 'Invalid Password' })

    const validatedUser = await handleValidation(requset, response, userLoginValidation)

    if (!validatedUser.success) return
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
    return response.status(200).json({ message: 'Login succesfully', token, user })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const Register = async (requset, response) => {
  const { email } = requset.body
  const user = await findUserByEmail(email)

  if (user) return response.json({ message: 'User already registered' })

  try {
    const validatedUser = await handleValidation(requset, response, createUserValidation)

    if (!validatedUser.success) return

    await createUser(validatedUser.data)

    return response.status(201).json({
      message: 'Registration succesfully',
    })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
