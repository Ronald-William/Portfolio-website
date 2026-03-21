import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Stats from './sections/Stats';
import Contact from './sections/Contact';


export default function App() {
  return (
    <>
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
