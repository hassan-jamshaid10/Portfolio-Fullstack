import React from 'react';
import { 
  FaReact, FaJava, FaPhp, FaHtml5, FaCss3, FaFigma, FaGithub, FaNodeJs 
} from 'react-icons/fa';
import { 
  SiXampp, SiRedux, SiJavascript, SiTypescript, SiPostgresql, SiMysql, 
  SiMongodb, SiRedis, SiFirebase, SiSpringboot, SiApachekafka, SiCplusplus, 
  SiVisualstudiocode, SiIntellijidea, SiPostman, SiVisualstudio, 
  SiTailwindcss, SiChakraui, SiAntdesign 
} from 'react-icons/si';
import { RiBarChartHorizontalFill } from 'react-icons/ri';

const techData = {
  frontend: [
    { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
    { icon: <FaCss3 />, name: "CSS", color: "#1572B6" },
    { icon: <FaReact />, name: "React", color: "#61DBFB" },
    { icon: <SiRedux />, name: "Redux Toolkit", color: "#764ABC" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "#06B6D4" },
    { icon: <SiJavascript />, name: "JavaScript", color: "#F7DF1E" },
    { icon: <SiTypescript />, name: "TypeScript", color: "#007ACC" },
    { icon: <SiChakraui />, name: "Chakra UI", color: "#319795" },
    { src: './materialui.png', name: "Material UI" },
    { icon: <SiAntdesign />, name: "Ant Design", color: "#0170FE" },
    { src: './bootstrap.png', name: "Bootstrap" },
    { icon: <RiBarChartHorizontalFill />, name: "Chart.js", color: "#FF6384" }
  ],
  backend: [
    { icon: <FaNodeJs />, name: "Node.js", color: "#68A063" },
    { icon: <SiSpringboot />, name: "Spring Boot", color: "#6DB33F" },
    { icon: <FaPhp />, name: "PHP", color: "#777BB4" },
    { icon: <SiApachekafka />, name: "Kafka", color: "#231F20" }
  ],
  databases: [
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "#336791" },
    { icon: <SiMysql />, name: "MySQL", color: "#4479A1" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
    { icon: <SiRedis />, name: "Redis", color: "#DC382D" }
  ],
  otherLanguages: [
    { icon: <SiCplusplus />, name: "C++", color: "#00599C" },
    { icon: <FaJava />, name: "Java", color: "#5382A1" }
  ],
  tools: [
    { icon: <SiVisualstudio />, name: "Visual Studio", color: "#5C2D91" },
    { icon: <SiVisualstudiocode />, name: "VS Code", color: "#007ACC" },
    { icon: <SiIntellijidea />, name: "IntelliJ IDEA", color: "#000000" },
    { icon: <SiPostman />, name: "Postman", color: "#FF6C37" },
    { src: '/blenderlogo.png', name: "Blender" },
    { icon: <FaFigma />, name: "Figma", color: "black" },
    { icon: <FaGithub />, name: "GitHub", color: "black" },
    { icon: <SiFirebase />, name: "Firebase", color: "#FFCA28" },
    { icon: <SiXampp />, name: "XAMPP", color: "#FF6C37" }
  ]
};

const TechItem = ({ icon, src, name, color }) => (
  <div className="text-center">
    {icon ? (
      React.cloneElement(icon, { size: 50, className: `mx-auto text-[${color}]` })
    ) : (
      <img src={src} alt={name} width={75} height={75} className="mx-auto" />
    )}
    <p className="mt-2">{name}</p>
  </div>
);

const LanguagesTools = () => (
  <section className="py-12 bg-white text-black">
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#229799]">Languages & Tools I Use</h1>
      </div>

      {/* Tech Categories */}
      {Object.entries(techData).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">{category.replace(/([A-Z])/g, ' $1')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <TechItem key={index} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default LanguagesTools;
