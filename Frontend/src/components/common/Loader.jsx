import React from 'react'

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF9F2] gap-4">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-stone-500 text-sm font-medium animate-pulse">Loading...</p>
    </div>
  )
}