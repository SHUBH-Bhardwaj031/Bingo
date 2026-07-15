import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { serverUrl } from '../App'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email")
      return
    }
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/forgotpassword`, { email }, { withCredentials: true })
      console.log(result)
      toast.success("Reset link sent to your email")
      setSent(true)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
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
            Forgot your <span className="text-orange-400">password?</span><br />
            No worries.
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            Enter the email linked to your account and we'll send you a link to get back in.
          </p>

          {/* Info Card */}
          <div className="bg-stone-800 rounded-xl p-4 flex items-center gap-3 border border-stone-700">
            <div className="w-10 h-10 bg-orange-500/15 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🔑</div>
            <div>
              <p className="text-stone-500 text-xs mb-0.5">Tip</p>
              <p className="text-stone-200 text-sm font-medium">Check your spam folder too</p>
            </div>
          </div>
        </div>

        <span className="text-stone-600 text-xs z-10">© 2025 Bingo. All rights reserved.</span>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FFF9F2]">
        <div className="w-full max-w-md">

          {!sent ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-medium text-stone-900 mb-1">Reset your password</h1>
                <p className="text-stone-500 text-sm">Enter your email and we'll send you a reset link</p>
              </div>

              {/* Email */}
              <div className="mb-6">
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

              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:active:scale-100"
              >
                {loading ? "Sending..." : "Send reset link →"}
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-500/15 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📩</div>
              <h1 className="text-2xl font-medium text-stone-900 mb-2">Check your inbox</h1>
              <p className="text-stone-500 text-sm mb-6">
                We've sent a password reset link to <span className="text-stone-800 font-medium">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="w-full h-12 bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 rounded-xl text-sm font-medium transition-all"
              >
                Use a different email
              </button>
            </div>
          )}

          <p className="text-center text-sm text-stone-500 mt-6">
            Remembered your password?{' '}
            <a href="/signin" className="text-orange-500 font-medium hover:underline">Back to sign in</a>
          </p>

        </div>
      </div>
    </div>
  )
}