import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/Errorhandler";


export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message ||  "Internal server error"
 // duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 500)
    }
    // wrong jwt error
    if(err === "JsonWebTokenError"){
         const message = `Json web token is invalid, try again`
         err = new ErrorHandler(message, 500)
    }
    // expired jwt error
    if(err === "TokenExpiredError"){
        const message = `Token is expired, Please renew`
        err = new ErrorHandler(message, 500)
   }

   res.status(err.statusCode).json({
    success: false,
    message: err.message
   })
}