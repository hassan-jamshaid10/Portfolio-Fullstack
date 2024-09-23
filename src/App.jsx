import React from 'react';
import Layout from './AppLayout/Layout';
import AboutMe from './Components/Aboutme/index';
import Experience from './Components/Experienece/index';
import LanguagesTools from './Components/LanguagesTools/index';
import Offerings from './Components/Offerings/index';
import Projects from './Components/Projects/index';
const App = () => {
  return (
  <>
<Layout/>
<AboutMe/>
<Experience/>
<LanguagesTools/>
<Offerings/>
<Projects/>
  </>
  )
}

export default App;
