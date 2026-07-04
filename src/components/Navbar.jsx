import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import LetterHover from './LetterHover';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (window.scrollToSection) {
      window.scrollToSection(id);
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="bg-accent p-2 rounded-lg mr-2.5 transition-transform duration-300 group-hover:rotate-12 shadow-sm shadow-accent/20">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-wider text-white group-hover:text-accent-hover transition-colors flex items-center">
              <LetterHover text="ASHWIN" /><span className="text-accent">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-sans font-medium text-sm transition-all duration-300 relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-accent font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="glow-btn bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-lg border-b border-white/5 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'bg-accent/10 text-accent font-semibold border-l-4 border-accent'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 px-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full glow-btn bg-accent text-white font-medium py-3 rounded-lg text-center shadow-lg shadow-accent/10 cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
