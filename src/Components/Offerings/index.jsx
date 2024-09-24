import React, { useCallback } from 'react';
import { FaLaptopCode, FaPalette, FaCube } from 'react-icons/fa';
import { FiArrowDown } from 'react-icons/fi';
import PropTypes from 'prop-types';

const offeringsData = [
  {
    id: 1,
    icon: <FaLaptopCode size={50} className="text-[#229799] mx-auto" />,
    title: 'Web Development',
    description: 'I build responsive and dynamic websites tailored to your needs using the latest technologies.',
  },
  {
    id: 2,
    icon: <FaPalette size={50} className="text-[#229799] mx-auto" />,
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging user experiences that drive user satisfaction and business results.',
  },
  {
    id: 3,
    icon: <FaCube size={50} className="text-[#229799] mx-auto" />,
    title: '3D Designing',
    description: 'Bringing ideas to life with stunning 3D models and visualizations for various applications.',
  },
];

const Offerings = () => {
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="py-12 text-black" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#229799]">What I Offer</h1>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offeringsData.map(({ id, icon, title, description }) => (
            <div key={id} className="text-center bg-white p-6 rounded-lg shadow-md">
              {icon}
              <h2 className="text-2xl font-bold mt-4">{title}</h2>
              <p className="mt-2">{description}</p>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToContact}
            className="flex items-center px-8 py-4 text-lg font-semibold text-white bg-black border-2 border-white rounded-lg hover:text-[#229799] hover:bg-white hover:border-[#229799] transition-all duration-300 ease-in-out"
            aria-label="Scroll to contact section"
          >
            Contact Me <FiArrowDown className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

// PropTypes can be defined for future use or expansion
Offerings.propTypes = {
  // Currently no props, but can be expanded in the future
};

export default Offerings;
