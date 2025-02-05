import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const projects = [
  {
    title: 'Trade An Idea',
    description: 'Trade an Idea is a platform where users can share, comment on, and categorize innovative ideas. It features OTP authentication, an AI-powered originality check, and SDG-based categorization. Built with React, Node.js, MySQL, and a fine-tuned LiteLlama AI model. 🚀',
    githubLink: 'https://github.com/hassan-jamshaid10/TradeAnIdea.git',
    image: '/Trade.png'
  },
  {
    title: 'ChatBox',
    description: 'ChatBox App: A web-based messaging app with user authentication, message sending (text, emojis, images), and profile management. Built with HTML, CSS, JavaScript, PHP, and MySQL for data storage.',
    githubLink: 'https://github.com/hassan-jamshaid10/ChatBox.git',
    image: '/GITPIC.png'
  },
  {
    title: 'XORA - AI Video Editing App Frontend',
    description: 'Xora - AI Video Editing App Landing Page Xora is an AI-powered video editing app designed for web and mobile platforms. This landing page showcases its key features, pricing plans, and download options, all in a responsive and modern design built with React.js and Tailwind CSS.',
    githubLink: 'https://saasproject.hassanjamshaid.me/',
    image: '/xora.png'
  },
 
  {
    title: 'E-commerce Product Management App',
    description: 'An Ecommerce Management System developed with React.js and Vite, featuring user authentication and CRUD operations on products. Styled with Ant Design and Tailwind CSS, the application fetches product data from an external API (api.freeapi) to provide a seamless user experience.',
    githubLink: 'https://github.com/hassan-jamshaid10/Ecommerce-Product-Management.git',
    image: '/Ecommerce.png'
  },
  {
    title: 'Messaging App with Real-time Chat',
    description: 'A social media app featuring user profiles, real-time chat functionality, and a dynamic feed. This is a feature-rich messaging app developed with React.js and Vite, featuring user authentication, real-time chat, group conversations, and an AI assistant powered by Gemini. The app includes a dashboard for online users, call logs, and customizable settings, all designed with Material UI and Tailwind CSS.',
    githubLink: 'https://github.com/hassan-jamshaid10/MessagingAPP.git',
    image: '/Messagingapp.png'
  }

];

const Projects = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#229799]">My Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const checkLongDescription = (description) => {
    return description.split(' ').length > 30; // Adjust the word count as needed
  };

  const isLongDescription = useMemo(() => checkLongDescription(project.description), [project.description]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{project.title}</h2>
      <p className={`mt-2 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {project.description}
      </p>
      {isLongDescription && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 text-[#229799] hover:underline block"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-black text-white py-2 px-4 rounded border border-[#229799] hover:bg-[#229799] transition"
      >
        View
      </a>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Projects;
