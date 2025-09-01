import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  FiZap, FiArrowDown } from "react-icons/fi";
import {FaRocket, FaBrain, FaCogs, FaMobile, FaWordpress} from "react-icons/fa";
const offeringsData = [
  {
    id: 1,
    title: "Full-Stack Development",
    description: "Expert full-stack web application development using modern technologies. I build both frontend and backend components with scalable architecture, focusing on clean code, best practices, and production-ready solutions.",
    icon: <FaRocket />,
    features: ["React/Next.js Frontend", "Node.js/Spring Boot Backend", "Database Design & Optimization", "API Development", "DevOps & Deployment"],
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    id: 2,
    title: "AI/ML Model Training",
    description: "I provide AI/ML model development and training services using TensorFlow, PyTorch, and OpenCV. My focus is on building practical machine learning solutions, implementing computer vision techniques, and integrating AI into real-world applications.",
    icon: <FaBrain />,
    features: [
      "TensorFlow & PyTorch Model Development",
      "Computer Vision with OpenCV",
      "Data Preprocessing & Cleaning",
      "Model Training & Fine-tuning",
      "AI Integration for Applications"
    ],
    gradient: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    title: "Custom Mobile Development",
    description: "Cross-platform mobile applications using React Native. I'm learning mobile development and focusing on creating responsive, user-friendly mobile experiences.",
    icon: <FaMobile />,
    features: ["React Native Apps", "Mobile UI/UX", "Cross-Platform", "Learning Performance", "Basic Optimization"],
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    id: 4,
    title: "WordPress Development",
    description: "Custom WordPress themes and websites for businesses. I can create custom themes, basic plugins, and help with WordPress customization and optimization.",
    icon: <FaWordpress />,
    features: ["Custom Themes", "Basic Plugins", "WordPress Customization", "SEO Basics", "Performance Optimization"],
    gradient: "from-orange-400 to-red-500"
  },
  {
    id: 5,
    title: "Cloud & DevOps",
    description: "Cloud deployment with best practices using AWS. I have hands on experience with AWS services, Docker containerization, and deployment automation for production applications.",
    icon: <FaCogs />,
    features: ["AWS Cloud Services", "Docker Containerization", "CI/CD Pipelines", "Cloud Monitoring", "Security Best Practices"],
    gradient: "from-indigo-400 to-purple-500"
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "UI/UX design focused on creating clean, functional interfaces. I enjoy designing user-friendly experiences and learning about design principles and user research.",
    icon: <FiZap />,
    features: ["Responsive Design", "Learning User Research", "Basic Prototyping", "Accessibility Basics", "Performance Optimization"],
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
            Professional digital solutions tailored to your needs. 
            I deliver quality applications with expertise in full-stack development, learning AI/ML, and solid cloud deployment skills.
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
