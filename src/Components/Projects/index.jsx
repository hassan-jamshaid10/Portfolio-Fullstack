import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiEye, FiCode, FiZap, FiStar, FiX, FiCalendar, FiUser } from "react-icons/fi";
import { FaReact, FaNodeJs, FaDatabase, FaAws, FaDocker, FaWordpress } from "react-icons/fa";

const projects = [

  {
    id: 1,
    title: "Pakistan Arab Youth Organization",
    description: "Official website for PAYO built with MERN stack. This was my first major full-stack project where I learned to integrate frontend and backend, implement user authentication, and manage dynamic content.",
    image: "/payo.png",
    liveLink: "https://payo.org.pk",
    codeLink: "https://pakarabyouthorg.vercel.app/",
    technologies: ["React", "Node.js", "MongoDB", "Express", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Intermediate",
    features: ["Organization Information", "Member Profiles", "Event Management", "Youth Programs", "Admin Dashboard"]
  },
  {
    id: 2,
    title: "IEEE Computer Society UCP Chapter",
    description: "Official website for IEEE Computer Society UCP Student Chapter built with MERN stack. This project helped me understand content management, event integration, and working with organizational requirements.",
    image: "/ieecs.png",
    liveLink: "https://ieee-ucp.org",
    codeLink: "https://ieeecsucp.vercel.app/",
    technologies: ["React", "Node.js", "MongoDB", "Express", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Intermediate",
    features: ["Chapter Information", "Member Hierarchy", "Event Management", "Registration System", "Admin Panel"]
  },
  {
  "id": 10,
  "title": "Codebase AI - The AI Code Explainer",
  "description": "Codebase AI is an advanced AI-powered platform that helps developers understand complex codebases using Retrieval-Augmented Generation (RAG). It enables repository loading, multi-language code analysis, and intelligent Q&A with real-time explanations.",
  "image": "/image.png",
  "liveLink": "#",
  "codeLink": "https://github.com/hassan-jamshaid10/CodebaseAI.git",
  "technologies": [
    "React.js",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "FastAPI",
    "Python",
    "LangChain",
    "ChromaDB",
    "HuggingFace Transformers",
    "RAG"
  ],
  "category": "AI / Full-Stack",
  "difficulty": "Advanced",
  "features": [
    "AI-Powered Code Understanding",
    "RAG Implementation with Vector Search",
    "Multi-Language Code Support",
    "Repository Loader & File Analysis",
    "LLM-Based Q&A System",
    "Modern Animated UI/UX",
    "FastAPI Backend with Swagger Docs",
    "Secure and Scalable Architecture"
  ]
},

   {
    id: 6,
    title: "Trade an Idea",
    description: "Trade an Idea is a platform where users can share and discuss innovative ideas. Features authentication with OTP verification, categorized idea submissions based on SDGs, and AI-powered originality checks using a fine-tuned LiteLlama model. Built with React.js frontend and Node.js/Express backend with MySQL database.",
    image: "/Trade.png",
    liveLink: "https://trade-an-idea.com",
    codeLink: "https://github.com/hassan-jamshaid10/TradeAnIdea.git",
    technologies: ["React.js", "Node.js", "Express.js", "MySQL", "LiteLlama", "TensorFlow", "PyTorch"],
    category: "Full-Stack",
    difficulty: "Advanced",
    features: ["OTP Authentication", "AI Originality Check", "SDG Categorization", "Idea Submission", "User Comments", "Profile Management"]
  },
   {
    id: 8,
    title: "Campus Nest - Hostel Management",
    description: "Hostel management application built with MERN stack. This project helped me understand database design for complex systems and learn about automated processes. I'm working on adding more intelligent features.",
    image: "/campus.png",
    liveLink: "https://campus-nest.com",
    codeLink: "https://github.com/Talhabadar184/Campusnest.git",
    technologies: ["React", "Node.js", "MongoDB", "Express", "AI/ML", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Intermediate",
    features: ["Room Management", "Student Registration", "AI-Powered Allocation", "Payment Tracking", "Maintenance Requests"]
  },
   {
    id: 7,
    title: "Pulse AI - Hospital Management",
    description: "Hospital management platform built with MERN stack and React Native. This project was my introduction to mobile development and learning about healthcare system requirements. I'm still exploring AI integration possibilities.",
    image: "/pulse.png",
    liveLink: "https://pulse-ai-hospital.com",
    codeLink: "https://github.com/hassan-jamshaid10/pulse-ai-hospital",
    technologies: ["React", "React Native", "Node.js", "MongoDB", "Express", "AI/ML", "MERN Stack"],
    category: "Full-Stack",
    difficulty: "Advanced",
    features: ["Patient Management", "AI Diagnosis Support", "Cross-Platform Mobile App", "Electronic Health Records", "Automated Scheduling"]
  },
 
  {
    id: 3,
    title: "KHAAS Marketing Website",
    description: "A custom WordPress theme for KHAAS Marketing - lightweight, responsive, SEO-friendly, and performance-optimized. Features Contact Form 7 integration, Newsletter functionality, AOS scroll animations, and comprehensive plugin support including Yoast SEO, LiteSpeed Cache, and security plugins.",
    image: "/khass.png",
    liveLink: "https://khaasmarketing.com",
    codeLink: "https://khaasmarketing.com",
    technologies: ["WordPress", "PHP", "MySQL", "Contact Form 7", "Yoast SEO", "AOS.js", "LiteSpeed Cache"],
    category: "WordPress",
    difficulty: "Advanced",
    features: ["Custom Theme", "Contact Form 7", "Newsletter Integration", "AOS Animations", "SEO Optimized", "Performance Optimized", "Security Ready", "Responsive Design"]
  },
  {
    id: 5,
    title: "Idea Prediction Model - Project Classification",
    description: "Fine-tuned LiteLlama-460M-1T model for binary classification of project ideas as 'Original' or 'Repeated'. Achieved >90% accuracy using TensorFlow/PyTorch with cosine learning rate scheduler and gradient clipping. Built for assessing project feasibility and originality.",
    image: "/p1.jpg",
    liveLink: "#",
    codeLink: "https://github.com/hassan-jamshaid10/Trained-Model.git",
    technologies: ["Python", "TensorFlow", "PyTorch", "Transformers", "HuggingFace", "LiteLlama"],
    category: "AI/ML",
    difficulty: "Advanced",
    features: ["Binary Classification", "Fine-tuned LiteLlama", "78%+ Accuracy", "Cosine Scheduler", "Gradient Clipping", "Project Feasibility Assessment"]
  },
  {
    id: 4,
    title: "Face Detection & Personality Analysis",
    description: "Computer vision application using OpenCV for real-time face detection combined with personality trait analysis. Integrates facial recognition with machine learning models to predict personality characteristics and behavioral patterns from facial features.",
    image: "/f1.png",
    liveLink: "#",
    codeLink: "https://github.com/hassan-jamshaid10/FaceDetection-PersonlaityCheck-using-Salesforce-blip-image-captioning-base-Model.git",
    technologies: ["Python", "OpenCV", "TensorFlow", "Computer Vision", "Machine Learning", "Real-time Processing"],
    category: "AI/ML",
    difficulty: "Advanced",
    features: ["Real-time Face Detection", "Personality Analysis", "Computer Vision", "OpenCV Integration", "Behavioral Prediction", "Facial Feature Analysis"]
  },
 
 {
  "id": 9,
  "title": "Ecommerce Management System",
  "description": "A full-stack eCommerce management application built with React.js, Vite, Ant Design, and Tailwind CSS. The system includes user authentication and CRUD operations on products fetched from an external API.",
  "image": "/Ecommerce.png",
  "liveLink": "#",
  "codeLink": "https://github.com/hassan-jamshaid10/Ecommerce-Product-Management.git",
  "technologies": ["React.js", "Vite", "Ant Design", "Tailwind CSS", "REST API"],
  "category": "Full-Stack",
  "difficulty": "Intermediate",
  "features": [
    "User Authentication (Login/Signup)",
    "Product CRUD Operations",
    "Responsive UI Design",
    "API Integration (freeapi)",
    "Scalable Frontend Architecture"
  ]
},
  
  
 
 
  {
    id: 9,
    title: "AI Chat Application",
    description: "A comprehensive messaging app built with React.js, Vite, Material UI, and Tailwind CSS. Features user authentication, real-time chat capabilities, group conversations, contact management, call logs, and an AI assistant powered by Gemini. Includes voice calls, file sharing, and a customizable settings page.",
    image: "/Messagingapp.png",
    liveLink: "https://ai-chat-demo.com",
    codeLink: "https://github.com/hassan-jamshaid10/MessagingAPP.git",
    technologies: ["React.js", "Vite", "Material UI", "Tailwind CSS", "Socket.IO", "Gemini AI"],
    category: "Full-Stack",
    difficulty: "Advanced",
    features: ["Real-time Messaging", "User Authentication", "Group Chat", "Voice Calls", "File Sharing", "AI Assistant", "Contact Management", "Call Logs"]
  },

];

const categories = ["All", "Full-Stack", "AI/ML", "WordPress", "Frontend"];

// Memoized utility functions for better performance
const getDifficultyColor = (difficulty) => {
  const colorMap = {
    "Beginner": "from-green-400 to-emerald-500",
    "Intermediate": "from-yellow-400 to-orange-500",
    "Advanced": "from-orange-400 to-red-500",
    "Expert": "from-purple-400 to-pink-500"
  };
  return colorMap[difficulty] || "from-gray-400 to-gray-600";
};

const getCategoryColor = (category) => {
  const colorMap = {
    "Full-Stack": "from-blue-400 to-cyan-500",
    "AI/ML": "from-purple-400 to-pink-500",
    "WordPress": "from-emerald-400 to-teal-500",
    "Frontend": "from-orange-400 to-red-500"
  };
  return colorMap[category] || "from-gray-400 to-gray-600";
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-2 sm:p-4 pt-16 sm:pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
                            <motion.div
            className="relative w-full max-w-6xl mx-2 sm:mx-4 max-h-[85vh] sm:max-h-[95vh] overflow-y-auto bg-gray-900 rounded-xl sm:rounded-2xl border border-white/20 z-[10000] mt-4 sm:mt-0"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-4 sm:p-6 border-b border-white/10">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <FiX className="text-white" size={18} />
              </button>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pr-12">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-white/20 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}>
                      {project.category}
                    </span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${getDifficultyColor(project.difficulty)} text-white`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{project.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Technologies */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                  <FiCode className="text-cyan-400" size={16} />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg text-xs sm:text-sm text-gray-300 border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                  <FiZap className="text-cyan-400" size={16} />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                  <FiGithub className="text-cyan-400" size={16} />
                  Project Links
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  {project.codeLink && project.codeLink !== "#" && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base"
                    >
                      <FiGithub size={16} />
                      View Code on GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Optimized ProjectCard component with React.memo
const ProjectCard = React.memo(({ project, index, onProjectClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLiveDemo = useCallback((e) => {
    e.preventDefault();
    if (project.liveLink && project.liveLink !== "#") {
      window.open(project.liveLink, '_blank', 'noopener,noreferrer');
    }
  }, [project.liveLink]);

  const handleViewCode = useCallback((e) => {
    e.preventDefault();
    if (project.codeLink && project.codeLink !== "#") {
      window.open(project.codeLink, '_blank', 'noopener,noreferrer');
    }
  }, [project.codeLink]);

  const isLiveDemoAvailable = project.liveLink && project.liveLink !== "#";
  const isCodeAvailable = project.codeLink && project.codeLink !== "#";

  const handleCardClick = useCallback(() => {
    onProjectClick(project);
  }, [project, onProjectClick]);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleViewCode(e);
              }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isCodeAvailable}
              title={isCodeAvailable ? "View Source Code" : "Code not available"}
              aria-label="View Source Code"
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
                  key={`${project.id}-tech-${idx}`}
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
                <div key={`${project.id}-feature-${idx}`} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
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
});

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Cleanup effect to restore body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => 
    selectedCategory === "All" 
      ? projects 
      : projects.filter(project => project.category === selectedCategory),
    [selectedCategory]
  );

  // Memoized category filter handler
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Modal handlers
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  }, []);

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
              onClick={() => handleCategoryChange(category)}
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
              aria-label={`Filter by ${category}`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

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
