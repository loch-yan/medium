import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser"
import { rateLimit } from "express-rate-limit"
import { ErrorMiddleware } from "./middleware/error"

export const app = express()


app.use(express.json({ limit: "50mb" }))

app.use(cookieParser())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false
})

// app.use("/api/v1", )


app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    })
})


app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any
    err.StatusCode = 400
    next(err)
})



app.use(limiter)
app.use(ErrorMiddleware)