import React from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'VPN Management Platform',
    hash: 'commit 8f3a2b1',
    date: 'Oct 2025',
    tech: ['Python', 'FastAPI', 'Django', 'MySQL', 'Redis', 'Celery', 'Docker'],
    description: 'A backend integrating VPN data with 6+ external applications. Features async server monitoring tracking health and IPs without blocking API responses.',
    links: { github: '#', live: '#' },
    isPrivate: true
  },
  {
    title: 'HR Management System',
    hash: 'commit 4c9e7d2',
    date: 'Jul 2025',
    tech: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Celery', 'Docker'],
    description: 'REST APIs replacing a fully manual HR process. Serves 100+ employees with automated payroll processing, configurable tax rules, and attendance.',
    links: { github: '#', live: '#' },
    isPrivate: true
  },
  {
    title: 'AI Tattoo Generation Backend',
    hash: 'commit 1a4d8f5',
    date: 'Jan 2025',
    tech: ['Python', 'FastAPI', 'SSO', 'AWS Lambda', 'Docker'],
    description: 'High-performance backend integrating AI APIs for custom tattoo designs. Deployed image processing via AWS Lambda for scalable serverless execution.',
    links: { github: 'https://github.com/SauravBhojak/tattoo-backend', live: '#' },
    isPrivate: false
  },
  {
    title: 'Healthcare Data & OLAP Pipeline',
    hash: 'commit 9b2c4e1',
    date: 'Nov 2024',
    tech: ['Python', 'AWS RDS', 'AWS S3', 'AWS Lambda', 'Boto3'],
    description: 'Data migration pipeline moving millions of medical records to AWS with zero loss. Included PHI/PII masking and transformation into a star schema.',
    links: { github: '#', live: '#' },
    isPrivate: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const itemVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const Projects = () => {
  return (
    <section id="projects" className="section container">
      <div className="section-header reveal">
        <h2 className="section-title gradient-text">Featured Projects</h2>
        <div className="section-line"></div>
      </div>

      <motion.div
        className="git-timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="git-branch-line"></div>
        {projects.map((project, index) => (
          <motion.div key={index} className="git-commit-container" variants={itemVariants}>
            <div className="git-node"></div>
            <div className="git-commit-card glass">
              
              <div className="git-commit-header">
                <span className="git-hash">{project.hash}</span>
                <span className="git-date">{project.date}</span>
                <span className="git-author">Author: Saurav</span>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-links">
                {project.isPrivate ? (
                  <span className="private-badge"><FaLock size={12} /> Company Project</span>
                ) : (
                  <a href={project.links.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
                )}
                
                {project.links.live && project.links.live !== '#' && (
                  <a href={project.links.live} aria-label="Live Demo" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt size={18} /></a>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
