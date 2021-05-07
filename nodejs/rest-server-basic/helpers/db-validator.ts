import Role from '../models/role'
import User from '../models/user'

export const validateRole = async (role = '') => {
  const rolExist = await Role.findOne({ role })
  if (!rolExist) {
    throw new Error(`El rol ${role} no está registrado en la base de datos`)
  }
}

export const emailExist = async (email = '') => {
  // verify email exist
  const isEmail = await User.findOne({ email })
  if (isEmail) {
    throw new Error(`Ya existe el email ${email} en la base de datos`)
  }
}

export const userExistById = async (id: string) => {
  // verify user by id
  const userExist = await User.findById(id)
  if (!userExist) {
    throw new Error(`El id: ${id} no existe`)
  }
}