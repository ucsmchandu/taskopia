import React from "react";

const Footer = () => {
 return (
    <footer className="relative w-full backdrop-blur-xl bg-white/10 border-t border-white/20 text-gray-100 py-16">
      {/* Upper Section */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-10">
        {/* Logo + Tagline */}
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Taskopia
          </h3>
          <p className="text-gray-400 text-sm">
            Your hub for focus, flow, and effortless productivity. Taskopia helps you move from ideas to done with clarity.
          </p>
        </div>

        {/* Product Links */}
       <div className="flex gap-10 justify-center">
         <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-500">Product</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Roadmap</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Integrations</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-500">Company</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Privacy Policy</a></li>
          </ul>
        </div>
       </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/20 mt-12 pt-6 text-center text-gray-400 text-sm">
        © 2025 Taskopia — Built by Chandu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
