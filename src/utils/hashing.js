import { hash, compare } from 'bcrypt'

export const checkPassword = async (password, userPassword) => {
  return compare(password, userPassword)
}
export const hashPassword = async (password) => {
  return await hash(password, 10)
}
