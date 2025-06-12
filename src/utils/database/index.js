// src/database.js
import { Sequelize } from 'sequelize'
import { config } from 'src/config/index.js'

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: console.log,
})

export { sequelize }
