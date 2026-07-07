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
      title: "Frontend Engineering & Layout Design",
      icon: <Layout className="w-5 h-5 text-accent" />,
      description: "Built reusable React UI components, complex dashboards, and responsive layout grids using Tailwind CSS and modern web standard practices.",
      highlights: ["Figma to functional React translation", "Highly responsive, cross-browser compatible layouts", "Reusable form controllers & state validation templates"]
    },
    {
      title: "API Design & Backend Security",
      icon: <Server className="w-5 h-5 text-accent" />,
      description: "Designed and developed scalable REST APIs in Node.js (Express) and Python. Implemented token authorization (JWT) and role-based access controllers (RBAC) to protect sensitive client modules.",
      highlights: ["JSON Web Token (JWT) workflow integration", "Secure router authentication guards", "Unified error handling middleware configurations"]
    },
    {
      title: "Database Performance & Optimization",
      icon: <Database className="w-5 h-5 text-accent" />,
      description: "Designed schemas, relational database tables, and document collections using PostgreSQL and MongoDB. Focused heavily on writing optimized SQL/Aggregation queries.",
      highlights: ["Reduced API load/response times with indexed queries", "Handled CRUD operations and data-migrations", "Created complex data aggregation reports for dashboard modules"]
    },
    {
      title: "AWS Cloud & Deployment Infrastructure",
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      description: "Deployed production web platforms and managed cloud servers on Amazon Web Services (AWS) and Hostinger, establishing environment parameters and system dependencies.",
      highlights: ["AWS EC2 instance management and Node server daemon scripting", "DNS configuration and SSL certificate installations", "Environment variable configurations for Dev/Staging/Production"]
    },
    {
      title: "Agile Collaboration & Stability",
      icon: <Users className="w-5 h-5 text-accent" />,
      description: "Collaborated inside Agile development environments using Jira to complete sprint cycles. Resolved production bugs swiftly and improved system uptime.",
      highlights: ["Cross-functional syncs with designers & QA engineers", "Conducted root cause analysis for live bug fixes", "Improved overall code stability and performance metrics"]
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
              <LetterHover text='"Developing, configuring, and optimizing production-grade modules in collaborative Agile sprints, delivering scalable web apps with Node, React, and AWS."' />
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
