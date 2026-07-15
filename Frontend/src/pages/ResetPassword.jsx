import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/resetpassword/${token}`, { password }, { withCredentials: true })
      toast.success("Password reset successfully")
      navigate('/signin')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Reset link is invalid or has expired")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[#FFF9F2]">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-stone-900 mb-1">Set a new password</h1>
          <p className="text-stone-500 text-sm">Make it something you'll remember this time</p>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-stone-600 mb-1.5">New password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-stone-600 mb-1.5">Confirm password</label>
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-11 px-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white rounded-xl text-sm font-medium transition-all disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset password →"}
        </button>
      </div>
    </div>
  )
}