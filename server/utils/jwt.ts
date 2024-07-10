import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken()
    // setting our cache here => uploading session to redis
    redis.set(user._id, JSON.stringify(user) as any)

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        refreshToken
    })
}