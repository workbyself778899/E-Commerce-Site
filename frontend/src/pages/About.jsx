import React from "react";
import { FaShoppingCart, FaUsers, FaGlobeAmericas } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen  text-gray-800 flex flex-col items-center justify-center px-6 py-16">
      {/* Container */}
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          About Our <span className="">E-Commerce Platform</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-zinc-500 mb-10">
          Welcome to <span className="font-semibold ">ShopEase</span> — 
          your ultimate online shopping destination!  
          We connect buyers and sellers across the world, making shopping simple, 
          secure, and satisfying. Our platform is built to bring you a seamless 
          experience with smart product recommendations, fast delivery, and reliable support.
        </p>

        {/* Icons Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center">
            <FaShoppingCart className="text-5xl mb-3  drop-shadow-lg" />
            <h3 className="text-2xl font-semibold mb-2 ">Wide Range</h3>
            <p className="text-gray-600 text-base">
              Explore thousands of quality products across various categories.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaUsers className="text-5xl mb-3  drop-shadow-lg" />
            <h3 className="text-2xl font-semibold mb-2 ">Trusted by Many</h3>
            <p className="text-gray-600 text-base">
              Join our growing community of satisfied customers and sellers.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaGlobeAmericas className="text-5xl mb-3  drop-shadow-lg" />
            <h3 className="text-2xl font-semibold mb-2 ">Global Reach</h3>
            <p className="text-gray-600 text-base">
              Shop and sell anywhere with our worldwide delivery service.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 ">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To empower both customers and merchants through innovation and technology.  
            We aim to make online shopping smarter, faster, and more enjoyable for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
