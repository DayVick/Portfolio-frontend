import React, { useState, useEffect } from 'react';
import './App.css';

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
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App" style={{ backgroundColor: getBackgroundColor() }}>
      
       <nav className="navbar">
      <div className="nav-logo">DV</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#journey">Journey</a>
        <a href="#projects">Projects</a>
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

    {/* Hero Section */}
    <section className="hero-section">
      <img src="/SMU-pic.jpg" alt="Daylyn Vickers" className="profile-pic" />
      <h1>Daylyn Vickers</h1>
      <p className="tagline"> Aspiring Software Engineer | Learner | Creative </p>
    </section>

    {/* About Me Section */}
    <section className="about-section">
      <h2>About Me</h2>
      <p>
        I'm a software engineer transitioning from compliance and risk management at JPMorgan Chase. 
        Currently pursuing a Master's in Computer Science while building full-stack applications 
        and solving complex problems through code.
      </p>
    </section>

    {/* My Journey Section */}
    <section className="journey-section">
      <h2>My Journey</h2>
      <p>
        My path to software engineering is unconventional. I started as a jazz musician at UNT, 
        pivoted to business at SMU, worked in insurance and banking, and now I'm following my 
        passion for technology and problem-solving through code.
      </p>

    </section>

    {/* Projects Section */}
    <section className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-container">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Technologies:</strong> {project.technologies}</p>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>



    {/* Temporary scroll spacer */}
    <div style={{ height: '500px' }}></div>
  </div>
  );
}

export default App;
