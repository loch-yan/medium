import dotenv from "dotenv"
dotenv.config()
import mongoose, { Document, Model, Schema } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const emailRegexPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface IUser extends Document {
    name: string
    email: string
    password: string
    avatar: {
        public_id: string
        url: string
    }
    role: string
    isVerified: boolean
    courses: Array<{courseId: string}>
    comparePassword: (password: string) => Promise<boolean>
    SignAccessToken: () => string
    SignRefreshToken: () => string
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {type: String, required: [true, "Please enter your name"]},
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string){
                return emailRegexPattern.test(value)
            },
            message: "Please enter a valid email address"
        },
        unique: true
    },
    password: {
        type: String,
        minLength: [5, "Password must  be at 6 character long"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {type: Boolean, default: false},
    courses: [{courseId: String}]
    
}, {timestamps: true})

// hash password before saving to DB

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// sign Access token
userSchema.methods.SignAccessToken = function (){
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || "", {
        expiresIn: "5m"
    })
}

// sign refresh token
userSchema.methods.SignAccessToken = function (){
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || "", {
        expiresIn: "3d"
    })
}
// compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
}

const userModel: Model<IUser> = mongoose.model("User", userSchema)

export default userModel