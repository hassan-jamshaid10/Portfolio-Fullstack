import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side - Copyright */}
        <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} My Portfolio | Designed By <a className="text-white hover:text-[#48CFCB]" href="#!">Hassan</a>
        </p>

        {/* Right side - Social media icons */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="https://github.com/hassan-jamshaid10" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://www.upwork.com/freelancers/~017d58238682e54ca8?mp_source=share" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <SiUpwork className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/hassan_.jamshaid/?__pwa=1" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/hassanjamshaid10" target="_blank" rel="noopener noreferrer" className="hover:text-[#48CFCB]">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
