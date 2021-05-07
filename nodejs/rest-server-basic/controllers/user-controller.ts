import { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'

export const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query
  const query = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

export const postUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })
  // encrypt password
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)
  
  await user.save()

  res.status(201).json(user)
}

export const putUser = async (req: Request, res: Response) => {
  const id = req.params.id
  const { _id, password, google, ...otherProps } = req.body
  // TODO: validatio to db
  if (password) {
    // encrypt password
    const salt = bcrypt.genSaltSync()
    otherProps.password = bcrypt.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, otherProps)
  
  res.json({  
    user
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id
  // delete of disk
  // const user = await User.findByIdAndDelete( id )
  const user = await User.findByIdAndUpdate(id, { state: false })
  res.json(user)
}