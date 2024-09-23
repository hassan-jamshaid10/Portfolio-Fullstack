import React from 'react';

const projects = [
  {
    title: 'Project 1',
    description: 'A web app that allows users to track their daily tasks with a focus on simplicity and user experience.',
    githubLink: 'https://github.com/yourusername/project1',
    image: '/path/to/project1-image.jpg' // Add the actual image path
  },
  {
    title: 'Project 2',
    description: 'An e-commerce platform with real-time product recommendations, payment integration, and responsive design.',
    githubLink: 'https://github.com/yourusername/project2',
    image: '/path/to/project2-image.jpg' // Add the actual image path
  },
  {
    title: 'Project 3',
    description: 'A social media app featuring user profiles, real-time chat functionality, and a dynamic feed.',
    githubLink: 'https://github.com/yourusername/project3',
    image: '/path/to/project3-image.jpg' // Add the actual image path
  },
  {
    title: 'Project 4',
    description: 'A portfolio website showcasing personal projects, skills, and work experience.',
    githubLink: 'https://github.com/yourusername/project4',
    image: '/path/to/project4-image.jpg' // Add the actual image path
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
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{project.title}</h2>
              <p className="mt-2">{project.description}</p>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-black text-white py-2 px-4 rounded border border-[#229799] hover:bg-[#229799] transition"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
