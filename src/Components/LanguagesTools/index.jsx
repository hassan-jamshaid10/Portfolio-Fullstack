import React from 'react';
import { FaReact, FaJava, FaPhp, FaHtml5, FaCss3, FaFigma, FaGithub, FaNodeJs } from 'react-icons/fa';
import { SiXampp,SiRedux, SiJavascript, SiTypescript, SiPostgresql, SiMysql, SiMongodb, SiRedis, SiFirebase, SiSpringboot, SiApachekafka, SiCplusplus, SiVisualstudiocode, SiIntellijidea, SiPostman, SiVisualstudio, SiTailwindcss, SiChakraui, SiAntdesign } from 'react-icons/si';
import { RiBarChartHorizontalFill } from 'react-icons/ri';

const blenderLogo = '/blenderlogo.png';
const materialui = './materialui.png';
const bootstrap = './bootstrap.png';

const LanguagesTools = () => {
  return (
    <section className="py-12 bg-white text-black">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#229799]">Languages & Tools I Use</h1>
        </div>

        {/* Frontend Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Frontend Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Frontend Technology Logos */}
            <div className="text-center">
              <FaHtml5 size={50} className="text-[#E34F26] mx-auto" />
              <p className="mt-2">HTML</p>
            </div>
            <div className="text-center">
              <FaCss3 size={50} className="text-[#1572B6] mx-auto" />
              <p className="mt-2">CSS</p>
            </div>
            <div className="text-center">
              <FaReact size={50} className="text-[#61DBFB] mx-auto" />
              <p className="mt-2">React</p>
            </div>
            <div className="text-center">
              <SiRedux size={50} className="text-[#764ABC] mx-auto" />
              <p className="mt-2">Redux Toolkit</p>
            </div>
            <div className="text-center">
              <SiTailwindcss size={50} className="text-[#06B6D4] mx-auto" />
              <p className="mt-2">Tailwind CSS</p>
            </div>
            <div className="text-center">
              <SiJavascript size={50} className="text-[#F7DF1E] mx-auto" />
              <p className="mt-2">JavaScript</p>
            </div>
            <div className="text-center">
              <SiTypescript size={50} className="text-[#007ACC] mx-auto" />
              <p className="mt-2">TypeScript</p>
            </div>
            <div className="text-center">
              <SiChakraui size={50} className="text-[#319795] mx-auto" />
              <p className="mt-2">Chakra UI</p>
            </div>
            <div className="text-center">
              <img src={materialui} alt="Material UI" width={75} height={75} className="mx-auto" />
              <p className="mt-2">Material UI</p>
            </div>
            <div className="text-center">
              <SiAntdesign size={50} className="text-[#0170FE] mx-auto" />
              <p className="mt-2">Ant Design</p>
            </div>
            <div className="text-center">
              <img src={bootstrap} alt="Bootstrap" width={75} height={75} className="mx-auto" />
              <p className="mt-2">Bootstrap</p>
            </div>
            <div className="text-center">
              <RiBarChartHorizontalFill size={50} className="text-[#FF6384] mx-auto" />
              <p className="mt-2">Chart.js</p>
            </div>
          </div>
        </div>

        {/* Backend Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Backend Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Backend Technology Logos */}
            <div className="text-center">
              <FaNodeJs size={50} className="text-[#68A063] mx-auto" />
              <p className="mt-2">Node.js</p>
            </div>
            <div className="text-center">
              <SiSpringboot size={50} className="text-[#6DB33F] mx-auto" />
              <p className="mt-2">Spring Boot</p>
            </div>
            <div className="text-center">
              <FaPhp size={50} className="text-[#777BB4] mx-auto" />
              <p className="mt-2">PHP</p>
            </div>
            <div className="text-center">
              <SiApachekafka size={50} className="text-[#231F20] mx-auto" />
              <p className="mt-2">Kafka</p>
            </div>
          </div>
        </div>

        {/* Databases Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Databases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Database Logos */}
            <div className="text-center">
              <SiPostgresql size={50} className="text-[#336791] mx-auto" />
              <p className="mt-2">PostgreSQL</p>
            </div>
            <div className="text-center">
              <SiMysql size={50} className="text-[#4479A1] mx-auto" />
              <p className="mt-2">MySQL</p>
            </div>
            <div className="text-center">
              <SiMongodb size={50} className="text-[#47A248] mx-auto" />
              <p className="mt-2">MongoDB</p>
            </div>
            <div className="text-center">
              <SiRedis size={50} className="text-[#DC382D] mx-auto" />
              <p className="mt-2">Redis</p>
            </div>
          </div>
        </div>

        {/* Other Languages Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Other Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Other Language Logos */}
            <div className="text-center">
              <SiCplusplus size={50} className="text-[#00599C] mx-auto" />
              <p className="mt-2">C++</p>
            </div>
            <div className="text-center">
              <FaJava size={50} className="text-[#5382A1] mx-auto" />
              <p className="mt-2">Java</p>
            </div>
          </div>
        </div>

        {/* Other Tools Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Other Tool Logos */}
            <div className="text-center">
              <SiVisualstudio size={50} className="text-[#5C2D91] mx-auto" />
              <p className="mt-2">Visual Studio</p>
            </div>
            <div className="text-center">
              <SiVisualstudiocode size={50} className="text-[#007ACC] mx-auto" />
              <p className="mt-2">VS Code</p>
            </div>
            <div className="text-center">
              <SiIntellijidea size={50} className="text-[#000000] mx-auto" />
              <p className="mt-2">IntelliJ IDEA</p>
            </div>
            <div className="text-center">
              <SiPostman size={50} className="text-[#FF6C37] mx-auto" />
              <p className="mt-2">Postman</p>
            </div>
            <div className="text-center">
              <img src={blenderLogo} alt="Blender" width={75} height={75} className="mx-auto" />
              <p className="mt-2">Blender</p>
            </div>
            <div className="text-center">
              <FaGithub size={50} className="text-black mx-auto" />
              <p className="mt-2">GitHub</p>
            </div>
            <div className="text-center">
              <SiFirebase size={50} className="text-[#FFCA28] mx-auto" />
              <p className="mt-2">Firebase</p>
            </div>
            <div className="text-center">
              <SiXampp size={50} className="text-[#FF6C37] mx-auto" />
              <p className="mt-2">Xampp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesTools;
