
import express, { Request, Response } from "express"
import mongoose from "mongoose"
require("dotenv").config()
const personRoutes = require("./routes/personRoutes")

const app = express()
app.use(express.json())

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ogtqmwz.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  app.listen(3000)
  console.log("Conectado ao MongoDB")
})
.catch(error => console.log(error))

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use("/person", personRoutes)


app.get("/", (request: Request, response: Response) => {
  response.json({ message: "oi, express!" })
})



