import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatBot.css';
import { X, Send, User } from 'lucide-react';

const BlinkingBot = ({ size = 22, interactive = false }) => {
  const svgRef = useRef(null);
  const [sleep, setSleep] = useState(false);
  
  useEffect(() => {
    if (!interactive) return;
    let sleepTimer;
    
    const handleMouseMove = (e) => {
      setSleep(false);
      clearTimeout(sleepTimer);
      sleepTimer = setTimeout(() => setSleep(true), 7000);
      
      if (!svgRef.current) return;
      
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      // Move pupils dramatically by max 3.5px
      const distance = Math.min(3.5, Math.sqrt(dx*dx + dy*dy) / 50); 
      
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      svgRef.current.style.setProperty('--eye-x', `${tx}px`);
      svgRef.current.style.setProperty('--eye-y', `${ty}px`);
      // Body moves a lot more now
      svgRef.current.style.setProperty('--body-x', `${tx * 0.8}px`);
      svgRef.current.style.setProperty('--body-y', `${ty * 0.8}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    sleepTimer = setTimeout(() => setSleep(true), 7000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(sleepTimer);
    };
  }, [interactive]);

  return (
    <div className={`bot-container ${sleep ? 'bot-sleep' : ''}`} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg 
        ref={svgRef}
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ overflow: 'visible', '--eye-x': '0px', '--eye-y': '0px', '--body-x': '0px', '--body-y': '0px' }}
      >
        <g className="bot-character">
          <g className="bot-body">
            <path d="M12 2v4" />
            <circle cx="12" cy="2" r="1" fill="currentColor" />
            <rect x="4" y="6" width="16" height="14" rx="4" />
            <path d="M10 16h4" />
          </g>
          <g className="bot-eye-wrapper">
            <circle cx="8" cy="12" r="2" fill="currentColor" stroke="none" className="bot-pupil" />
            <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" className="bot-pupil" />
          </g>
        </g>
      </svg>
      {sleep && interactive && (
        <>
          <span className="zzz z1">Z</span>
          <span className="zzz z2">z</span>
          <span className="zzz z3">z</span>
        </>
      )}
    </div>
  );
};

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are an AI assistant for Saurav Bhojak's personal portfolio website. Your job is to answer questions about Saurav professionally, accurately, and concisely — as if you are his personal representative.

Here is everything about Saurav:

NAME: Saurav Bhojak
TITLE: Python Backend Developer & Architect
LOCATION: Ahmedabad, Gujarat, India
EMAIL: sauravbhojak6156@gmail.com
PHONE: +91 9328199796

SUMMARY:
Saurav is a skilled Python backend developer with 2.5+ years of experience building scalable REST APIs, microservices, ETL pipelines, and cloud-integrated systems. He is passionate about clean architecture, async processing, and leveraging modern tools including AI to accelerate development.

EXPERIENCE:
1. Python Developer at Upsquare Technologies | Ahmedabad, Gujarat | Jan 2023 – Present (Full-time)
   - Designed and developed 20+ REST APIs using Django & DRF for a project management system with real-time task tracking and role-based access control.
   - Built end-to-end HRMS REST APIs for attendance, payroll, and leave management — automating payroll calculations and reducing manual HR processing time by ~40%.
   - Implemented Celery beat scheduler with Redis to automate payroll processing and attendance jobs.
   - Developed FastAPI backend for a VPN application integrating 6+ external systems; used Celery + Redis for async server monitoring.
   - Engineered a healthcare ETL pipeline migrating millions of patient records from MSSQL to AWS RDS (EC2, S3, Lambda); applied PHI/PII masking.
   - Deployed and managed production services using Docker, Gunicorn, and Uvicorn with GitLab CI/CD pipelines.

2. Freelance Python Developer – Web Scraping | Self-Employed | Feb 2022 – Dec 2022
   - Developed custom web scraping solutions using Python (BeautifulSoup, Requests, Selenium) for multiple clients.
   - Delivered structured data exports in CSV and JSON formats.
   - Built proxy rotation and request throttling modules, reducing IP bans by ~80%.

TECHNICAL SKILLS:
- Languages: Python 3 (asyncio, OOP), JavaScript, HTML5 & CSS3, AJAX
- Frameworks: Django, Django REST Framework, Flask, FastAPI
- Databases: PostgreSQL, MySQL, MongoDB, Redis, MSSQL
- Task Queues: Celery, Celery Beat
- Cloud & DevOps: AWS (RDS, S3, Lambda, EC2), Docker, GitLab CI/CD, Jenkins, Linux, Gunicorn, Uvicorn
- Architecture: REST API Design, JWT Auth, SSO, OAuth2, WebSockets, ETL Pipelines, Data Migration
- Tools: Git, Postman, VS Code, pytest, Web Scraping (Selenium, Scrapy)

PROJECTS:
1. AI Tattoo Generation Backend – FastAPI, SSO, AWS Lambda, Docker
2. AI Numerology – FastAPI, Machine Learning, Python
3. Data Forge – Python, ETL, Data Engineering
4. Repo Pulse – JavaScript, GitHub API, Analytics

CONTACT:
- Email: sauravbhojak6156@gmail.com
- Phone: +91 9328199796
- Location: Ahmedabad, Gujarat, India

RULES:
- Be professional, friendly, concise.
- If someone asks if he is available for work, say he is open to discussing new opportunities.
- If totally off-topic, say: "I'm here to answer questions about Saurav's background. Ask me about his skills, projects, or contact info!"
- Keep responses under 150 words unless detail is truly needed.`;

const WELCOME = {
  role: 'ai',
  text: "Hi there! 👋 I'm Saurav's AI assistant. Ask me about his skills, experience, projects, or how to contact him!"
};

async function askGemini(history, userMessage) {
  // Try gemini-2.5-flash first since it has free tier quota
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: "Understood! I'm Saurav's portfolio assistant, ready to help." }] },
      ...history
        .filter(m => m !== WELCOME)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.error(`[ChatBot] ${model} failed:`, res.status, errBody);
        // Try next model
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (err) {
      console.error(`[ChatBot] Network error with ${model}:`, err);
    }
  }

  throw new Error('All models failed');
}

const ChatBot = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]     = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // FIX: accept optional text so quick-prompts can call directly
  const send = useCallback(async (overrideText = null) => {
    const text = (overrideText ?? input).trim();
    if (!text || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      // Pass current messages snapshot (before the new user msg)
      const reply = await askGemini(messages, text);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      console.error('[ChatBot] Final error:', err);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: "I'm having trouble connecting right now. Please check the console for details, or email Saurav directly at sauravbhojak6156@gmail.com 😊"
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const formatMessage = (text) => {
    // Replace **bold** with <strong>bold</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *italic* with <em>italic</em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Replace newlines with <br />
    formatted = formatted.replace(/\n/g, '<br />');
    return { __html: formatted };
  };

  return (
    <div ref={wrapperRef}>
      {/* Floating bubble */}
      <button
        className={`chatbot-bubble ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        aria-label="Open AI chat"
      >
        {isOpen ? <X size={28} /> : <BlinkingBot size={34} interactive={true} />}
        {!isOpen && <span className="bubble-pulse" />}
      </button>

      {/* Chat window */}
      <div className={`chatbot-window ${isOpen ? 'visible' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar"><BlinkingBot size={20} /></div>
            <div>
              <p className="chatbot-name">Saurav's AI Assistant</p>
              <p className="chatbot-status"><span className="status-dot" />Online</p>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
              <div className="chat-icon">
                {msg.role === 'ai' ? <BlinkingBot size={16} /> : <User size={14} />}
              </div>
              <div 
                className="chat-bubble"
                dangerouslySetInnerHTML={formatMessage(msg.text)}
              />
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg ai">
              <div className="chat-icon"><BlinkingBot size={16} /></div>
              <div className="chat-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts — only shown initially */}
        {messages.length === 1 && (
          <div className="quick-prompts">
            {['Skills & tech stack', 'Work experience', 'Notable projects', 'How to contact?'].map((q, i) => (
              <button
                key={i}
                className="quick-btn"
                onClick={() => send(q)}   // FIX: pass text directly, no setState race
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me anything about Saurav..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isTyping}
          />
          <button
            className="send-btn"
            onClick={() => send()}
            disabled={!input.trim() || isTyping}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
