import React, { useCallback, useEffect, useState } from "react";
import { FiArrowDown, FiCode, FiZap } from "react-icons/fi";
import { FaBrain, FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const skills = [
    { icon: <FiCode size={18} className="sm:w-5 sm:h-5" />, text: "Full-Stack Developer" },
    { icon: <FaBrain size={18} className="sm:w-5 sm:h-5" />, text: "Learning AI/ML" },
    { icon: <FaCogs size={18} className="sm:w-5 sm:h-5" />, text: "AWS & Docker" },
    { icon: <FiZap size={18} className="sm:w-5 sm:h-5" />, text: "UI/UX Design" }
  ];

  return (
    <div className="relative flex flex-col h-screen text-white overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-64 lg:h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Mouse-following element */}
        <div 
          className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl pointer-events-none transition-transform duration-300 ease-out"
  style={{
            left: mousePosition.x - (window.innerWidth < 640 ? 48 : 64),
            top: mousePosition.y - (window.innerWidth < 640 ? 48 : 64),
            transform: 'translate3d(0, 0, 0)'
          }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {['React', 'Node.js', 'Python', 'AI', 'Cloud'].map((tech, index) => (
          <motion.div
            key={tech}
            className="absolute text-cyan-400/20 text-lg sm:text-xl lg:text-2xl font-mono"
            initial={{ opacity: 0, y: 20 }}
  animate={{
              opacity: [0, 0.3, 0],
              y: [20, -20, 20],
              x: [0, 10, 0]
  }}
  transition={{
              duration: 8,
              delay: index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`
            }}
          >
            {tech}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center space-y-6 sm:space-y-8 px-4">
        {/* Greeting */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-cyan-400 text-xs sm:text-sm font-medium">Welcome to the Future</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
  Hello, World.
          </span>
</motion.h1>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            I'm Hassan Jamshaid
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        >
           Full-Stack Developer • Learning AI/ML • Problem Solver
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xs sm:max-w-md lg:max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
        >
          {skills.map((skill, index) => (
            <div
              key={skill.text}
              className="group p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300 font-medium leading-tight">{skill.text}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
  onClick={scrollToAbout}
          className="group relative px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            <span>Explore My World</span>
            <FiArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
</motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}
      >
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
