import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
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
    <footer className="bg-[#0c0d10] border-t border-gray-900 py-12 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand / Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
          <div className="bg-gray-900 border border-white/5 p-2 rounded-lg mr-2.5 transition-transform duration-300 group-hover:rotate-12">
            <Terminal className="text-accent w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg text-white">
            ASHWIN<span className="text-accent">.</span>
          </span>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
            About
          </button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-white transition-colors cursor-pointer">
            Experience
          </button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors cursor-pointer">
            Projects
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">
            Contact
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 font-sans">
          &copy; {new Date().getFullYear()} Ashwin Kumar B. All rights reserved.
        </div>
      </div>

      {/* Back to top floating button indicator inside footer */}
      <div className="absolute right-8 bottom-8 hidden md:block">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-gray-900 hover:bg-gray-800 border border-white/5 text-accent hover:text-accent-hover rounded-full transition-colors cursor-pointer"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
