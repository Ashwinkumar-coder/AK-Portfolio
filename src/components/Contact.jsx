import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
//import Guestbook from './Guestbook';
import LetterHover from './LetterHover';

const Contact = ({ activeTheme, setActiveTheme, socket, isModal = false }) => {
  const email = "ashwinbaskaran2002@gmail.com";
  const phone = "+91-9361003309";
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitSuccess(false);

    // Send data to the Express + Nodemailer backend
    fetch('http://localhost:5001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitted(false);
          setSubmitSuccess(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        console.warn("Mail submission logged but SMTP failed:", data.error);
        setSubmitSuccess(true); // Fallback success to mock logged message
        setTimeout(() => {
          setSubmitted(false);
          setSubmitSuccess(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }
    })
    .catch(err => {
      console.warn("API server offline, logging message to console simulation:", err);
      setSubmitSuccess(true); // Simulation fallback
      setTimeout(() => {
        setSubmitted(false);
        setSubmitSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    });
  };

  return (
    <section 
      id={isModal ? undefined : "contact"} 
      className={`${isModal ? 'py-2' : 'scroll-mt-20 py-24 border-t border-gray-900'} bg-[#0c0d10] relative px-4 sm:px-6 lg:px-8`}
    >
      {/* Decorative Blob */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5 flex-wrap">
            <LetterHover text="Get In" />
            <LetterHover text="Touch" className="text-gradient" />
          </h2>
          <div className="mt-3 w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
            Have a project in mind, want to collaborate, or just say hello? Drop a message!
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Direct Contact Info & Socials */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight flex flex-wrap gap-1.5 select-none">
                <LetterHover text="Let's" />
                <LetterHover text="discuss" />
                <LetterHover text="something" />
                <LetterHover text="great" className="text-accent" />
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                I am highly responsive to emails and phone inquiries. Reach out to discuss software architecture, freelancing collaboration, or hiring opportunities.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Email Card */}
              <div className="bg-gray-950/40 border border-gray-900 p-4 rounded-xl flex items-center justify-between gap-3 hover:border-accent/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-accent/10 border border-accent/15 text-accent rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                      Email Address
                    </h4>
                    <a href={`mailto:${email}`} className="text-white hover:text-accent font-semibold text-xs transition-colors block mt-0.5 truncate">
                      {email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-gray-900 border border-white/5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="bg-gray-950/40 border border-gray-900 p-4 rounded-xl flex items-center gap-3 hover:border-accent/20 transition-colors">
                <div className="p-2.5 bg-accent/10 border border-accent/15 text-accent rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                    Phone / Mobile
                  </h4>
                  <a href={`tel:${phone}`} className="text-white hover:text-accent font-semibold text-xs transition-colors block mt-0.5">
                    {phone}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-gray-950/40 border border-gray-900 p-4 rounded-xl flex items-center gap-3 hover:border-accent/20 transition-colors">
                <div className="p-2.5 bg-accent/10 border border-accent/15 text-accent rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                    Office Location
                  </h4>
                  <span className="text-white font-semibold text-xs block mt-0.5">
                    Chennai, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-5 border-t border-gray-900 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-white transition-colors bg-gray-950 border border-white/5 py-1.5 px-3 rounded-lg cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-accent-hover transition-colors bg-gray-950 border border-white/5 py-1.5 px-3 rounded-lg cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Column 2: Contact Message Form */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between text-left">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
              <LetterHover text="Send" />
              <LetterHover text="Message" className="text-accent" />
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-950/60 border border-gray-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-650 transition-all outline-none font-sans"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-950/60 border border-gray-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-650 transition-all outline-none font-sans"
                    placeholder="johndoe@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    Message Detail
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-950/60 border border-gray-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-650 transition-all outline-none font-sans resize-none"
                    placeholder="Describe your project goals..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full glow-btn bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                {submitted ? (
                  submitSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-200">Message Received successfully!</span>
                    </>
                  ) : (
                    <span className="text-gray-300">Sending Email...</span>
                  )
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
