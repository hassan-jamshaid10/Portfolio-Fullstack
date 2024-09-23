import React from 'react';
// Import logos for languages and tools (using react-icons as an example)
import { FaReact, FaJava, FaPhp, FaHtml5, FaCss3, FaFigma, FaGithub, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiPostgresql, SiMysql, SiMongodb, SiRedis, SiFirebase, SiSpringboot, SiApachekafka, SiCplusplus, SiVisualstudiocode, SiIntellijidea, SiPostman, SiVisualstudio } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io'; // Material-UI logo placeholder
//yimport { GrChakra } from 'react-icons/gr'; // Chakra UI
import { MdOutlineDashboard } from 'react-icons/md'; // DBJSON
import { RiBarChartHorizontalFill } from 'react-icons/ri'; // Chart.js

// Import Blender logo from public folder
const blenderLogo = '/blenderlogo.png';

const LanguagesTools = () => {
  return (
    <section className="py-12 bg-white text-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#229799]">Languages & Tools I Use</h1>
        </div>

        {/* Web Development Languages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Web Development Languages</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Language Logos */}
            <div className="text-center">
              <FaReact size={50} className="text-[#61DBFB] mx-auto" />
              <p className="mt-2 text-black">React</p>
            </div>
            <div className="text-center">
              <SiJavascript size={50} className="text-[#F7DF1E] mx-auto" />
              <p className="mt-2 text-black">JavaScript</p>
            </div>
            <div className="text-center">
              <SiTypescript size={50} className="text-[#007ACC] mx-auto" />
              <p className="mt-2 text-black">TypeScript</p>
            </div>
            <div className="text-center">
              <FaHtml5 size={50} className="text-[#E34F26] mx-auto" />
              <p className="mt-2 text-black">HTML</p>
            </div>
            <div className="text-center">
              <FaCss3 size={50} className="text-[#1572B6] mx-auto" />
              <p className="mt-2 text-black">CSS</p>
            </div>
            <div className="text-center">
              <SiSpringboot size={50} className="text-[#6DB33F] mx-auto" />
              <p className="mt-2 text-black">Spring Boot</p>
            </div>
            <div className="text-center">
              <FaPhp size={50} className="text-[#777BB4] mx-auto" />
              <p className="mt-2 text-black">PHP</p>
            </div>
            <div className="text-center">
              <SiApachekafka size={50} className="text-[#231F20] mx-auto" />
              <p className="mt-2 text-black">Kafka</p>
            </div>
            <div className="text-center">
              <FaNodeJs size={50} className="text-[#231F20] mx-auto" />
              <p className="mt-2 text-black">NodeJs</p>
            </div>
          </div>
        </div>

        {/* Database Languages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Databases</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Database Logos */}
            <div className="text-center">
              <SiPostgresql size={50} className="text-[#336791] mx-auto" />
              <p className="mt-2 text-black">PostgreSQL</p>
            </div>
            <div className="text-center">
              <SiMysql size={50} className="text-[#4479A1] mx-auto" />
              <p className="mt-2 text-black">MySQL</p>
            </div>
            <div className="text-center">
              <SiMongodb size={50} className="text-[#47A248] mx-auto" />
              <p className="mt-2 text-black">MongoDB</p>
            </div>
            <div className="text-center">
              <SiRedis size={50} className="text-[#DC382D] mx-auto" />
              <p className="mt-2 text-black">Redis</p>
            </div>
          </div>
        </div>

        {/* Other Languages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Other Languages</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Other Language Logos */}
            <div className="text-center">
              <SiCplusplus size={50} className="text-[#00599C] mx-auto" />
              <p className="mt-2 text-black">C++</p>
            </div>
            <div className="text-center">
              <FaJava size={50} className="text-[#5382A1] mx-auto" />
              <p className="mt-2 text-black">Java</p>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Tools & Libraries</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Tool Logos */}
            <div className="text-center">
              <SiVisualstudio size={50} className="text-[#5C2D91] mx-auto" />
              <p className="mt-2 text-black">Visual Studio</p>
            </div>
            <div className="text-center">
              <SiVisualstudiocode size={50} className="text-[#007ACC] mx-auto" />
              <p className="mt-2 text-black">VS Code</p>
            </div>
            <div className="text-center">
              <SiIntellijidea size={50} className="text-[#000000] mx-auto" />
              <p className="mt-2 text-black">IntelliJ IDEA</p>
            </div>
            <div className="text-center">
              <SiPostman size={50} className="text-[#FF6C37] mx-auto" />
              <p className="mt-2 text-black">Postman</p>
            </div>
            <div className="text-center">
              <img src={blenderLogo} alt="Blender" width={75} height={75} className="mx-auto" />
              <p className="mt-2 text-black">Blender</p>
            </div>
            <div className="text-center">
              <FaFigma size={50} className="text-[#F24E1E] mx-auto" />
              <p className="mt-2 text-black">Figma</p>
            </div>
            <div className="text-center">
              <FaGithub size={50} className="text-black mx-auto" />
              <p className="mt-2 text-black">GitHub</p>
            </div>
            <div className="text-center">
              <SiFirebase size={50} className="text-[#FFCA28] mx-auto" />
              <p className="mt-2 text-black">Firebase</p>
            </div>
            {/* New logos added */}
            <div className="text-center">
              <IoLogoJavascript size={50} className="text-[#61DBFB] mx-auto" /> {/* Placeholder for Material-UI */}
              <p className="mt-2 text-black">Material-UI</p>
            </div>
            {/* <div className="text-center">
              <AiFillAntDesign size={50} className="text-[#0170FE] mx-auto" />
              <p className="mt-2 text-black">Ant Design</p>
            </div> */}
            {/* <div className="text-center">
              <GrChakra size={50} className="text-[#319795] mx-auto" />
              <p className="mt-2 text-black">Chakra UI</p>
            </div> */}
            <div className="text-center">
              <MdOutlineDashboard size={50} className="text-[#4A5568] mx-auto" />
              <p className="mt-2 text-black">DBJSON</p>
            </div>
            <div className="text-center">
              <RiBarChartHorizontalFill size={50} className="text-[#FF6384] mx-auto" />
              <p className="mt-2 text-black">Chart.js</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesTools;
