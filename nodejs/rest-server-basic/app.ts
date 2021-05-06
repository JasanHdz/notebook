import dotenv from 'dotenv'
import Server from './models/server'
// config enviroments
dotenv.config()

const server = new Server()

server.listen()