import React from 'react';
import { FaLaptopCode, FaPalette, FaCube } from 'react-icons/fa';
import { FiArrowDown } from 'react-icons/fi';

const Offerings = () => {
  return (
    <section className="py-12 text-black" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#229799]">What I Offer</h1>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Web Development */}
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <FaLaptopCode size={50} className="text-[#229799] mx-auto" />
            <h2 className="text-2xl font-bold mt-4">Web Development</h2>
            <p className="mt-2">
              I build responsive and dynamic websites tailored to your needs using the latest technologies.
            </p>
          </div>

          {/* UI/UX Design */}
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <FaPalette size={50} className="text-[#229799] mx-auto" />
            <h2 className="text-2xl font-bold mt-4">UI/UX Design</h2>
            <p className="mt-2">
              Creating intuitive and engaging user experiences that drive user satisfaction and business results.
            </p>
          </div>

          {/* 3D Designing */}
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <FaCube size={50} className="text-[#229799] mx-auto" />
            <h2 className="text-2xl font-bold mt-4">3D Designing</h2>
            <p className="mt-2">
              Bringing ideas to life with stunning 3D models and visualizations for various applications.
            </p>
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center px-8 py-4 text-lg font-semibold text-white bg-black border-2 border-white rounded-lg hover:text-[#229799] hover:bg-white hover:border-[#229799] transition-all duration-300 ease-in-out">
            Contact Me <FiArrowDown className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offerings;
