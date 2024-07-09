import express from "express"
import { isAuthenticated } from "../middleware/auth"
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updatePassword, updateProfilePicture, updateUserInfo } from "../controllers/user.controller"

const userRouter = express.Router()

userRouter.post("/registration", registrationUser)
userRouter.post("/activate-user", activateUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout", isAuthenticated,  logoutUser)
userRouter.get("/me", isAuthenticated,  getUserInfo)
userRouter.post("/social-auth", socialAuth)
userRouter.put("/update-user-info",isAuthenticated,  updateUserInfo)
userRouter.put("/update-user-password",isAuthenticated, updatePassword)
userRouter.put("/update-user-avatar",isAuthenticated, updateProfilePicture)

export default userRouter