import React, { useState } from 'react';
import './Experience.css';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';

const experiences = [
  {
    company: 'Upsquare Tech',
    role: 'Python Developer',
    fullCompany: 'Upsquare Technologies',
    location: 'Ahmedabad, Gujarat',
    period: 'Jan 2023 – Present',
    url: '#',
    color: '#00f0ff',
    tags: ['Django', 'FastAPI', 'Docker', 'AWS', 'Redis', 'PostgreSQL', 'Celery'],
    points: [
      'Designed and developed 20+ REST APIs using Django & DRF for a project management system with real-time task tracking and role-based access control.',
      'Built end-to-end HRMS REST APIs for attendance, payroll, and leave management — automating payroll calculations and reducing manual HR processing time by ~40%.',
      'Implemented Celery beat scheduler with Redis to automate payroll processing and attendance jobs.',
      'Developed FastAPI backend for a VPN application integrating 6+ external systems; used Celery + Redis for async server monitoring.',
      'Engineered healthcare ETL pipeline migrating millions of patient records from MSSQL to AWS RDS (EC2, S3, Lambda); applied PHI/PII masking.',
      'Deployed and managed production services using Docker, Gunicorn, and Uvicorn with GitLab CI/CD pipelines.',
    ]
  },
  {
    company: 'Freelance',
    role: 'Python Developer — Web Scraping',
    fullCompany: 'Self-Employed',
    location: 'Ahmedabad, Gujarat',
    period: 'Feb 2022 – Dec 2022',
    url: '#',
    color: '#8b5cf6',
    tags: ['Python', 'Selenium', 'BeautifulSoup', 'Scrapy', 'Requests'],
    points: [
      'Developed custom web scraping solutions using Python (BeautifulSoup, Requests, Selenium) for multiple clients across different industries.',
      'Delivered structured data exports in CSV and JSON formats tailored to client specifications.',
      'Built proxy rotation and request throttling modules to maintain scraping reliability at scale, reducing IP bans by ~80%.',
    ]
  }
];

const Experience = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experiences[activeIdx];

  return (
    <section id="experience" className="section container">

      <div className="section-header reveal">
        <h2 className="section-title gradient-text">Experience</h2>
        <div className="section-line"></div>
      </div>

      <div className="exp-tab-layout">
        {/* Tab Selector */}
        <div className="exp-tab-selector">
          {experiences.map((exp, i) => (
            <button
              key={i}
              className={`exp-tab-btn ${activeIdx === i ? 'active' : ''}`}
              onClick={() => setActiveIdx(i)}
              style={{ '--tab-color': exp.color }}
            >
              {exp.company}
            </button>
          ))}
          {/* Sliding indicator */}
          <motion.div
            className="exp-tab-indicator"
            animate={{ top: `${activeIdx * 56}px` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Content panel */}
        <div className="exp-tab-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="exp-content-header">
                <div>
                  <h3 className="exp-content-role">
                    {active.role}
                    <span className="exp-content-at"> @ </span>
                    <a href={active.url} className="exp-content-company" style={{ color: active.color }}>
                      {active.fullCompany} <ExternalLink size={14} />
                    </a>
                  </h3>
                  <div className="exp-content-meta">
                    <span><Calendar size={13} /> {active.period}</span>
                    <span><MapPin size={13} /> {active.location}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="exp-content-tags">
                {active.tags.map((tag, i) => (
                  <span key={i} className="exp-content-tag" style={{ '--tag-color': active.color }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Points */}
              <ul className="exp-content-points">
                {active.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <span className="exp-point-dot" style={{ background: active.color, boxShadow: `0 0 8px ${active.color}` }} />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
