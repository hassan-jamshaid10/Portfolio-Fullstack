import React, { useState, useEffect } from "react";
import {
  FaReact, FaReact as FaReactNative, FaJava, FaHtml5, FaCss3, FaFigma, FaGithub, FaNodeJs, FaWordpress, FaAws, FaDocker, FaJenkins, FaBrain, FaFlask
} from "react-icons/fa";
import {
  SiRedux, SiJavascript, SiTypescript, SiPostgresql, SiMysql,
  SiMongodb, SiSpringboot, SiApachekafka, SiCplusplus,
  SiPostman, SiTailwindcss,
 SiNextdotjs, SiThreedotjs, SiJest, SiMocha,
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiPython,SiFlask,SiHuggingface
} from "react-icons/si";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FiCode, FiDatabase, FiGlobe, FiCloud, FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";

const techData = {
  frameworks: [
    { icon: <SiNextdotjs />, name: "Next.js", color: "#000000", category: "Frontend" },
    { icon: <FaReact />, name: "React", color: "#61DBFB", category: "Frontend" },
    { icon: <FaReactNative />, name: "React Native", color: "#61DBFB", category: "Mobile" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "#06B6D4", category: "Styling" },
    { icon: <SiThreedotjs />, name: "Three.js", color: "#000000", category: "3D Graphics" },
    { icon: <FaNodeJs />, name: "Node.js", color: "#68A063", category: "Backend" },
    { icon: <SiSpringboot />, name: "Spring Boot", color: "#6DB33F", category: "Backend" },
    { icon: <SiApachekafka />, name: "Kafka", color: "#FFFFFF", category: "Message Queue" },
    { icon: <SiRedux />, name: "Redux", color: "#764ABC", category: "State Management" }
  ],
  databases: [
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "#336791", category: "SQL" },
    { icon: <SiMysql />, name: "MySQL", color: "#4479A1", category: "SQL" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248", category: "NoSQL" }
  ],
  ml: [
    { icon: <SiTensorflow />, name: "TensorFlow", color: "#FF6F00", category: "Deep Learning" },
    { icon: <SiPytorch />, name: "PyTorch", color: "#EE4C2C", category: "Deep Learning" },
    { icon: <SiOpencv />, name: "OpenCV", color: "#5C3EE8", category: "Computer Vision" },
    { icon: <SiScikitlearn />, name: "Scikit-learn", color: "#F7931E", category: "Machine Learning" },
    { icon: <SiHuggingface />, name: "HuggingFace", color: "#F7931E", category: "NLP" }
  ],
  languages: [
    { icon: <FaHtml5 />, name: "HTML", color: "#E34F26", category: "Markup" },
    { icon: <FaCss3 />, name: "CSS", color: "#1572B6", category: "Styling" },
    { icon: <SiJavascript />, name: "JavaScript", color: "#F7DF1E", category: "Programming" },
    { icon: <SiTypescript />, name: "TypeScript", color: "#007ACC", category: "Programming" },
    { icon: <SiCplusplus />, name: "C++", color: "#00599C", category: "Programming" },
    { icon: <FaJava />, name: "Java", color: "#5382A1", category: "Programming" },
    { icon: <SiPython />, name: "Python", color: "#3776AB", category: "Programming" }
  ],
  devops: [
    { icon: <FaGithub />, name: "GitHub", color: "#FFFFFF", category: "Version Control" },
    { icon: <FaAws />, name: "AWS", color: "#FF9900", category: "Cloud Platform" },
    { icon: <FaDocker />, name: "Docker", color: "#2496ED", category: "Containerization" },
    { icon: <FaJenkins />, name: "Jenkins", color: "#D24939", category: "CI/CD" }
  ],
  testing: [
    { icon: <SiJest />, name: "Jest", color: "#C21325", category: "Testing" },
    { icon: <SiMocha />, name: "Mocha", color: "#8D6748", category: "Testing" },
    { icon: <SiPostman />, name: "Postman", color: "#FF6C37", category: "API Testing" }
  ],
  others: [
    { icon: <FaWordpress />, name: "WordPress", color: "#21759B", category: "CMS" },
    { icon: <FaFigma />, name: "Figma", color: "#F24E1E", category: "Design" }
  ]
};

const TechItem = ({ icon, name, color, category, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        {/* Icon Container */}
        <div className="relative mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {React.cloneElement(icon, { 
              size: window.innerWidth < 640 ? 20 : 32, 
              style: { color: color || "#FFFFFF" },
              className: "group-hover:scale-110 transition-transform duration-300"
            })}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 font-medium">
          {category}
        </p>

        {/* Hover Indicator */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-2 h-2 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ title, items, icon: Icon, gradient }) => (
  <motion.div 
    className="mb-12 sm:mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-6 sm:mb-8">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <Icon className="text-white text-lg sm:text-xl" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent text-center sm:text-left">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {items.map((item, index) => (
        <TechItem key={index} {...item} index={index} />
      ))}
    </div>
  </motion.div>
);

const LanguagesTools = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{
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
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Tech Stack</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6">
            Languages & Tools
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            My comprehensive toolkit for building innovative digital solutions. 
            From frontend frameworks to AI/ML libraries, I leverage cutting-edge technologies.
          </p>
        </div>

        {/* Tech Sections */}
        <Section 
          title="Frontend & Frameworks" 
          items={techData.frameworks} 
          icon={FiCode}
          gradient="from-blue-400 to-cyan-500"
        />
        <Section 
          title="Databases & Storage" 
          items={techData.databases} 
          icon={FiDatabase}
          gradient="from-emerald-400 to-teal-500"
        />
        <Section 
          title="Machine Learning & AI" 
          items={techData.ml} 
          icon={FaBrain}
          gradient="from-purple-400 to-pink-500"
        />
        <Section 
          title="Programming Languages" 
          items={techData.languages} 
          icon={FiGlobe}
          gradient="from-orange-400 to-red-500"
        />
        <Section 
          title="DevOps & Cloud" 
          items={techData.devops} 
          icon={FiCloud}
          gradient="from-indigo-400 to-purple-500"
        />
        <Section 
          title="Testing & Quality" 
          items={techData.testing} 
          icon={FaFlask}
          gradient="from-rose-400 to-pink-500"
        />
        <Section 
          title="Design & CMS" 
          items={techData.others} 
          icon={FiSettings}
          gradient="from-cyan-400 to-blue-500"
        />
      </div>
    </section>
  );
};

export default LanguagesTools;
