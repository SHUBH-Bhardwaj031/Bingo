import React, { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import { auth, googleProvider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

export default function SignUp() {
  const [showPass, setShowPass] = useState(false)
  const [strength, setStrength] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, SetRole] = useState("user")
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)

  const checkStrength = (val) => {
    let score = 0
    if (val.length >= 8) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++
    const levels = [null, 'Weak', 'Fair', 'Good', 'Strong']
    setStrength(val.length === 0 ? null : { score, label: levels[score] })
  }

  const strengthColor = {
    1: 'bg-red-500', 2: 'bg-orange-400',
    3: 'bg-yellow-400', 4: 'bg-green-500'
  }

  const handleSignup = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, { firstName, lastName, phone, email, password, role }, { withCredentials: true })
      console.log(result)
      toast.success("Signup Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Signup failed, try again")
    }
  }

  const handleGoogleSignIn = async (selectedRole) => {
    setShowRoleModal(false)
    setGoogleLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()

      const response = await axios.post(
        `${serverUrl}/api/auth/google`,
        { idToken, role: selectedRole },
        { withCredentials: true }
      )

      console.log(response)
      toast.success("Signed up with Google successfully")
    } catch (error) {
      console.log(error)
      toast.error("Google sign-in failed, try again")
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-5/12 bg-stone-900 flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute w-72 h-72 bg-orange-500 rounded-full -top-16 -right-16 opacity-10" />
        <div className="absolute w-48 h-48 bg-orange-500 rounded-full -bottom-10 -left-10 opacity-[0.07]" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl">🍔</div>
          <span className="text-white text-xl font-medium">Bingo</span>
        </div>

        <div className="z-10">
          <h2 className="text-3xl font-medium text-white leading-snug mb-4">
            Delicious food,<br />
            delivered <span className="text-orange-400">fast.</span>
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            Join thousands of food lovers who trust Bingo for quick, fresh deliveries.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: '⏱', text: '30-minute average delivery' },
              { icon: '📍', text: 'Real-time order tracking' },
              { icon: '🎁', text: 'Exclusive deals for new users' },
              { icon: '🔒', text: 'Safe & secure payments' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/15 flex items-center justify-center text-sm">{f.icon}</div>
                <span className="text-stone-300 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <span className="text-stone-600 text-xs z-10">© 2025 Bingo. All rights reserved.</span>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FFF9F2]">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-2xl font-medium text-stone-900 mb-1">Create your account</h1>
            <p className="text-stone-500 text-sm">Start ordering your favourite food today</p>
          </div>

          {/* Google Button */}
          <button
            onClick={() => setShowRoleModal(true)}
            disabled={googleLoading}
            className="w-full h-11 bg-white border border-stone-200 rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors mb-5 disabled:opacity-60"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400">or sign up with email</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className='text-xs font-medium text-stone-600' htmlFor="First Name">First Name</label>
              <input className='h-11 px-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all' type="text" placeholder='Rahul' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
            </div>
            <div>
              <label className='text-xs font-medium text-stone-600' htmlFor="Last Name">Last Name</label>
              <input className='h-11 px-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all' type="text" placeholder='Sharma' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="rahul@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Phone number</label>
            <div className="flex gap-2">
              <select className="h-11 px-2 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 outline-none focus:border-orange-400 w-20">
                <option>+91</option>
                <option>+1</option>
                <option>+44</option>
              </select>
              <input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 h-11 px-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); checkStrength(e.target.value) }}
                className="w-full h-11 pl-3 pr-10 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {strength && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className={`flex-1 h-1 rounded-full transition-all ${n <= strength.score ? strengthColor[strength.score] : 'bg-stone-200'}`} />
                  ))}
                </div>
                <span className="text-xs text-stone-400">{strength.label}</span>
              </div>
            )}
          </div>

          {/* Role */}

          {/* Role */}
<div className='text-xs font-medium text-stone-600 mb-3'>
  <label htmlFor="role">Role</label>
  <div className='flex gap-2'>
    {[
      { value: "user", label: "Customer" },
      { value: "owner", label: "Owner" },
      { value: "deliveryBoy", label: "Delivery Partner" },
    ].map((r) => (
      <button
        key={r.value}
        type="button"
        className='flex-1 font-medium border rounded-lg px-3 py-2 transition-colors bg-white rounded-xl text-sm cursor-pointer'
        onClick={() => { SetRole(r.value) }}
        style={role === r.value ? { backgroundColor: "#ff4d2d", color: "white" } : { border: `1px solid #ff4d2d`, color: "#ff4d2d" }}
      >
        {r.label}
      </button>
    ))}
  </div>
</div>

          <button className="w-full h-12 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2" onClick={handleSignup}>
            Create account →
          </button>

          <p className="text-center text-sm text-stone-500 mt-5">
            Already have an account?{' '}
            <a href="/signin" className="text-orange-500 font-medium hover:underline">Sign in</a>
          </p>
          <p className="text-center text-[11px] text-stone-400 mt-3">
            By signing up, you agree to our{' '}
            <a href="#" className="underline">Terms</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>
          </p>

        </div>
      </div>

      {/* Role selection modal — shown before Google popup opens */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium text-stone-900 mb-1">Continue as</h3>
            <p className="text-stone-500 text-sm mb-5">Choose how you'll be using Bingo</p>

            <div className="flex flex-col gap-3 mb-5">
              {[
                { value: "user", label: "Customer", desc: "Order food from restaurants", icon: "🍔" },
                { value: "owner", label: "Restaurant Owner", desc: "List and manage your restaurant", icon: "🏪" },
                { value: "deliveryBoy", label: "Delivery Partner", desc: "Deliver orders and earn", icon: "🛵" },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => handleGoogleSignIn(r.value)}
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
              onClick={() => setShowRoleModal(false)}
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