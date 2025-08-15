import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaDownload, FaRocket, FaBrain, FaCode, FaLightbulb } from "react-icons/fa";
import { FiUser, FiAward, FiTarget, FiTrendingUp } from "react-icons/fi";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const downloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/HassanJamshiadResume.pdf";
    link.download = "Hassan_Jamshaid_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const stats = [
    { icon: <FaCode />, number: "20+", label: "Projects Completed", color: "from-blue-400 to-cyan-500" },
    { icon: <FaBrain />, number: "2+", label: "Years Experience", color: "from-purple-400 to-pink-500" },
    { icon: <FaRocket />, number: "100%", label: "Client Satisfaction", color: "from-emerald-400 to-teal-500" },
    { icon: <FaLightbulb />, number: "24/7", label: "Problem Solving", color: "from-orange-400 to-red-500" }
  ];

  const skills = [
    "Full-Stack Development", "AI/ML Engineering", "DevOps & Cloud", 
    "UI/UX Design", "Database Design", "API Development"
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-64 lg:h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <FiUser className="text-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">About Me</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6">
            Let me introduce myself
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            A passionate technologist dedicated to creating innovative digital solutions 
            that transform ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Profile Section */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Image Container */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 mx-auto overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/hassan.jpg"
                  alt="Hassan Jamshaid"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Subtle Floating Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse delay-1000"></div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content Section */}
          <motion.div
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Introduction */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                I'm Hassan, a passionate technologist
              </h2>
              
              <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed">
                <p className="text-base sm:text-lg">
                  I'm a Full Stack Developer, AI Engineer, and ML/DL enthusiast with a passion for 
                  creating innovative digital solutions. My journey in technology has been driven by 
                  curiosity and a desire to solve complex problems.
                </p>
                
                <p className="text-base sm:text-lg">
                  With expertise in React, Spring Boot, Python, and deep learning frameworks, 
                  I specialize in building scalable, intelligent applications that drive business growth 
                  and user engagement.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <FiTarget className="text-cyan-400" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span className="text-sm sm:text-base">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                onClick={downloadCV}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <FaDownload className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm sm:text-base">Download CV</span>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </motion.button>

              <motion.a
                href="mailto:hjamshaid81@gmail.com"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base">Get In Touch</span>
              </motion.a>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4">
              <a
                href="https://github.com/hassan-jamshaid10"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <FaGithub className="text-xl sm:text-2xl text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              
              <div className="hidden sm:block h-8 w-px bg-white/20"></div>
              
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Available for</div>
                <div className="text-cyan-400 text-sm sm:text-base">Freelance & Full-time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
