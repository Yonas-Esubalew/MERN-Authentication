import { UserModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetSuccessfulEmail,
} from "../mailtrap/email.js";
//signup
export async function Signup(req, res) {
  const { name, email, password } = req.body;
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
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    // jwt
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created Successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
      success: false,
    });
  }
}
//verifyEmail
export async function verifyEmail(req, res) {
  const { code } = req.body;
  try {
    const user = await UserModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token",
        error: true,
        success: false,
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.name, user.email);
    res.status(200).json({
      message: "Welcome Email verified successfully",
      error: false,
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//
export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        error: true,
        success: false,
      });
    }
    // if (!user.isVerified) {
    //   return res.status(400).json({
    //     message: "First please verify your Email",
    //     error: true,
    //     success: false,
    //   });}
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    return res.status(200).json({
      message: "Login Successfully",
      error: false,
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//logout
export async function Logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout Successfully",
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

//forgot password
export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    return res.status(200).json({
      message: "Password reset link sent to your email",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

//reset password
export async function resetPassword(req, res) {
  const { newPassword, confirmPassword } = req.body;
  try {
    const { token } = req.params;
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Fill All required fields",
        error: true,
        success: false,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "Invalid reset token",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password do not match",
        error: true,
        success: false,
      });
    }
    const hashPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessfulEmail(user.email);
    return res.status(200).json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function checkAuth(req, res) {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    return res.json({
      message: "User is authenticated",
      user,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("Error in checkAuth", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
