import dotenv from "dotenv"
dotenv.config()
import {Redis} from "ioredis"

const redisClient = () => {
    if(process.env.REDIS_URL){
        console.log(`Redis conected`)
        return process.env.REDIS_URL
    }
    throw new Error("REDIS connection failed")
}

export const redis = new Redis(redisClient())
