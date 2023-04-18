import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'
import { config } from 'dotenv'

config()

/**
 * Cria o app
 */
export const app = express()

/**
 * Configuração do middleware
 */

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

/**
 * Integra o endpoint na aplicação
 */

app.use('/', router)