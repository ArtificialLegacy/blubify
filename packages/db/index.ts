import mysql, { PoolOptions } from 'mysql2/promise'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') })

const access: PoolOptions = {
    uri: process.env.DATABASE_URL,
}

const conn = mysql.createPool(access)

export { conn }
