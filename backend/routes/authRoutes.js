import express from "express"
import { forgotPassword, Login, Logout, Signup ,verifyEmail, resetPassword} from "../Controllers/auth.controller.js"
const router = express.Router()

router.post("/signup",Signup)
router.post("/verify-email", verifyEmail)
router.post("/login",Login)
router.post("/logout", Logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)



export default router
