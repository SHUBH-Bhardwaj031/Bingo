import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { serverUrl } from '../App'
import { auth, googleProvider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [pendingIdToken, setPendingIdToken] = useState(null)
  const navigate=useNavigate()
  const { refreshUser } = useAuth();

const handleSignin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, { email, password }, { withCredentials: true })
      console.log(result)

      // Signin API succeeded — now try loading the user profile separately,
      // so a failure here doesn't get wrongly reported as "invalid password"
      try {
        const user = await refreshUser();
        toast.success("Signed in successfully");

        if (user.role === "owner") {
          navigate("/owner");
        } else if (user.role === "deliveryBoy") {
          navigate("/delivery");
        } else {
          navigate("/restaurants");
        }
      } catch (refreshError) {
        console.log("refreshUser error:", refreshError)
        toast.error("Signed in, but couldn't load your profile. Please try refreshing.")
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Email or Password is Invalid!")
    }
  }

  // STEP 1 — Google popup opens immediately, before we know if user is new or existing
  const handleGoogleClick = async () => {
    setGoogleLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()

      // STEP 2 — ask backend: does this email already exist?
      const checkResponse = await axios.post(
        `${serverUrl}/api/auth/google-check`,
        { idToken },
        { withCredentials: true }
      )

      if (checkResponse.data.isNewUser) {
        // STEP 3a — new user -> ask which role before creating the account
        setPendingIdToken(idToken)
        setShowRoleModal(true)
        setGoogleLoading(false)
      } else {
        // STEP 3b — existing user -> just log them in directly
        await completeGoogleSignIn(idToken, null)
      }
    } catch (error) {
      console.log(error)
      toast.error("Google sign-in failed, try again")
      setGoogleLoading(false)
    }
  }

  // STEP 4 — called either directly (existing user) or after role is picked (new user)
  const completeGoogleSignIn = async (idToken, role) => {
    setShowRoleModal(false)
    setGoogleLoading(true)
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/google`,
        { idToken, role },
        { withCredentials: true }
      )
      console.log(response)

      try {
        const user = await refreshUser();
        toast.success("Signed in with Google successfully")

        if (user.role === "owner") {
          navigate("/owner");
        } else if (user.role === "deliveryBoy") {
          navigate("/delivery");
        } else {
          navigate("/restaurants");
        }
      } catch (refreshError) {
        console.log("refreshUser error:", refreshError)
        toast.error("Signed in, but couldn't load your profile. Please try refreshing.")
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Google sign-in failed, try again")
    } finally {
      setGoogleLoading(false)
      setPendingIdToken(null)
    }
  }

  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-5/12 bg-stone-900 flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-orange-500 rounded-full -top-16 -right-16 opacity-10" />
        <div className="absolute w-40 h-40 bg-orange-500 rounded-full -bottom-8 -left-10 opacity-[0.07]" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl">🍔</div>
          <span className="text-white text-xl font-medium">Bingo</span>
        </div>

        <div className="z-10">
          <h2 className="text-3xl font-medium text-white leading-snug mb-4">
            Welcome <span className="text-orange-400">back,</span><br />
            hungry one.
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            Your favourite restaurants are waiting. Sign in and get your order delivered in minutes.
          </p>

          {/* Last Order Card */}
          <div className="bg-stone-800 rounded-xl p-4 flex items-center gap-3 border border-stone-700">
            <div className="w-10 h-10 bg-orange-500/15 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🍕</div>
            <div>
              <p className="text-stone-500 text-xs mb-0.5">Last order</p>
              <p className="text-stone-200 text-sm font-medium">Paneer Pizza + Garlic Bread</p>
            </div>
            <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full whitespace-nowrap">
              Delivered
            </span>
          </div>
        </div>

        <span className="text-stone-600 text-xs z-10">© 2025 Bingo. All rights reserved.</span>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FFF9F2]">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-2xl font-medium text-stone-900 mb-1">Sign in to Bingo</h1>
            <p className="text-stone-500 text-sm">Enter your credentials to continue</p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleClick}
            disabled={googleLoading}
            className="w-full h-11 bg-white border border-stone-200 rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors mb-5 disabled:opacity-60"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400">or sign in with email</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Email address</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-stone-400 text-base pointer-events-none">✉</span>
              <input
                type="email"
                placeholder="rahul@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-9 pr-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-stone-400 text-base pointer-events-none">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-9 pr-10 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 text-stone-400 hover:text-stone-600"
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-orange-500 w-3.5 h-3.5"
              />
              Remember me
            </label>
            <a href="/forgotpaasword" className="text-xs text-orange-500 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            onClick={handleSignin}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            Sign in →
          </button>

          <p className="text-center text-sm text-stone-500 mt-5">
            New to Bingo?{' '}
            <a href="/signup" className="text-orange-500 font-medium hover:underline">Create account</a>
          </p>

        </div>
      </div>

      {/* Role selection modal — only shown for brand-new Google users */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium text-stone-900 mb-1">Continue as</h3>
            <p className="text-stone-500 text-sm mb-5">Looks like you're new here — choose how you'll use Bingo</p>

            <div className="flex flex-col gap-3 mb-5">
              {[
                { value: "user", label: "Customer", desc: "Order food from restaurants", icon: "🍔" },
                { value: "owner", label: "Restaurant Owner", desc: "List and manage your restaurant", icon: "🏪" },
                { value: "deliveryBoy", label: "Delivery Partner", desc: "Deliver orders and earn", icon: "🛵" },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => completeGoogleSignIn(pendingIdToken, r.value)}
                  className="flex items-center gap-3 border border-stone-200 rounded-xl p-3 hover:border-orange-400 hover:bg-orange-50/50 transition-colors text-left"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-stone-800">{r.label}</p>
                    <p className="text-xs text-stone-500">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => { setShowRoleModal(false); setPendingIdToken(null) }}
              className="w-full text-center text-sm text-stone-500 hover:text-stone-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}