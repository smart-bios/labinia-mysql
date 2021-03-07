import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize({
    dialect: 'mysql',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    pool: {
        max: 5,
        min: 0,
        idle: 10 * 1000,
    }
})

export default db