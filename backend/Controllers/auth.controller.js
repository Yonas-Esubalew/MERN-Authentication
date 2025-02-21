import { UserModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export async function Signup(req, res) {
  const { email, name, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const user = new UserModel({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,  //24 hours
    });

    await user.save()


    // jwt 
    generateTokenAndSetCookie(res,user._id)
    res.status(201).json({
      succes: true,
      message: "User created Successfully!",
      user: {
        ...user._doc,
        password: undefined
      }
    }) 

  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
      success: false,
    });
  }
}
export async function Login(req, res) {
  try {
    const {email,password} = req.body

    if(!email || !password){
      res.json({
        message: "Please Fill All required fields"
      })
    }
    return res.json({
      message: "Operation successful",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function Logout(req, res) {
  try {
    return res.json({
      message: "Operation successful",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
