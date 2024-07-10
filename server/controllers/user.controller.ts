import dotenv from "dotenv"
dotenv.config()
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/Errorhandler";
import userModel, { IUser } from "../models/user.model";
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { sendMail } from "../utils/sendMail";
import { sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";
import cloudinary from "cloudinary"

interface IRegistrationBody {
    name: string
    email: string
    password: string
    avatar?: string
}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body
        const isEMailExist = await userModel.findOne({email})
        if(isEMailExist){
            return next(new ErrorHandler("Email already exist", 400))
        }

        const user: IRegistrationBody = {name, email, password}
        const activateToken = createActivationToken(user)
        const activationCode = activateToken.activationCode
        const data = {user: {name: user.name}, activationCode}
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your Account",
                template: "activation-mail.ejs",
                data
            })

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your medium account`,
                activationToken: activateToken.token
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}) 

interface IActivationToken {
    token: string
    activationCode: string
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const token = jwt.sign({user, activationCode}, process.env.ACTIVATION_SECRET as Secret, {expiresIn: "5m"})

    return {token, activationCode}
}

interface IActivationRequest {
    activation_token: string
    activation_code: string
}
export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {activation_token, activation_code} = req.body as IActivationRequest

        const newUser: {user: IUser; activationCode: string} = jwt.verify(activation_token, process.env.ACTIVATION_SECRET!) as {user: IUser; activationCode: string}

        if(newUser.activationCode !== activation_code){
            return next(new ErrorHandler("Invalid activation code", 400))
        }

        const {name, email, password} = newUser.user

        const existUser = await userModel.findOne({email})

        if(existUser){
            return next(new ErrorHandler("user already exist", 400))
        }
        const user = await userModel.create({
            name: name, email: email, password: password
        })
        res.status(201).json({
            success: true
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
}) 

interface ILoginRequest {
    email: string
    password: string
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const {email,password} = req.body as ILoginRequest
       if(!email || !password){
        return next(new ErrorHandler("Please enter your email and password", 404))
       }
       const user = await userModel.findOne({email}).select("+password")
       if(!user){
        return next(new ErrorHandler("Invalid email and password", 400))
       }

       const isPasswordMatch = await user.comparePassword(password)
       if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password", 400))
       }

       sendToken(user, 200, res)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
}) 
export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
    res.cookie("access_token", "", {maxAge: 1}) 
    res.cookie("refresh_token", "", {maxAge: 1}) 
            // @ts-ignore
    const userId = req.user?._id || ""
    redis.del(userId)
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))  
    }
}) 
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.user?._id;
        getUserById(userId, res)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}) 
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name} = req.body
        // @ts-ignore
        const userId = req.user?._id;
        const user = await userModel.findById(userId)
        if(name && user){
            user.name = name
        }
        await user?.save()
        await redis.set(userId, JSON.stringify(user))
        res.status(201).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}) 
export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return next(new ErrorHandler("Please provide old and new password", 400))
        }
        // @ts-ignore
        const user = await userModel.findById(req.user?._id).select("+password")

        if(user?.password === undefined){
            return next(new ErrorHandler("Invalid user", 400))
        }

        const isPasswordMatch = await user?.comparePassword(oldPassword)

        if(!isPasswordMatch){
            return next(new ErrorHandler("Invalid old passwprd", 400))
        }

        user.password = newPassword

        await user?.save()
        // @ts-ignore
        await redis.set(req.user?._id, JSON.stringify(user))
        res.status(201).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}) 
export const updateProfilePicture = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {avatar} = req.body
                // @ts-ignore
            const userId = req.user?._id
            const user = await userModel.findById(userId)
            if(avatar && user){
                if(user?.avatar?.public_id){
                    await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)
                    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars",
                        width: 150
                    })
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    }
                } else {
                    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars",
                        width: 150
                    })
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    }
                }
            }

            await user?.save()
            await redis.set(userId, JSON.stringify(user))

            res.status(200).json({
                success: true,
                user
            })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
}) 

export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.headers["refresh_token"] as string
        const decoded = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN!
        ) as JwtPayload

        const message = "Could not refresh token"
        if(!decoded){
            return next(new ErrorHandler(message, 400))
        }
        const session = await redis.get(decoded.id as string)
        if(!session){
            return next(new ErrorHandler("Please login for access this resources", 400))
        }
        const user = JSON.parse(session)
        // @ts-ignore
        req.user = user;
        await redis.set(user._id, JSON.stringify(user), "EX", 604800) // 7 days

        return next()
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})