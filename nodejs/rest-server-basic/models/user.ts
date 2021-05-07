import { Schema, model, Document } from 'mongoose'

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  state: {
    type: Boolean,
    default: true,
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password,...userProps } = this.toObject()

  return userProps
}

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  img: string,
  role: string,
  state: boolean
  google: boolean
}

export default model<IUser>('User', UserSchema)