import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import useragent from 'express-useragent'
import type formidable from 'formidable'
import helmet from 'helmet'

dotenv.config()

import { Kysely, MysqlDialect } from 'kysely'
import { DB as Database } from 'kysely-codegen'
import mysql from 'mysql2'

import { router as authRouter } from 'features/authentication/'
import { router as playlistRouter } from 'features/playlist'
import { router as songRouter } from 'features/songs'
import { router as settingRouter } from 'features/account_settings'
import cookieParse from 'middleware/cookie_parse'

const app = express()

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
)
app.use(cors())
app.use(bodyParser.json())
//app.use('/api/public/', express.static(path.join(__dirname, '../public')))
app.use(cookieParse)
app.use(useragent.express())

app.use('/api/auth/', authRouter)
app.use('/api/playlist/', playlistRouter)
app.use('/api/songs/', songRouter)
app.use('/api/accountSettings/', settingRouter)

app.get('/api/status', (_req, _res) => {
  _res.sendStatus(200)
})

app.listen(
  parseInt(process.env.API_PORT ?? ''),
  process.env.API_IP ?? '',
  () => {
    console.log(
      `Server listening at ${process.env.API_IP} on port ${process.env.API_PORT}!`
    )
  }
)

const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: mysql.createPool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    }),
  }),
})

declare global {
  var db: Kysely<Database>
}

globalThis.db = db

declare global {
  namespace Express {
    interface Request {
      fields: formidable.Fields<string>
      files: formidable.Files<string>
    }
  }
}
