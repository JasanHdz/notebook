import express, { Application } from 'express'
import cors from 'cors'
import userRouter from '../routes/user-route'

export default class Server {
  private app: Application
  private port: string
  private apiPaths = {
    users: '/api/users'
  }
  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3001'

    // define methods
    // dbconnect
    // middlewares
    this.middlewares()
    // routes
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.apiPaths.users, userRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`)
    })
  }
}