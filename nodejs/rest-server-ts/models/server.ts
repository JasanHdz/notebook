import express, { Application } from 'express'
import userRouter from '../routes/usuario'
import cors from 'cors'
import db from '../db/connnection'

export default class Server {
  private app: Application
  private port: string
  private apiPaths = {
    users: '/api/users',
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3001'

    // define methods
    this.dbConnect()
    this.middlewares()
    this.routes()
  }

  routes() {
    this.app.use(this.apiPaths.users, userRouter)
  }

  // TODO: Conect data base
  async dbConnect() {
    try {
      await db.authenticate()
      console.log('database is online')
    } catch(error) {
      throw new Error(error)
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Read Body
    this.app.use(express.json())

    // Assets public
    this.app.use(express.static('public'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`)
    })
  }
}