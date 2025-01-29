import React, { useCallback } from 'react';

const AboutMe = () => {
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const downloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/HassanJamshiadResume.pdf';
    link.download = 'Hassan_Jamshaid_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#229799] uppercase tracking-widest">About</p>
          <h1 className="text-3xl font-bold mb-4 text-[#229799]">Let me introduce myself.</h1>
          <p className="text-gray-600">
            Hey, I'm Hassan! I’m a passionate full stack developer and 3D designer with a strong background in UI/UX design. 
            I specialize in building dynamic and responsive applications using technologies like React, Spring Boot, JavaScript, TypeScript, and SQL. 
            With experience in C++, Java, and web technologies like HTML and CSS, I enjoy creating intuitive user experiences and exploring creative solutions in both the digital and 3D space.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4 text-[#229799]">Profile</h2>
            <p className="text-gray-600 mb-4">
              I am a full-stack developer and 3D designer with a strong background in UI/UX design. I specialize in building dynamic and responsive applications using technologies like React, Spring Boot, JavaScript, TypeScript, and SQL.
            </p>
            <ul className="text-gray-600">
              <li><span className="font-bold">Fullname:</span> Hassan Jamshaid</li>
              <li><span className="font-bold">Job:</span> Freelancer, Full-Stack Developer</li>
              <li><span className="font-bold">Website:</span> www.hassanjamshaid.me</li>
              <li><span className="font-bold">Email:</span> hjamshaid81@gmail.com</li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-xl font-bold mb-4 text-[#229799]">Skills</h2>
            <p className="text-gray-600 mb-4">
              I specialize in various areas of development and design, ensuring high-quality work and seamless user experiences.
            </p>
            <div className="space-y-4">
              {[
                { skill: 'Web Development', level: 95 },
                { skill: 'UI/UX Design', level: 90 },
                { skill: '3D Design', level: 85 },
              ].map((item) => (
                <div key={item.skill}>
                  <p className="font-bold">{item.skill} - {item.level}%</p>
                  <div className="bg-gray-300 h-2 rounded-full">
                    <div
                      className="bg-[#229799] h-2 rounded-full"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={scrollToContact} 
            className="border-2 border-[#229799] text-[#229799] px-6 py-2 font-bold hover:bg-[#48CFCB] hover:text-white transition"
          >
            Hire Me
          </button>
          <button 
            onClick={downloadCV} 
            className="bg-[#229799] text-white px-6 py-2 font-bold hover:bg-[#48CFCB] transition"
          >
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
