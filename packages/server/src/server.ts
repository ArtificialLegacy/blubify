import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import useragent from 'express-useragent'
import type formidable from 'formidable'
import helmet from 'helmet'

dotenv.config()

import { conn } from 'db/index'

import { router as authRouter } from 'modules/authentication/'
import { router as playlistRouter } from 'modules/playlist'
import { router as songRouter } from 'modules/songs'
import { router as settingRouter } from 'modules/account_settings'
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

app.get('/api/status', (_, res) => {
  res.sendStatus(200)
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

declare global {
  var db: typeof conn
}

globalThis.db = conn

declare global {
  namespace Express {
    interface Request {
      fields: formidable.Fields<string>
      files: formidable.Files<string>
    }
  }
}
