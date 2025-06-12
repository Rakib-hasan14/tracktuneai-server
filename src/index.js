import express from 'express'
import http from 'http'
import { sequelize } from 'src/utils/database'

// Import entities sync function
import { syncEntities } from 'src/modules/entities.js'

// DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected')

    // Sync entities after successful connection
    return syncEntities()
  })
  .catch((err) => console.error('❌ DB connection error:', err))

const app = express()

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from TracktuneAI backend!')
})

// Export HTTP server wrapping Express app
export const httpServer = http.createServer(app)

// Export Sequelize instance if needed elsewhere
export { sequelize }
