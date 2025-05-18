import cors from 'cors'
import http from 'http'
import express from 'express'
import  connectDB  from './data/db.js'

// import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' with { type: 'json' }
import userRoutes from './routes/user.js'
import restaurantRoutes from './routes/restaurant.js'
import menuRoutes from './routes/menu.js'
const app = express();
const PORT = 8080

connectDB()
const server = http.createServer(app)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/menu', menuRoutes)

// Serve static files from the "public" directory
app.use(express.static('public'))

app.use((req, res) => {
    res.status(404).json({ message: `API not found at ${req.url}` })
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

export default app
