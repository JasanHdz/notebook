import { connect } from 'mongoose'
import { config } from '../config'

const DBConnection = async () => {
  const mongoCDN = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.nnl4g.mongodb.net/${config.dbName}`
  try {
    await connect(mongoCDN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log('Database online')
    
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de inicializar el proceso')
  }
}

export default DBConnection