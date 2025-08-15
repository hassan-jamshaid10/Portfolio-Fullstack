import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaRocket, FaHeart } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      url: "https://github.com/hassan-jamshaid10",
      color: "from-gray-400 to-gray-600",
      hoverColor: "from-white to-gray-300"
    },
    {
      name: "Upwork",
      icon: <SiUpwork size={20} />,
      url: "https://www.upwork.com/freelancers/~017d58238682e54ca8?mp_source=share",
      color: "from-green-400 to-emerald-600",
      hoverColor: "from-green-300 to-emerald-500"
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={20} />,
      url: "https://www.instagram.com/hassan_.jamshaid/?__pwa=1",
      color: "from-pink-400 to-rose-600",
      hoverColor: "from-pink-300 to-rose-500"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/hassanjamshaid10",
      color: "from-blue-400 to-indigo-600",
      hoverColor: "from-blue-300 to-indigo-500"
    }
  ];

  return (
    <footer className="relative py-12 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <FaRocket className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                Hassan Jamshaid
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Full-stack developer passionate about creating innovative digital solutions 
              that transform ideas into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Services', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-2 text-gray-400">
              <p>📍 Lahore, Punjab, Pakistan</p>
              <p>📧 hjamshaid81@gmail.com</p>
              <p>📱 (+92) 312 4384133</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} | Designed with{' '}
              <FaHeart className="inline text-red-400 animate-pulse" /> by{' '}
              <span className="text-cyan-400 font-medium">Hassan Jamshaid</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110 hover:border-white/20`}
                aria-label={`${social.name} Profile`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon Background */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative text-gray-400 group-hover:text-white transition-colors duration-300`}>
                  {social.icon}
                </div>
                
                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.hoverColor} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}></div>
              </a>
            ))}
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToTop}
            className="group px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl text-cyan-400 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30"
          >
            <div className="flex items-center gap-2">
              <FiArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Back to Top</span>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-4 left-4 opacity-20">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-4 right-4 opacity-20">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
      </div>
    </footer>
  );
};

export default Footer;
