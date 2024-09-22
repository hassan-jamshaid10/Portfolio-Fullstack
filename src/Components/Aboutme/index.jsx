import React from 'react';

const AboutMe = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* About Section */}
        <div className="text-center mb-8">
          <p className="text-[#229799] uppercase tracking-widest">About</p> {/* Updated to #229799 */}
          <h1 className="text-3xl font-bold mb-4 text-[#229799]">Let me introduce myself.</h1> {/* Updated to #229799 */}
          <p className="text-gray-600">
            Lorem ipsum Excepteur culpa qui dolor consequat exercitation fugiat laborum ex ea eiusmod ad do aliqua 
            occaecat nisi ad irure sunt id pariatur Duis laboris amet exercitation veniam labore.
          </p>
        </div>

        {/* Profile and Skills Section */}
        <div className="flex flex-wrap -mx-4">
          {/* Profile Section */}
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4 text-[#229799]">Profile</h2> {/* Updated to #229799 */}
            <p className="text-gray-600 mb-4">
              Lorem ipsum Qui veniam ut consequat ex ullamco nulla in non ut esse in magna sint minim officia consectetur.
            </p>
            <ul className="text-gray-600">
              <li><span className="font-bold">Fullname:</span> Juan Dela Cruz</li>
              <li><span className="font-bold">Birth Date:</span> September 28, 1987</li>
              <li><span className="font-bold">Job:</span> Freelancer, Frontend Developer</li>
              <li><span className="font-bold">Website:</span> www.kardswebsite.com</li>
              <li><span className="font-bold">Email:</span> me@kardswebsite.com</li>
            </ul>
          </div>

          {/* Skills Section */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-xl font-bold mb-4 text-[#229799]">Skills</h2> {/* Updated to #229799 */}
            <p className="text-gray-600 mb-4">
              Lorem ipsum Qui veniam ut consequat ex ullamco nulla in non ut esse in magna sint minim officia.
            </p>
            <div className="space-y-4">
              {[
                { skill: 'HTML5', level: 90 },
                { skill: 'CSS3', level: 85 },
                { skill: 'jQuery', level: 70 },
                { skill: 'PHP', level: 95 },
                { skill: 'WordPress', level: 75 },
              ].map((item) => (
                <div key={item.skill}>
                  <p className="font-bold">{item.skill}</p>
                  <div className="bg-gray-300 h-2 rounded-full">
                    <div
                      className="bg-[#229799] h-2 rounded-full" /* Updated skill bar color to #229799 */
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="border-2 border-[#229799] text-[#229799] px-6 py-2 font-bold hover:bg-[#48CFCB] hover:text-white transition">
            Hire Me
          </button>
          <button className="bg-[#229799] text-white px-6 py-2 font-bold hover:bg-[#48CFCB] transition">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
