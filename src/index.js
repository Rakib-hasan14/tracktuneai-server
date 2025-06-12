import cors from 'cors'
import express from 'express'
import http from 'http'

// DB
import { sequelize } from 'src/utils/database'

// Import entities sync function
import { syncEntities } from 'src/modules/entities.js'

// Routes
import routes from 'src/routes/index'

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

app.use(cors())

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from TracktuneAI backend!')
})

app.use(express.json()) // Middleware to parse JSON bodies
app.use(routes)

// Export HTTP server wrapping Express app
export const httpServer = http.createServer(app)

// Export Sequelize instance if needed elsewhere
export { sequelize }
