import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Journey from './Journey';
import Projects from './Projects';
import BubbleHero from './BubbleHero';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
  
    fetch('http://localhost:8080/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBackgroundColor = () => {
    const darkness = 50 - (scrollPercent / 2);
    return `hsl(0, 0%, ${darkness}%)`;
  };

  if (loading) {
    setLoading(false);
  }

  return (
    <Router>
      <div className="App" style={{ backgroundColor: getBackgroundColor() }}>
        
        <nav className="navbar">
          <div className="nav-logo">
            <img
              src="/SMU-pic.jpg"
              alt='DV'
              className= {`nav-profile-pic ${scrollPercent > 5 ? 'visible' : ''}`}
    />
            <span>DV</span>
            </div>
          <div className="nav-links">
            <Link to="/">About</Link>
            <Link to="/journey">Journey</Link>
            <Link to="/projects">Projects</Link>
          </div>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/dv127/" target="_blank" rel="noopener noreferrer">
              <img src="LinkLogo.png" alt="LinkedIn" className="social-icon"/>
            </a>
            <a href="https://github.com/DayVick" target="_blank" rel="noopener noreferrer">
              <img src="GHLogo.png" alt="Github" className="social-icon"/>
            </a>
            <a href="https://www.instagram.com/day.vickers/" target='_blank' rel="noopener noreferrer">
              <img src="IGLogo.png" alt="Instagram" className="social-icon"/>
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <section className="hero-section">
              <img src="/SMU-pic.jpg" alt="Daylyn Vickers" className="profile-pic" />
              <h1>Daylyn Vickers</h1>
              <p className="tagline">Aspiring Software Engineer | Learner | Creative</p>
              <BubbleHero />
            </section>
          }/>
          <Route path="/journey" element={<Journey />}/>
          <Route path="/projects" element={<Projects />}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
