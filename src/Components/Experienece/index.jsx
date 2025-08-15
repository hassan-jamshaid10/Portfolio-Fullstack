import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink, FiTrendingUp, FiCode, FiUsers, FiGlobe } from "react-icons/fi";
import { FaRocket, FaBrain, FaCogs } from "react-icons/fa";

const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "Netsol Technologies",
    date: "July 2024 - September 2024",
    logo: "./netsollogo.png",
    description: "Developed and maintained full-stack web applications, leveraging React for dynamic, responsive front-end interfaces and Spring Boot for robust, scalable back-end services. Designed and implemented RESTful APIs, optimized database interactions, and ensured high-performance application delivery through clean, maintainable code and industry best practices.",
    skills: ["React", "Spring Boot", "REST APIs", "Database Design"],
    type: "Corporate",
    icon: <FiCode />,
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    role: "Tech Lead – Web & Digital Infrastructure",
    company: "Pakistan Arab Youth Organization",
    date: "April 2025 - Present",
    logo: "/payologo.png",
    description: "Designed and developed the organization's official website, ensuring a modern, user-friendly interface and seamless functionality. Oversaw and maintained all aspects of the organization's digital infrastructure, including strategic management of social media platforms to enhance brand presence, engagement, and outreach.",
    skills: ["Web Development", "Digital Strategy", "Social Media", "Brand Management"],
    type: "Leadership",
    icon: <FiUsers />,
    gradient: "from-purple-400 to-pink-500"
  },
  {
    role: "Webmaster",
    company: "IEEE Computer Society – UCP Student Chapter",
    date: "October 2024 - Present",
    logo: "/Logo2.png",
    description: "Designed, developed, and maintained the IEEE Computer Society UCP Student Chapter's official website, ensuring an intuitive user experience and consistent branding. Collaborated with the executive team to integrate event updates, resources, and multimedia content, enhancing the chapter's online presence and member engagement.",
    skills: ["Website Management", "Event Integration", "Content Management", "User Experience"],
    type: "Academic",
    icon: <FiGlobe />,
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    role: "Freelance Developer",
    company: "International Clients",
    date: "2023 - Present",
    logo: "https://cdn.dribbble.com/users/2059160/screenshots/4413086/media/2dfeaf608392e326b8078431e1ac9f37.jpg?resize=400x300&vertical=center",
    description: "Providing custom software solutions to clients internationally through Fiverr, Upwork, and local projects. Focused on creating responsive, high-performance web applications and implementing tailored features to address specific business requirements, ensuring exceptional client satisfaction and long-term partnerships.",
    skills: ["Custom Solutions", "Client Management", "Performance Optimization", "Business Requirements"],
    type: "Freelance",
    icon: <FaRocket />,
    gradient: "from-orange-400 to-red-500"
  }
];

const ExperienceCard = ({ exp, index, isLast }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    {/* Timeline Line */}
    {!isLast && (
      <div className="absolute left-4 sm:left-8 top-16 sm:top-20 w-0.5 h-16 sm:h-20 bg-gradient-to-b from-cyan-400 to-transparent"></div>
    )}

    {/* Card */}
    <div className="relative p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        {/* Icon Container */}
        <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
          {exp.icon}
        </div>

        {/* Company Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300 leading-tight">
              {exp.role}
            </h3>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.gradient} text-white w-fit`}>
              {exp.type}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 mb-2">
            <div className="flex items-center gap-2">
              <FiBriefcase className="text-cyan-400 text-sm sm:text-base" />
              <span className="font-medium text-sm sm:text-base">{exp.company}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-purple-400" />
              <span>{exp.date}</span>
            </div>
          </div>
        </div>
        </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6">
        {exp.description}
      </p>

      {/* Skills */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-cyan-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-2">
          <FiTrendingUp size={14} className="sm:w-4 sm:h-4" />
          Key Skills & Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-gray-300 border border-white/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Company Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
                  src={exp.logo}
                  alt={exp.company}
            className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-lg border border-white/20"
          />
          <span className="text-xs sm:text-sm text-gray-400 hidden sm:block">Company Logo</span>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
            <FiExternalLink className="text-white text-xs sm:text-sm" />
          </div>
                </div>
              </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}></div>
    </div>
            </motion.div>
);

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="experience" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{
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

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <FiBriefcase className="text-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Experience</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6">
            My Professional Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            A timeline of my professional growth, showcasing diverse experiences 
            across corporate, academic, and freelance environments.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Center Timeline - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500"></div>
          
          {/* Experience Cards */}
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-full lg:w-5/12 ${
                  index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
                }`}>
                  <ExperienceCard 
                    exp={exp} 
                    index={index} 
                    isLast={index === experiences.length - 1}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
            <FaRocket className="text-cyan-400 text-sm sm:text-base" />
            <span className="text-cyan-400 text-xs sm:text-sm">More opportunities coming soon...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
