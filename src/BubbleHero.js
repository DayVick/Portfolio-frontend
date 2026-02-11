import React, { useEffect, useState } from 'react';

const logos = [
  { src: '/JPMC.png', label: 'J.P. Morgan', description: "I've worked at J.P. Morgan for the past 4 years in a variety of roles, mostly centered around Regulatory Program & Product Management. " },
  { src: '/State Farm.png', label: 'State Farm', description: "My first full time role out of college, I worked at State Farm for ~ 1.5 years as a commercial lines auto underwriter" },
  { src: '/EdwinLCoxSchoolofBusiness.png', label: 'SMU', description: 'MBA in Finance & Business Analytics' },
  { src: '/Seal_of_UNT.png', label: 'UNT', description: 'BBA + Currently pursuing MS in Computer Science' },
  { src: '/OKC.png', label: 'OKC Thunder', description: 'Favorite basketball team' },
  { src: '/state-seal-of-texas-seeklogo.png', label: 'Texas', description: 'Home since 15' },
  { src: '/Seal_of_Arkansas.svg.png', label: 'Arkansas', description: 'Where I grew up' },
  { src: '/LouisianaStateSealBWSmall.png', label: 'Louisiana', description: 'Born here' },
];

const randomPositions = [
  { top: '-30%', left: '20%' }, /*JPMC*/ 
  { top: '-34%', left: '64%' }, /*SF*/ 
  { top: '-43%', left: '40%' }, /*SMU*/ 
  { top: '-43%', left: '55%' }, /*UNT*/ 
  { top: '-23%', left: '30%' }, /*OKC*/ 
  { top: '-37%', left: '78%' }, /*TX*/ 
  { top: '-21%', left: '60%' }, /*Ark*/ 
  { top: '-34%', left: '30%' }, /*Louisina*/ 
];

function BubbleHero() {
  const [snapped, setSnapped] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSnapped(true);
      } else {
        setSnapped(false);
        setActiveIndex(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bubble-hero">
      {/* Empty floating bubbles */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className={`empty-bubble bubble-${i}`} />
      ))}

      {/* Logo bubbles */}
      {logos.map((logo, i) => (
        <div
          key={i}
          className={`logo-bubble ${snapped ? 'snapped' : ''} ${snapped && activeIndex === i ? 'active-bubble' : ''}`}
          style={{
            top: snapped ? `${(i * 11) + 5}%` : randomPositions[i].top,
            left: snapped ? '3%' : randomPositions[i].left,
            animationDelay: `${i * 0.7}s`,
            transitionDelay: snapped ? `${i * 0.1}s` : '0s',
          }}
          onClick={() => snapped && handleClick(i)}
        >
          <img src={logo.src} alt={logo.label} />
        </div>
      ))}

      {/* Info box on the right */}
      {snapped && activeIndex !== null && (
        <div className="info-box">
          <h3>{logos[activeIndex].label}</h3>
          <p>{logos[activeIndex].description}</p>
        </div>
      )}
    </div>
  );
}

export default BubbleHero;