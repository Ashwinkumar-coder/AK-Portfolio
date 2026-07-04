import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import LetterHover from './LetterHover';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import Experience from './Experience';
import Contact from './Contact';

const Hero = ({ activeTheme, setActiveTheme, socket }) => {
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#0c0d10]"
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-accent/5 blur-[80px] sm:blur-[120px] animate-float-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-accent-hover/5 blur-[100px] sm:blur-[150px] animate-float-reverse -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12">
        {/* Left: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-400 tracking-wide font-sans select-none flex flex-wrap gap-1.5">
            <LetterHover text="Hello," /> <LetterHover text="I'm" />
          </h2>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white select-none">
            <LetterHover text="ASHWIN KUMAR B" className="text-gradient" />
          </h1>

          <h3 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-gray-300 font-sans select-none flex flex-wrap gap-2">
            <LetterHover text="Full Stack Developer" />
          </h3>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed font-sans select-none flex flex-wrap gap-x-1 gap-y-0.5">
            <LetterHover text="Full Stack Developer with " />
            <LetterHover text="1.5+ years of experience" className="text-accent font-semibold" />
            <LetterHover text="designing, building, and deploying scalable web applications using React.js, Node.js, and Python. Passionate about clean architecture, responsive UIs, and integrating intelligence into modern web experiences." />
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExperienceOpen(true);
              }}
              className="glow-btn bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 flex items-center justify-center gap-2 cursor-pointer border-none outline-none"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsContactOpen(true);
              }}
              className="glass-card hover:bg-gray-900 border-gray-900 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Let's Connect
            </button>
          </div>

          {/* Social Icons & Quick Stats */}
          <div className="flex items-center space-x-6 pt-6 border-t border-gray-900 w-full sm:w-auto">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-900/50 transition-colors"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent-hover p-2 rounded-full hover:bg-gray-900/50 transition-colors"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <div className="h-6 w-px bg-gray-800" />
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="font-bold text-white text-base">1.5+</span>
              <span>Years Experience</span>
            </div>
          </div>
        </div>

        {/* Right: Profile Portrait */}
        <div className="lg:col-span-5 w-full flex flex-col items-center gap-6">
          {/* Portrait Container */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[360px] lg:h-[380px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl group transition-all duration-500 hover:border-accent/40 hover:shadow-accent/10">
            <img
              src="ashwin.png"
              alt="Ashwin Kumar B"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
            {/* Soft decorative vignette gradient over photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-80" />

            {/* Dynamic floating tags */}
            <div className="absolute top-4 right-4 bg-gray-950/80 border border-white/5 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-accent font-bold tracking-wider uppercase">
              Full Stack
            </div>
            <div className="absolute bottom-4 left-4 bg-gray-950/80 border border-white/5 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-gray-300 font-mono">
              Chennai, IN
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal Popup */}
      {isExperienceOpen && (
        <div
          onClick={() => setIsExperienceOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 custom-scroll bg-[#0c0d10]/95"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExperienceOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-4">
              <Experience activeTheme={activeTheme} isModal={true} />
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal Popup */}
      {isContactOpen && (
        <div
          onClick={() => setIsContactOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 custom-scroll bg-[#0c0d10]/95"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsContactOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-4">
              <Contact
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
                socket={socket}
                isModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
