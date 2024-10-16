import React from 'react';

const NetsolLogo = "./netsollogo.png";
const ucpLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMk8Z0fTrskOLvS0W0IE5nj_CPw1ou2MQUQ&s";
const Freelancelogo = "https://cdn.dribbble.com/users/2059160/screenshots/4413086/media/2dfeaf608392e326b8078431e1ac9f37.jpg?resize=400x300&vertical=center";

const Experience = () => {
  return (
    <section className="py-12" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-[#229799] uppercase tracking-widest">Resume</p>
          <h1 className="text-3xl font-bold text-[#229799]">More of my credentials.</h1>
          <p className="text-gray-600 mt-4">
            Here are my work experience and education details.
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Work Experience</h2>
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full flex-shrink-0">
                <img src={NetsolLogo} alt="Netsol" width={85} height={85} className="rounded-full" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">Full Stack Intern</h3>
                <p className="text-sm text-gray-500">Netsol Technologies Inc</p>
                <p className="text-sm text-gray-500">July 2024 - September 2024</p>
                <p className="text-gray-600 mt-2">
                  I worked as a Full Stack Intern at NetSol Technologies, where I mastered React for front-end development and Spring Boot for back-end services. During my internship, I gained hands-on experience in building RESTful APIs, enhancing my skills in creating efficient and scalable web applications.
                </p>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full flex-shrink-0">
                <img src={Freelancelogo} alt="Freelance" width={85} height={85} className="rounded-full" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">Freelance - Full Stack Developer</h3>
                <p className="text-sm text-gray-500">UpWork & Fiverr</p>
                <p className="text-sm text-gray-500">July 2024 - Present</p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Education</h2>
          <div className="space-y-8">
            {/* Education 1 */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full flex-shrink-0">
                <img src={ucpLogo} alt="UCP" width={85} height={85} className="rounded-full" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">Bachelor's Degree</h3>
                <p className="text-sm text-gray-500">University of Central Punjab</p>
                <p className="text-sm text-gray-500">Nov 2022 - Present</p>
                <p className="text-gray-600 mt-2">
                  A dedicated and ambitious Computer Science student with a robust foundation in web development and a diverse range of programming skills. Experienced in creating dynamic and responsive web applications utilizing various technologies, I am proficient in SQL, JavaScript, TypeScript, React, C++, Java, and Spring Boot. With a strong passion for continuous learning and problem-solving, I am eager to leverage my technical expertise and innovative solutions to tackle real-world challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
