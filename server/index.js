import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postsRoutes from "./routes/posts.js";

const app = express()
dotenv.config()
// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors())

app.use('/posts', postsRoutes)
app.use('/', (req, res) => {
    res.send('Bienvenue sur mon API')
})
//https://mongodb.com/cloud/atlas

// const CONNECTION_URL = "mongodb+srv://billgate:rQDee6uZN3G04ATp@cluster0.gmqfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Serveur demarrer sur le port: ${PORT}`)))
.catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)