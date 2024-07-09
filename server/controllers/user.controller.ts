import dotenv from "dotenv"
dotenv.config()
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/Errorhandler";
import userModel from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken"
import { sendMail } from "../utils/sendMail";


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
export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 
export const updateProfilePicture = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
}) 

export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    
})