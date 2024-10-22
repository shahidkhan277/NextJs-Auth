import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
    {/* Navbar */}
   <Navbar />

    {/* Hero Section */}
    <section className="flex flex-col md:flex-row items-center justify-between py-20 px-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold leading-tight">Welcome to CoolNextAuthApp</h2>
        <p className="text-lg">A simple, beautiful, and secure app for your needs. Get started now and experience seamless authentication.</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <Image
          src="https://via.placeholder.com/500"
          alt="Hero Image"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-10">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="https://via.placeholder.com/150"
              alt="Feature 1"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h4 className="text-xl font-semibold">Secure Authentication</h4>
            <p className="text-center text-gray-600">Authenticate with NextAuth to ensure top-level security.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="https://via.placeholder.com/150"
              alt="Feature 2"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h4 className="text-xl font-semibold">User-Friendly UI</h4>
            <p className="text-center text-gray-600">Sleek and intuitive interface for a great user experience.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="https://via.placeholder.com/150"
              alt="Feature 3"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h4 className="text-xl font-semibold">Fast Performance</h4>
            <p className="text-center text-gray-600">Lightning-fast performance with React and Next.js.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center text-gray-400">
        <p>&copy; 2024 CoolNextAuthApp. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
  );
}
