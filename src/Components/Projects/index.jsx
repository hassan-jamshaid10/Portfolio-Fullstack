import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiEye, FiCode, FiZap, FiStar } from "react-icons/fi";
import { FaReact, FaNodeJs, FaDatabase, FaAws, FaDocker, FaWordpress } from "react-icons/fa";

const projects = [

  {
    id: 1,
    title: "Pakistan Arab Youth Organization",
    description: "Official website for PAYO built with MERN stack. Features organization information, member profiles, event management, and collaborative youth programs.",
    image: "/payo.png",
    liveLink: "https://payo.org.pk",
    codeLink: "https://github.com/hassan-jamshaid10/payo-website",
    technologies: ["React", "Node.js", "MongoDB", "Express", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Advanced",
    features: ["Organization Information", "Member Profiles", "Event Management", "Youth Programs", "Admin Dashboard"]
  },
  {
    id: 2,
    title: "IEEE Computer Society UCP Chapter",
    description: "Official website for IEEE Computer Society UCP Student Chapter built with MERN stack. Features chapter information, hierarchy, events, and member registration.",
    image: "/ieecs.png",
    liveLink: "https://ieee-ucp.org",
    codeLink: "https://github.com/hassan-jamshaid10/ieee-ucp-website",
    technologies: ["React", "Node.js", "MongoDB", "Express", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Advanced",
    features: ["Chapter Information", "Member Hierarchy", "Event Management", "Registration System", "Admin Panel"]
  },
  {
    id: 3,
    title: "KHAAS Marketing Website",
    description: "Custom WordPress website for KHAAS Marketing agency. Features modern design, service showcase, portfolio, and lead generation capabilities.",
    image: "/khass.png",
    liveLink: "https://khassmarketing.com",
    codeLink: "https://github.com/hassan-jamshaid10/khass-marketing-wp",
    technologies: ["WordPress", "PHP", "MySQL", "Custom Theme", "Plugin Development"],
    category: "WordPress",
    difficulty: "Intermediate",
    features: ["Custom WordPress Theme", "Service Showcase", "Portfolio Gallery", "Lead Generation", "SEO Optimization"]
  },
  {
    id: 4,
    title: "Trade an Idea",
    description: "A comprehensive trading dashboard with real-time market data, portfolio tracking, and advanced charting capabilities. Built for professional traders and investors.",
    image: "/Trade.png",
    liveLink: "https://trade-an-idea.com",
    codeLink: "https://github.com/hassan-jamshaid10/trade-an-idea",
    technologies: ["React", "TypeScript", "WebSocket", "Chart.js", "Node.js"],
    category: "Finance",
    difficulty: "Advanced",
    features: ["Real-time Data", "Portfolio Tracking", "Advanced Charts", "Risk Management", "Alerts System"]
  },
  

  {
    id: 6,
    title: "Pulse AI - Hospital Management",
    description: "AI-powered hospital management platform built with MERN stack and React Native cross-platform mobile app. Streamlines healthcare operations with intelligent automation.",
    image: "/pulse.png",
    liveLink: "https://pulse-ai-hospital.com",
    codeLink: "https://github.com/hassan-jamshaid10/pulse-ai-hospital",
    technologies: ["React", "React Native", "Node.js", "MongoDB", "Express", "AI/ML", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Expert",
    features: ["Patient Management", "AI Diagnosis Support", "Cross-Platform Mobile App", "Electronic Health Records", "Automated Scheduling"]
  },
  {
    id: 7,
    title: "Campus Nest - Hostel Management",
    description: "AI-powered hostel management application built with MERN stack. Features intelligent room allocation, student tracking, and automated administrative tasks.",
    image: "/campus.png",
    liveLink: "https://campus-nest.com",
    codeLink: "https://github.com/hassan-jamshaid10/campus-nest",
    technologies: ["React", "Node.js", "MongoDB", "Express", "AI/ML", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Advanced",
    features: ["Room Management", "Student Registration", "AI-Powered Allocation", "Payment Tracking", "Maintenance Requests"]
  },
  {
    id: 5,
    title: "AI Chat Application",
    description: "An intelligent chat application powered by machine learning algorithms. Features natural language processing, sentiment analysis, and personalized responses.",
    image: "/Messagingapp.png",
    liveLink: "https://ai-chat-demo.com",
    codeLink: "https://github.com/hassan-jamshaid10/ai-chat-app",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    category: "AI/ML",
    difficulty: "Expert",
    features: ["Natural Language Processing", "Sentiment Analysis", "Personalized Responses", "Real-time Chat", "Multi-language Support"]
  },
  {
    id: 8,
    title: "Xora Platform",
    description: "A comprehensive business management platform with CRM, project management, and analytics tools. Designed for small to medium enterprises.",
    image: "/xora.png",
    liveLink: "https://xora-platform.com",
    codeLink: "https://github.com/hassan-jamshaid10/xora-platform",
    technologies: ["React", "Spring Boot", "MySQL", "Docker", "AWS"],
    category: "Enterprise",
    difficulty: "Expert",
    features: ["CRM System", "Project Management", "Analytics Dashboard", "User Management", "API Integration"]
  }
];

const categories = ["All", "Full-Stack", "AI/ML", "WordPress", "Finance", "Enterprise"];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner": return "from-green-400 to-emerald-500";
    case "Intermediate": return "from-yellow-400 to-orange-500";
    case "Advanced": return "from-orange-400 to-red-500";
    case "Expert": return "from-purple-400 to-pink-500";
    default: return "from-gray-400 to-gray-600";
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Full-Stack": return "from-blue-400 to-cyan-500";
    case "AI/ML": return "from-purple-400 to-pink-500";
    case "WordPress": return "from-emerald-400 to-teal-500";
    case "Finance": return "from-yellow-400 to-orange-500";
    case "Enterprise": return "from-red-400 to-pink-500";
    default: return "from-gray-400 to-gray-600";
  }
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLiveDemo = (e) => {
    e.preventDefault();
    if (project.liveLink && project.liveLink !== "#") {
      window.open(project.liveLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleViewCode = (e) => {
    e.preventDefault();
    if (project.codeLink && project.codeLink !== "#") {
      window.open(project.codeLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <motion.button
              onClick={handleLiveDemo}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={!project.liveLink || project.liveLink === "#"}
              title={project.liveLink && project.liveLink !== "#" ? "View Live Demo" : "Demo not available"}
            >
              <FiExternalLink size={20} />
            </motion.button>
            <motion.button
              onClick={handleViewCode}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={!project.codeLink || project.codeLink !== "#"}
              title={project.codeLink && project.codeLink !== "#" ? "View Source Code" : "Code not available"}
            >
              <FiGithub size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-cyan-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-2">
              <FiCode size={14} className="sm:w-4 sm:h-4" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-gray-300 border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-cyan-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-2">
              <FiZap size={14} className="sm:w-4 sm:h-4" />
              Key Features
            </h4>
            <div className="space-y-1 sm:space-y-2">
              {project.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  <span>{feature}</span>
                </div>
              ))}
              {project.features.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{project.features.length - 3} more features
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
                {project.category}
              </span>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(project.difficulty)} text-white`}>
                {project.difficulty}
              </span>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <FiEye className="text-white text-xs sm:text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{
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
            <FiCode className="text-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6">
            Featured Projects
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            A showcase of my best work, demonstrating expertise across various technologies 
            and problem-solving approaches.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
            <FiStar className="text-cyan-400 text-sm sm:text-base" />
            <span className="text-cyan-400 text-xs sm:text-sm">More projects coming soon...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
