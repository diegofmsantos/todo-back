import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import router from './routes'
import { errorHandler, notFoundRequest } from './routes/errorhandler'

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, '../public')))

server.use('/', router)

server.use(notFoundRequest)
server.use(errorHandler)

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
})