import { Request, Response } from 'express'

export const getUsers = (req: Request, res: Response) => {
  const query = req.query
  res.json({
    msg: 'GET API',
    query
  })
}

export const postUser = (req: Request, res: Response) => {
  const { body } = req
  res.status(201).json({
    msg: 'POST - controller API',
    body
  })
}

export const putUser = (req: Request, res: Response) => {
  const id = req.params.id
  res.json({
    msg: 'PUT API',
    id: id
  })
}

export const deleteUser = (req: Request, res: Response) => {
  res.json({
    msg: 'DELETE API'
  })
}