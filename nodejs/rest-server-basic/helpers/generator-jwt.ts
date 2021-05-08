import jwt from 'jsonwebtoken'
import { config } from '../config'

export const generatorJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: '4h'
    }, (err, token) => {
        if (err) {
          console.log(err)
          return reject('No se pudo generar el JWT')
        }
        resolve(token)
    })

  })
}