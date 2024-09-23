import React from 'react';
import { FiArrowDown } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const LandingPage = () => {
  return (
    <div className="relative flex flex-col h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-5">
        <h1 className="text-[#48CFCB] text-3xl mb-4">Hello, World.</h1>
        <h2 className="text-6xl md:text-6xl font-bold text-white">I'm Hassan Jamshaid.</h2> {/* Adjusted for mobile view */}
        <p className="text-lg mt-2 tracking-wider text-white">
          | FULL STACK DEVELOPER | UI/UX DESIGNER | 3D DESIGNER |
        </p>

        {/* Button */}
        <button
          className="mt-6 px-8 py-4 text-lg bg-transparent border-2 border-white text-white hover:bg-[#229799] transition-all duration-300 ease-in-out"
        >
          More About Me <FiArrowDown className="inline-block ml-2" />
        </button>
      </div>

      {/* Social Icons with increased spacing */}
      <div className="flex justify-center space-x-6 absolute bottom-4 w-full">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaLinkedin size={24} />
        </a>
        <a href="https://upwork.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <SiUpwork size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#229799] transition-colors duration-300">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
