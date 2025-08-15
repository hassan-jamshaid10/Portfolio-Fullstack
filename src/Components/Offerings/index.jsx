import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  FiZap, FiArrowDown } from "react-icons/fi";
import {FaRocket, FaBrain, FaCogs, FaMobile, FaWordpress} from "react-icons/fa";
const offeringsData = [
  {
    id: 1,
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern technologies. From concept to deployment, I handle both frontend and backend development with scalable architecture.",
    icon: <FaRocket />,
    features: ["React/Next.js Frontend", "Node.js/Spring Boot Backend", "Database Design & Optimization", "API Development", "DevOps & Deployment"],
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    id: 2,
    title: "AI/ML Model Training",
    description: "Custom artificial intelligence and machine learning model development and training. Specialized in creating intelligent solutions for business automation and data analysis.",
    icon: <FaBrain />,
    features: ["Custom ML Models", "Deep Learning", "Data Preprocessing", "Model Training", "Performance Optimization"],
    gradient: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    title: "Custom Mobile Web",
    description: "Responsive mobile-first web applications that work seamlessly across all devices. Optimized for mobile performance and user experience.",
    icon: <FaMobile />,
    features: ["Mobile-First Design", "Progressive Web Apps", "Touch Optimization", "Performance Tuning", "Cross-Platform"],
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    id: 4,
    title: "WordPress Development",
    description: "Custom WordPress themes, plugins, and websites tailored to your business needs. From simple blogs to complex e-commerce solutions.",
    icon: <FaWordpress />,
    features: ["Custom Themes", "Plugin Development", "E-commerce Integration", "SEO Optimization", "Performance Tuning"],
    gradient: "from-orange-400 to-red-500"
  },
  {
    id: 5,
    title: "Cloud & DevOps",
    description: "Cloud infrastructure setup, CI/CD pipelines, and DevOps automation to ensure reliable, scalable, and secure application deployment.",
    icon: <FaCogs />,
    features: ["AWS/Azure Setup", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring & Logging", "Security & Compliance"],
    gradient: "from-indigo-400 to-purple-500"
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "User-centered design solutions that combine aesthetics with functionality, creating intuitive and engaging user experiences across all devices.",
    icon: <FiZap />,
    features: ["Responsive Design", "User Research", "Prototyping", "Accessibility", "Performance Optimization"],
    gradient: "from-cyan-400 to-blue-500"
  }
];

const Offerings = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="services" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{
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
            <FaRocket className="text-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6">
            What I Offer
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive digital solutions tailored to your business needs. 
            From development to deployment, I ensure quality and innovation at every step.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {offeringsData.map((offering, index) => (
            <div
              key={offering.id}
              className={`group relative p-6 sm:p-8 rounded-2xl transition-all duration-700 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(offering.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${offering.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {offering.icon}
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${offering.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                  {offering.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  {offering.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {offering.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                    <FiArrowDown className="text-white text-xs sm:text-sm" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Button Content */}
            <div className="relative flex items-center gap-2 sm:gap-3">
              <span className="text-sm sm:text-base">Contact Me</span>
              <FiArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Offerings;
