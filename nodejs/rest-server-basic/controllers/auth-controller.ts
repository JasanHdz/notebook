import { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import { generatorJWT } from '../helpers/generator-jwt'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    // verify email exist
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - email'
      })  
    }
    // verify user active
    if (!user.state) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - state : false'
      }) 
    }
    // verify password
    const passwordIsCorrect = bcrypt.compareSync(password, user.password)
    if (!passwordIsCorrect) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - password'
      }) 
    }
    // Generate JWT
    const token = await generatorJWT(user.id)

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}