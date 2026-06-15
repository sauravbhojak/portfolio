import { useCallback } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPython, FaDocker, FaAws, FaDatabase, FaCode } from 'react-icons/fa';
import './Hero.css';
import profileImg from '../assets/profile.png';

// Mouse-tilt handler for each floating icon
const useTilt = () => {
  const onMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to +1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to +1
    el.style.transform = `scale(1.2) rotateX(${-dy * 18}deg) rotateY(${dx * 18}deg)`;
  }, []);

  const onLeave = useCallback((e) => {
    e.currentTarget.style.transform = '';
  }, []);

  return { onMouseMove: onMove, onMouseLeave: onLeave };
};

const Hero = () => {
  const tilt = useTilt();

  return (
    <section id="home" className="hero section flex-center">
      <div className="hero-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content reveal active">
          <h2 className="greeting">Hello, I'm</h2>
          <h1 className="name gradient-text">Saurav Bhojak</h1>
          <h3 className="title title-flex">
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>I am a</span>
            <TypeAnimation
              sequence={[
                'Backend Developer', 2000,
                'Python Specialist', 2000,
                'API Architect', 2000,
                'Data Pipeline Engineer', 2000,
                'Microservices Specialist', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ color: 'var(--accent-cyan)' }}
            />
          </h3>

          <p className="description">
            I build scalable REST APIs, microservices, and robust ETL pipelines.
            Passionate about cloud architecture, async processing, and leveraging AI tools to accelerate development.
          </p>

          <div className="hero-actions reveal">
            <a href="https://drive.google.com/uc?export=download&id=1_9D-UOvwyNXyewYt1KJF2lHryGH30Kp4" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Download CV <Download size={20} />
            </a>
            <a href="#projects" className="btn btn-outline">
              View Projects <ArrowRight size={20} />
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
            <a href="mailto:sauravbhojak6156@gmail.com" aria-label="Email"><FaEnvelope size={24} /></a>
          </div>
        </div>

        <div className="hero-image-wrapper reveal active">
          <div className="hero-image glass">
            <img src={profileImg} alt="Saurav Bhojak" />
            <div className="glow-border"></div>
          </div>

          {/* Floating Icons with tilt */}
          <div className="floating-icon icon-python glass" title="Python" {...tilt}><FaPython size={24} /></div>
          <div className="floating-icon icon-docker glass" title="Docker" {...tilt}><FaDocker size={24} /></div>
          <div className="floating-icon icon-aws glass" title="AWS" {...tilt}><FaAws size={24} /></div>
          <div className="floating-icon icon-db glass" title="Databases" {...tilt}><FaDatabase size={24} /></div>
          <div className="floating-icon icon-code glass" title="Development" {...tilt}><FaCode size={24} /></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
