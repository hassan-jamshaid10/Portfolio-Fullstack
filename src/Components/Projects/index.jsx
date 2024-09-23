import React, { useState } from 'react';

const projects = [

  {
    title: 'Portfolio website',
    description: 'A comprehensive portfolio website designed to showcase my personal projects, technical skills, and professional experience. This site features an intuitive layout that highlights key projects I have worked on, providing visitors with insights into my development process and problem-solving abilities. Built with React and styled using Tailwind CSS, the website offers a responsive and visually appealing user experience. It serves not only as a showcase of my work but also as a platform for potential employers and clients to learn more about my expertise and approach to software development',
    githubLink: 'https://github.com/hassan-jamshaid10/Portfolio-Fullstack.git',
    image: '/portfolio.png'
  },
  {
    title: 'Ai Trip Planner Backend',
    description: 'A Spring Boot service with Spring Security 6 and JWT authentication, offering secure user management, trip planning, and bookings. Data is stored in PostgreSQL, with Gemini AI providing intelligent trip recommendations.',
    githubLink: 'https://github.com/hassan-jamshaid10/Ai-Trip-Planner-Backend.git',
    image: '/Trip.webp'
  },
  {
    title: 'E-commerce Product Management App',
    description: 'An Ecommerce Management System developed with React.js and Vite, featuring user authentication and CRUD operations on products. Styled with Ant Design and Tailwind CSS, the application fetches product data from an external API (api.freeapi) to provide a seamless user experience.',
    githubLink: 'https://github.com/hassan-jamshaid10/Ecommerce-Product-Management.git',
    image: '/Ecommerce.png'
  },
  {
    title: 'Messaging App with Real-time Chat',
    description: 'A social media app featuring user profiles, real-time chat functionality, and a dynamic feed.This is a feature-rich messaging app developed with React.js and Vite, featuring user authentication, real-time chat, group conversations, and an AI assistant powered by Gemini. The app includes a dashboard for online users, call logs, and customizable settings, all designed with Material UI and Tailwind CSS.',
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
  
  // Check if the description is long enough to need "Read More"
  const isLongDescription = project.description.split(' ').length > 30; // Adjust the word count as needed

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
          onClick={() => setIsExpanded(!isExpanded)}
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
        View on GitHub
      </a>
    </div>
  );
};

export default Projects;
