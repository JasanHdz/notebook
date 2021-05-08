import { Request, Response } from 'express'

export const isAdminRole = (req: Request, res: Response, next: Function) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero'
    })
  }

  const { role, name } = req.user

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `El ${name} no es administrador - No puede hacer esto`
    })
  }
  next()
}

export const hasRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: Function) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero'
      })
    }
    if (!roles.includes(req.user?.role)) {
      return res.status(500).json({
        msg: `El servicio requiere alguno de estos roles: ${roles}`
      })
    }
    console.log(roles, req.user?.role)
    next()
  }
}
