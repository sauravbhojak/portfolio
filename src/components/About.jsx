import React from 'react';
import './About.css';
import { Code, Database, Server, Cpu } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section container">
      <div className="section-header reveal">
        <h2 className="section-title gradient-text">About Me</h2>
        <div className="section-line"></div>
      </div>

      <div className="about-content reveal">
        <div className="about-text glass">
          <p>
            I am a Python Developer with <strong>2.5+ years of experience</strong> building scalable REST APIs, microservices, and ETL data pipelines. My expertise lies in backend frameworks like <strong>Django, Django REST Framework (DRF), Flask, and FastAPI</strong>.
          </p>
          <p>
            I have a strong command over databases including PostgreSQL, MySQL, MongoDB, and Redis, and I actively use Celery for async task processing. My hands-on experience extends to AWS infrastructure (RDS, S3, Lambda, EC2), Docker containerization, and configuring Gunicorn/Uvicorn for production deployments.
          </p>
          <p>
            As a forward-thinking developer, I actively leverage AI coding tools like Cursor, GitHub Copilot, and Claude to accelerate development and reduce delivery time, allowing me to focus on high-level architecture and complex problem-solving.
          </p>
        </div>

        <div className="about-cards">
          <div className="about-card glass">
            <div className="card-icon"><Server size={32} /></div>
            <h3>Backend Arch</h3>
            <p>Designing robust microservices & REST APIs.</p>
          </div>
          <div className="about-card glass">
            <div className="card-icon"><Database size={32} /></div>
            <h3>Data & ETL</h3>
            <p>Building high-volume data pipelines & migrations.</p>
          </div>
          <div className="about-card glass">
            <div className="card-icon"><Cpu size={32} /></div>
            <h3>AI Integration</h3>
            <p>Leveraging LLMs and AI APIs for modern apps.</p>
          </div>
          <div className="about-card glass">
            <div className="card-icon"><Code size={32} /></div>
            <h3>Automation</h3>
            <p>Scraping and automating manual workflows.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
