import React from "react";
import { FaSearch, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-red-700 to-zinc-800 text-white px-4 sm:px-6 md:px-10 overflow-hidden relative">
      {/* Floating blurred background blobs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      >
        <div className="absolute -left-32 -top-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-red-500 blur-3xl opacity-50 rotate-12" />
        <div className="absolute -right-40 bottom-0 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-linear-to-tr from-cyan-300 via-sky-500 to-indigo-400 blur-2xl opacity-40 -rotate-6" />
      </div>

      {/* Main container */}
      <div className="max-w-4xl w-full backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-12 md:p-16 relative text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* Left: Icon illustration */}
          <div className="flex items-center justify-center bg-white/10 border border-white/20 rounded-2xl w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <FaSearch className="text-white text-6xl sm:text-7xl md:text-8xl opacity-80" />
          </div>

          {/* Right: Text content */}
          <div className="flex-1">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none tracking-tight mb-4">
              404
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-md mb-6">
              Oops — the page you’re looking for can’t be found.
              <span className="block text-white/80 mt-2">
                But don’t worry — you can return home safely.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium border border-white/30 bg-white/10 hover:bg-green-500 transition-all duration-200"
              >
                Go Back
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium border border-white/30 bg-white/10 hover:bg-blue-500 transition-all duration-200"
              >
                <FaHome />
                Back to Home
              </a>
            </div>

            {/* Tip text */}
            <p className="mt-6 text-sm text-white/70 max-w-md">
              Tip: Double-check the URL or try navigating from the homepage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
