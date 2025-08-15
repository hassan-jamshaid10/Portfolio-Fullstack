// src/App.js
import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Layout from './AppLayout/Layout';

// Components
import LandingPage from './Components/LandingPage/index';
import AboutMe from './Components/Aboutme';
import Experience from './Components/Experienece';
import LanguagesTools from './Components/LanguagesTools/index';
import Offerings from './Components/Offerings/index';
import Projects from './Components/Projects/index';
import ContactForm from './Components/ConatctForm';
import Footer from './Components/Footer/index';

const App = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />

      {/* All sections wrapped in Layout for background + header */}
      <Layout>
        <section id="home">
          <LandingPage />
        </section>
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
      </Layout>
    </>
  );
};

export default App;
