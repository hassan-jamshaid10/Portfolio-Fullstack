import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Left side - Copyright */}
        <p className="text-gray-400">&copy; 2024 Your Portfolio. All rights reserved.</p>

        {/* Right side - Social media icons */}
        <div className="flex space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://upwork.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <SiUpwork className="text-2xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
