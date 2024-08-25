import mysql, { PoolOptions } from 'mysql2/promise'

const access: PoolOptions = {
    uri: process.env.DATABASE_URL,
}

const conn = mysql.createPool(access)

export { conn }
