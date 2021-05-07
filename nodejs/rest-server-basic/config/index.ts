import dotenv from 'dotenv'
// config enviroments
dotenv.config()

interface configMap {
  dev: boolean,
  dbUser: string,
  dbPassword: string,
  dbHost: string,
  dbName: string,
}

export const config: configMap = {
  dev: process.env.NODE_ENV !== 'producction',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || '',
  dbName: process.env.DB_NAME || ''
}