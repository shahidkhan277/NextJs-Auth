// components/Navbar.tsx
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">CoolNextAuthApp</h1>
        <ul className="flex space-x-6 text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-500">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-500">About</Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-blue-500">Services</Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-blue-500">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
