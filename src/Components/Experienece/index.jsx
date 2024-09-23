import React from 'react';

const Experience = () => {
  return (
    <section className="py-12" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-[#229799] uppercase tracking-widest">Resume</p>
          <h1 className="text-3xl font-bold text-[#229799]">More of my credentials.</h1>
          <p className="text-gray-600 mt-4">
            Lorem ipsum Do commodo a proident exina in dolor cupidatat adipsicing dolore officia.
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#229799] mb-6">Work Experience</h2>
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[#229799] flex-shrink-0 flex items-center justify-center text-white">
                {/* Icon or symbol */}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">UI Designer</h3>
                <p className="text-sm text-gray-500">Awesome Studio</p>
                <p className="text-sm text-gray-500">July 2015 - Present</p>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum Occaecat do esse ex et dolor culpa nisi et magna consectetur nisi laborum.
                </p>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[#229799] flex-shrink-0 flex items-center justify-center text-white">
                {/* Icon or symbol */}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">Frontend Developer</h3>
                <p className="text-sm text-gray-500">Super Cool Agency</p>
                <p className="text-sm text-gray-500">July 2014 - June 2015</p>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum Occaecat do esse ex et dolor culpa nisi et magna consectetur nisi laborum.
                </p>
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
              <div className="w-10 h-10 rounded-full bg-[#229799] flex-shrink-0 flex items-center justify-center text-white">
                {/* Icon or symbol */}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">Master's Degree</h3>
                <p className="text-sm text-gray-500">University of Life</p>
                <p className="text-sm text-gray-500">July 2015 - Present</p>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Laborum nisi culpa officia.
                </p>
              </div>
            </div>

            {/* Education 2 */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[#229799] flex-shrink-0 flex items-center justify-center text-white">
                {/* Icon or symbol */}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold">Bachelor's Degree</h3>
                <p className="text-sm text-gray-500">State Design University</p>
                <p className="text-sm text-gray-500">July 2010 - June 2014</p>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Laborum nisi culpa officia.
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
