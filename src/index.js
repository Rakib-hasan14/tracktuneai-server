import express from 'express'
import http from 'http'
import { Sequelize } from 'sequelize'

// config
import { config } from 'src/config/index.js'
// Initialize Sequelize (Postgres example)
const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: true,
})

// Test DB connection (optional)
sequelize.authenticate()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ DB connection error:', err))

const app = express()

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from TracktuneAI backend!')
})

// Export HTTP server wrapping Express app
export const httpServer = http.createServer(app)

// Export Sequelize instance if needed elsewhere
export { sequelize }
