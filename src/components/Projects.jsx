import React, { useState } from 'react';
import { ExternalLink, Layers, Calendar, UserCheck, ShieldAlert } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import LetterHover from './LetterHover';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projectsData = [
    {
      title: "HealthCare Platform",
      subtitle: "Doctor Appointment & Diagnostic Management System",
      timeline: "Dec 2024 – May 2025",
      image: "healthcare.png",
      tech: ["React.js", "Redux Toolkit", "Tailwind CSS"],
      description: "Developed a comprehensive digital healthcare portal supporting patient medical appointment booking (online and walk-in) and diagnostic facility tracking.",
      details: [
        "Doctor Search & Scheduling: Real-time query lookups based on medical specialization and availability calendar.",
        "Role-Based Dashboards: Custom dashboard dashboards for patients, doctors, and lab technicians.",
        "Diagnostic Modules: Built booking processes for lab tests and diagnostic report downloading.",
        "Centralized State: Structured Redux Toolkit to sync global patient data and minimize component re-renders."
      ],
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Tifoh Meeting Space",
      subtitle: "Smart Meeting Room Booking & Synchronization System",
      timeline: "Jun 2025 – Nov 2025",
      image: "tifoh.png",
      tech: ["React.js", "Node.js", "REST APIs", "Google Calendar API", "Microsoft Graph API"],
      description: "Built a multi-tenant enterprise conference space booking platform synchronized in real-time with outer calendars.",
      details: [
        "Calendar Integrations: Sync schedules bidirectionally with Google Calendar and Microsoft Graph APIs.",
        "Secure RBAC: Implemented JSON Web Token (JWT) credentials and strict role-based access levels.",
        "Real-Time Tracking: Rendered real-time occupancy updates and availability slots.",
        "Scalable Backend: Configured Node/Express route handlers to process parallel reservations efficiently."
      ],
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "PET Care Registry",
      subtitle: "Government Pet Registration & Vaccination Tracking",
      timeline: "Dec 2025 – Present",
      image: "petcare.png",
      tech: ["React.js", "Redux", "Node.js"],
      description: "Constructed a civic portal for registry tracking of domestic pets, vaccine history logs, and veterinarian appointments.",
      details: [
        "Vaccine Scheduling: Core modules managing vaccination histories and automatic email alerts.",
        "Reusable Forms: Constructed custom form validation libraries to capture pet metrics.",
        "Admin Console: Designed table filters, search filters, and batch status controls for admin clerks.",
        "Security Integrations: Configured encrypted user login tunnels and secure server database operations."
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
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Timeline Overlay */}
                <div className="absolute top-3 right-3 bg-gray-950/80 border border-white/5 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-accent font-semibold font-sans">
                  {project.timeline}
                </div>
                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              </div>

              {/* Text Section */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-accent-hover transition-colors select-none flex flex-wrap gap-1.5">
                    <LetterHover text={project.title} />
                  </h3>
                  <p className="text-xs text-accent font-medium mt-1 mb-4 leading-relaxed font-sans">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6 select-none">
                    <LetterHover text={project.description} />
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
