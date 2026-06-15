import React, { useState } from 'react';
import './Contact.css';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const formData = new FormData(e.target);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    
    if (!accessKey) {
      setStatus('Please set VITE_WEB3FORMS_KEY in your .env file to send emails.');
      return;
    }
    
    formData.append('access_key', accessKey);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus(''), 3000);
  };
  return (
    <section id="contact" className="section container">
      <div className="section-header reveal">
        <div className="section-line"></div>
        <h2 className="section-title gradient-text">Get In Touch</h2>
      </div>

      <div className="contact-content reveal">
        <div className="contact-info">
          <h3>Let's build something amazing together.</h3>
          <p className="contact-text">
            Whether you have a question about backend architecture, want to discuss a potential project, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <Mail className="contact-icon" />
              <a href="mailto:sauravbhojak6156@gmail.com" className="contact-link">sauravbhojak6156@gmail.com</a>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <a href="tel:+919328199796" className="contact-link">+91 9328199796</a>
            </div>
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <span>Ahmedabad, India</span>
            </div>
          </div>
        </div>

        <form className="contact-form glass" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Your message here..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'Sending...'}>
            {status === 'Sending...' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {status && status !== 'Sending...' && (
        <div className="toast glass">
          {status === 'success' ? 'Message sent successfully!' : 'Something went wrong. Please try again.'}
        </div>
      )}
    </section>
  );
};

export default Contact;
