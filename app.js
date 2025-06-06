import { httpServer } from 'src/index.js'
import { config } from 'src/config/index.js'

const PORT = config.port || 5000

httpServer.listen(PORT, () => {
  console.log(`🚀 TracktuneAI server running at http://localhost:${PORT}`)
})
