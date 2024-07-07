import {v2 as cloudinary} from "cloudinary"
import http from "http"
import dotenv from "dotenv"
dotenv.config()
import { app } from "./app"
import { initSocketServer } from "./socketServer"
import connectDB from "./utils/db"

const server = http.createServer(app)


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

initSocketServer(server)


server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is connected to localhost:${process.env.PORT}`)
    connectDB()
})
