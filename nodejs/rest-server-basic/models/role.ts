import { Schema, model, Document } from 'mongoose'

const RoleSchema: Schema = new Schema({
  role: {
    type: String,
    required: [true, 'El role es obligatorio']
  }
})

export interface IRole extends Document {
  role: string,
}

export default model<IRole>('Role', RoleSchema)