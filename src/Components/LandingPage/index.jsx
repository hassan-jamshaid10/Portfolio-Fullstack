import React from 'react';
import { FiArrowDown } from 'react-icons/fi'; // React icon for the arrow
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from 'react-icons/fa'; // Icons for social links

const LandingPage = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center w-full text-center space-y-5">
        <h1 className="text-[#48CFCB] text-3xl mb-4">Hello, World.</h1> 
        <h2 className="text-6xl font-bold text-white">I'm Hassan Jamshaid.</h2>
        <p className="text-lg mt-2 tracking-wider text-white">
          | FULL STACK DEVELOPER | UI/UX DESIGNER | 3D Designer |
        </p>

        {/* Button */}
        <button
          className="mt-6 px-8 py-4 text-lg bg-transparent border-2 border-white text-white hover:bg-[#229799] transition-all duration-300 ease-in-out"
        >
          More About Me <FiArrowDown className="inline-block ml-2" />
        </button>
      </div>

      {/* Social Icons on the right side */}
      <div className="flex flex-col items-center justify-center space-y-6 fixed right-0 top-1/2 transform -translate-y-1/2 mr-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaLinkedin size={24} />
        </a>
        <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaCode size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
