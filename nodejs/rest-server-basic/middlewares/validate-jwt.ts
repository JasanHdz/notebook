import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { config } from '../config'
import User from '../models/user'

export const validateJWT = async (req: Request, res: Response, next: Function) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({
      msg: 'Bad request, permisos insuficientes'
    })
  }
  try {
    const { uid }: any = jwt.verify(token, config.jwtSecret)
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en db'
      }) 
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'Token no válido - usuario bloqueado'
      })
    }
      
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      msg: 'Bad request, token no válido'
    })
  }
}

export default validateJWT