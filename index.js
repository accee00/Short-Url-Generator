import express from 'express'
import urlRouter from './routes/url.router.js'
import connectDB from './db/connect.db.js'
import dotenv from "dotenv"
dotenv.config({
    path: ".env"
})

const app = express()
const PORT = 8000

app.use(express.json())

app.use('/url', urlRouter)

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`)
})


connectDB().then(() => console.log("Connected to mongodb")).catch((error) => {
    console.log(error)
})
