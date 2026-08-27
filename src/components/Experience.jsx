import React from 'react';
import { Briefcase, Calendar, MapPin, Zap, Database, Server, Layout, ShieldCheck, Users } from 'lucide-react';
import LetterHover from './LetterHover';

const Experience = ({ isModal = false }) => {
  const jobTitle = "Full Stack Developer";
  const company = "Annular Technologies";
  const location = "Chennai, India";
  const tenure = "Dec 2024 – Present";

  const keyAchievements = [
    {
      title: "Full-Stack & Microservices",
      icon: <Server className="w-5 h-5 text-accent" />,
      description: "Developed full-stack web applications and microservices using React.js, Node.js, Python, and FastAPI.",
      highlights: ["React.js, Node.js, Python & FastAPI", "Scalable microservices architecture"]
    },
    {
      title: "Frontend & Responsive UIs",
      icon: <Layout className="w-5 h-5 text-accent" />,
      description: "Built responsive UIs with React.js, Tailwind CSS, and Redux Toolkit, ensuring seamless cross-device experiences.",
      highlights: ["Tailwind CSS & Redux Toolkit", "Seamless cross-device experiences"]
    },
    {
      title: "API Design & Security",
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      description: "Designed and integrated secure REST APIs with JWT authentication and role-based access control (RBAC).",
      highlights: ["JSON Web Token (JWT) integration", "Role-based access control (RBAC)"]
    },
    {
      title: "Database & Optimization",
      icon: <Database className="w-5 h-5 text-accent" />,
      description: "Developed and optimized database-driven applications using PostgreSQL, MySQL, MongoDB, and Redis.",
      highlights: ["PostgreSQL, MySQL, MongoDB", "Redis integration"]
    },
    {
      title: "AI & API Integrations",
      icon: <Zap className="w-5 h-5 text-accent" />,
      description: "Integrated third-party APIs for payments, communications, and LLM-powered AI functionalities.",
      highlights: ["LLM-powered AI integrations", "Payments & communications APIs"]
    },
    {
      title: "Cloud & Deployment",
      icon: <Users className="w-5 h-5 text-accent" />,
      description: "Handled end-to-end deployment on AWS and Hostinger while optimizing API performance and resolving complex production bugs.",
      highlights: ["AWS and Hostinger deployments", "API performance optimization"]
    }
  ];

  return (
    <section
      id={isModal ? undefined : "experience"}
      className={`${isModal ? 'py-2' : 'scroll-mt-20 py-24 border-t border-gray-900'} bg-[#0c0d10] relative px-4 sm:px-6 lg:px-8`}
    >
      {/* Background Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5 flex-wrap">
            <LetterHover text="Work" />
            <LetterHover text="Experience" className="text-gradient" />
          </h2>
          <div className="mt-3 w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
            A chronological timeline of my professional work history and engineering milestones.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-gray-800 ml-2 sm:ml-6 md:ml-12 pl-4 sm:pl-8 md:pl-10 space-y-12">
          {/* Pulsating Indicator Node */}
          <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-accent border-4 border-[#0c0d10] shadow-lg shadow-accent/50 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          {/* Job Overview Card */}
          <div className="glass-card p-4 sm:p-8 rounded-2xl relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Current Position</span>
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight select-none">
                  <LetterHover text={jobTitle} />
                </h3>
                <p className="text-accent font-semibold text-lg mt-1 select-none">
                  <LetterHover text={company} />
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {tenure}
                </span>
                <span className="hidden sm:inline text-gray-700">|</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {location}
                </span>
              </div>
            </div>

            <p className="text-gray-300 font-sans mb-8 leading-relaxed text-left border-l-2 border-accent/30 pl-4 italic select-none">
              "Developing, configuring, and optimizing production-grade modules in collaborative Agile sprints, delivering scalable web apps with Node, React, and AWS."
            </p>

            {/* Achievement Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyAchievements.map((item, idx) => (
                <div key={idx} className="bg-gray-950/60 border border-gray-850 p-4 sm:p-6 rounded-xl hover:border-accent/20 transition-all duration-305 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3 select-none">
                      <div className="p-2 rounded-lg bg-gray-900 border border-white/5">
                        {item.icon}
                      </div>
                      <h4 className="text-white font-bold text-sm tracking-wide leading-tight">
                        <LetterHover text={item.title} />
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-gray-900">
                    {item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5 text-[10px] text-gray-500 font-sans">
                        <Zap className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
