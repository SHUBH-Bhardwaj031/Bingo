import User from "../models/user.model.js"
import genToken from "../utils/token.js"
import bcrypt from "bcryptjs"
import crypto from 'crypto'
import { sendResetEmail } from '../utils/mailer.js'
import { getFirebaseAuth } from '../config/firebaseAdmin.js'
import jwt from 'jsonwebtoken'

// Cookie options — production (cross-domain: Vercel + Render) vs local dev
const isProd = process.env.NODE_ENV === "production"
const cookieOptions = {
  httpOnly: true,
  secure: isProd,                    // true on Render (HTTPS), false on localhost (HTTP)
  sameSite: isProd ? "none" : "lax", // "none" needed for cross-site cookies in prod
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." })
    }

    const existingPhone = await User.findOne({ phone })
    if (existingPhone) {
      return res.status(400).json({ message: "This phone number is already registered." })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." })
    }
    if (phone.length < 10) {
      return res.status(400).json({ message: "Please enter a 10 digit number." })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      phone,
    })

    const token = await genToken(user._id)
    res.cookie("token", token, cookieOptions)

    res.status(201).json(user)
  } catch (error) {
    console.log("SIGNUP ERROR:", error)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]
      return res.status(400).json({ message: `This ${field} is already registered.` })
    }
    res.status(500).json({ message: `Signup Error: ${error.message}` })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User does not exist." })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(400).json({ message: "Password is incorrect." })
    }

    const token = await genToken(user._id)
    res.cookie("token", token, cookieOptions)

    res.status(200).json(user)
  } catch (error) {
    console.log("SIGNIN ERROR:", error)
    res.status(500).json({ message: `SignIn Error: ${error.message}` })
  }
}

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions)
    return res.status(200).json({ message: "User logged out successfully" })
  } catch (error) {
    return res.status(500).json({ message: `Log out error: ${error.message}` })
  }
}

// STEP 1: user submits email -> we generate token, save it, email a link
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent' })
    }

    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    await user.save()

    const resetLink = `${process.env.CLIENT_URL}/resetpassword/${rawToken}`
    await sendResetEmail(email, resetLink)

    return res.status(200).json({ message: 'Reset link sent to your email' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong, try again' })
  }
}

// STEP 2: user clicks link -> submits new password + token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong, try again' })
  }
}

export const googleSignIn = async (req, res) => {
  try {
    const { idToken, role } = req.body

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' })
    }

    const firebaseAuth = getFirebaseAuth()
    const decoded = await firebaseAuth.verifyIdToken(idToken)
    const { email, name, picture, uid } = decoded

    let user = await User.findOne({ email })

    if (!user) {
      const [firstName, ...rest] = (name || "User").split(" ")
      const lastName = rest.join(" ") || "Google"

      user = await User.create({
        firstName,
        lastName,
        email,
        phone: `google_${uid}`,
        password: undefined,
        image: picture,
        role: role || "user",
        signInMethod: 'google',
      })
    }

    const token = await genToken(user._id)
    res.cookie("token", token, cookieOptions)

    return res.status(200).json(user)
  } catch (error) {
    console.log("GOOGLE SIGNIN ERROR:", error)
    return res.status(500).json({ message: `Google SignIn Error: ${error.message}` })
  }
}

export const googleCheckUser = async (req, res) => {
  try {
    const { idToken } = req.body

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' })
    }

    const firebaseAuth = getFirebaseAuth()
    const decoded = await firebaseAuth.verifyIdToken(idToken)
    const { email } = decoded

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(200).json({ isNewUser: false })
    }

    return res.status(200).json({ isNewUser: true })
  } catch (error) {
    console.log("GOOGLE CHECK ERROR:", error)
    return res.status(500).json({ message: 'Something went wrong, try again' })
  }
}

/* ==========================================
   Get Current Logged In User
========================================== */

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};