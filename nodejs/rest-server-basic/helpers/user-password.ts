import bcrypt from 'bcryptjs'
import { IUser } from '../models/user'

export const encryptPassword = (user: IUser, password: string) => {
  // encrypt password
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)
}