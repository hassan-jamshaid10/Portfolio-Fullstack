// src/App.js
import React from 'react';
import Header from './Components/Header/index';
import LandingPage from './Components/LandingPage/index';
import AboutMe from './Components/Aboutme';
import Experience from './Components/Experienece';
import LanguagesTools from './Components/LanguagesTools/index';
import Offerings from './Components/Offerings/index';
import Projects from './Components/Projects/index';
import ContactForm from './Components/ConatctForm';
import Footer from './Components/Footer/index';
import Layout from './AppLayout/Layout';
const App = () => {
  return (
    <>
<srction id="home">
      <Layout/>
      </srction>
        <section id="about">
          <AboutMe />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="languages">
          <LanguagesTools />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="services">
          <Offerings />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      <Footer />
    </>
  );
};

export default App;
