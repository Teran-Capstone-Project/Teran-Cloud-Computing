import { hash, compare } from 'bcrypt'

export const checkPassword = async (password, userPassword) => {
  const comparedPassword = await compare(password, userPassword)
  return comparedPassword
}
export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 10)
  return hashedPassword
}
