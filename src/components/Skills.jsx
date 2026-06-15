import React from 'react';
import './Skills.css';
import { motion } from 'framer-motion';
import { FaPython, FaServer, FaDatabase, FaAws, FaNetworkWired, FaTools } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Languages & Core',
    icon: <FaPython className="category-icon" />,
    skills: ['Python 3 (asyncio, OOP)', 'JavaScript', 'HTML5 & CSS3', 'AJAX']
  },
  {
    title: 'Backend Frameworks',
    icon: <FaServer className="category-icon" />,
    skills: ['Django', 'Django REST Framework', 'Flask', 'FastAPI']
  },
  {
    title: 'Databases & Queues',
    icon: <FaDatabase className="category-icon" />,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'MSSQL', 'Celery', 'Celery Beat']
  },
  {
    title: 'Cloud & DevOps',
    icon: <FaAws className="category-icon" />,
    skills: ['AWS (RDS, S3, Lambda, EC2)', 'Docker', 'GitLab CI/CD', 'Jenkins', 'Linux', 'Gunicorn', 'Uvicorn']
  },
  {
    title: 'Architecture & Integrations',
    icon: <FaNetworkWired className="category-icon" />,
    skills: ['REST API Design', 'JWT Auth', 'SSO', 'OAuth2', 'WebSockets', 'ETL Pipelines', 'Data Migration']
  },
  {
    title: 'Tools & Others',
    icon: <FaTools className="category-icon" />,
    skills: ['Git', 'Postman', 'VS Code', 'pytest', 'Web Scraping (Selenium, Scrapy)']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <div className="section-header reveal">
        <div className="section-line"></div>
        <h2 className="section-title gradient-text">Technical Arsenal</h2>
      </div>

      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category, index) => (
          <motion.div key={index} className="skill-category glass" variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="category-header">
              <div className="icon-wrapper">{category.icon}</div>
              <h3>{category.title}</h3>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
