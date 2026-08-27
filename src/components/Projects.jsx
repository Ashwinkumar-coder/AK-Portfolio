import React, { useState } from 'react';
import { ExternalLink, Layers, Calendar, UserCheck, ShieldAlert } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import LetterHover from './LetterHover';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projectsData = [
    {
      title: "AI Testing Orchestrator",
      subtitle: "AI-Powered Test Automation & Self-Healing System",
      timeline: "Aug 2026 – Present",
      image: "ai_testing.png",
      tech: ["React.js", "Python", "FastAPI", "Playwright", "PostgreSQL", "AWS Bedrock", "WebSockets"],
      description: "An AI-powered testing orchestrator that analyzes Git repositories and Swagger schemas to autonomously generate BDD scenarios and Playwright test scripts.",
      details: [
        "LLM Integration: Integrated AWS Bedrock (DeepSeek) using Model Context Protocol (MCP) and ReAct loops.",
        "Sandbox Execution: Built backend with FastAPI handling isolated Playwright executions in ephemeral environments.",
        "Real-Time & Security: Implemented WebSocket execution tracking and AES-encrypted credential vault.",
        "Self-Healing RCA: AI-powered Root Cause Analysis capturing DOM snapshots and traces to generate code patches."
      ],
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "GTMer – Client Project",
      subtitle: "AI-Powered Go-To-Market Automation Platform",
      timeline: "Oct 2025 – Jul 2026",
      image: "gtmer.png",
      tech: ["React.js", "Python", "FastAPI", "PostgreSQL", "Redis", "AWS Bedrock", "Docker"],
      description: "An AI-powered Go-To-Market platform utilizing a microservices architecture to automate complex sales outreach workflows.",
      details: [
        "Lead Intelligence: Integrated AWS Bedrock LLMs for ICP scoring, competitor analysis, and personalized campaigns.",
        "RAG Conversational Chatbot: Built robust RAG-based chatbot utilizing vector search for real-time sales assistance.",
        "Backend Infrastructure: Managed PostgreSQL & Redis with background workers for data scraping and metered billing."
      ],
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Chennai Pet Care System",
      subtitle: "Pet Registration & Animal Management Platform",
      timeline: "Dec 2024 – Sep 2025",
      image: "petcare.png",
      tech: ["React.js", "Redux Toolkit", "Bootstrap", "Leaflet", "REST APIs"],
      description: "A comprehensive, multi-portal Pet Registration and Animal Management Platform supporting distinct workflows for citizens, licensing officers, and admins.",
      details: [
        "Scalable Modules: Architected modules for managing pet licenses, travel certificates, microchips, and extensive profiles.",
        "Spatial Data Integration: Implemented an interactive, map-based grievance reporting system leveraging Leaflet.",
        "Complex UIs: Built dynamic data tables and administrative dashboards using React.js and Redux Toolkit."
      ],
      demoLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <section id="projects" className="scroll-mt-20 py-24 bg-[#0c0d10]/80 relative px-4 sm:px-6 lg:px-8 border-t border-gray-900">
      {/* Decorative Blur Background Blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5 flex-wrap">
            <LetterHover text="Featured" />
            <LetterHover text="Projects" className="text-gradient" />
          </h2>
          <div className="mt-3 w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
            A showcase of production-ready full-stack web applications and custom systems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Project Header */}
              <div className="relative p-6 sm:p-8 pb-4 flex flex-col items-start justify-between border-b border-gray-900/50 mb-4 group-hover:bg-accent/5 transition-colors duration-500">
                <div className="w-full flex justify-between items-start mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-accent-hover transition-colors">
                    {project.title}
                  </h3>
                  <div className="bg-gray-950/80 border border-white/5 px-2.5 py-1 rounded-lg text-[10px] text-accent font-semibold font-sans shrink-0">
                    {project.timeline}
                  </div>
                </div>
                <p className="text-xs text-accent font-medium mt-1 leading-relaxed font-sans">
                  {project.subtitle}
                </p>
              </div>

              {/* Text Section */}
              <div className="p-6 sm:p-8 pt-0 flex-grow flex flex-col justify-between text-left">
                <div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6 select-none">
                    {project.description}
                  </p>

                  {/* Bullet Key Points */}
                  <div className="space-y-3.5 mb-6">
                    <h4 className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                      Key Modules Developed
                    </h4>
                    <ul className="space-y-2">
                      {project.details.map((detail, dIdx) => {
                        const parts = detail.split(': ');
                        return (
                          <li key={dIdx} className="flex items-start gap-2 text-[11px] text-gray-400 font-sans leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            <span>
                              <strong className="text-white font-semibold">{parts[0]}:</strong> {parts[1]}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-900 mt-auto">
                  {project.tech.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-semibold px-2 py-1 rounded bg-gray-900 border border-white/5 text-gray-400 hover:text-accent hover:border-accent/25 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
