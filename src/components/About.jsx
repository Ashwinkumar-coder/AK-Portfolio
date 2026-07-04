import React, { useState } from 'react';
import {
  BookOpen, Cpu, Database, Layout, Server, Settings, ShieldCheck,
  Code, Terminal, GitBranch, Sliders, Globe, AppWindow
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import LetterHover from './LetterHover';
import {
  ReactIcon, JavaScriptIcon, HTML5Icon, CSS3Icon, TailwindIcon,
  AngularIcon, VueIcon, ReduxIcon, NodeIcon, PythonIcon, ExpressIcon,
  PostgresIcon, MySQLIcon, MongoDBIcon, DockerIcon, AWSIcon, GitIcon,
  OpenAIIcon, JiraIcon, PostmanIcon
} from './TechIcons';

// Helper to map skill names to specific visual brand icons
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();

  // Frontend Brand Icons
  if (name.includes('react')) return <ReactIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name === 'javascript' || name === 'js') return <JavaScriptIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('html')) return <HTML5Icon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('css')) return <CSS3Icon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('tailwind')) return <TailwindIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('angular')) return <AngularIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('vue')) return <VueIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('redux') || name.includes('toolkit')) return <ReduxIcon className="w-3.5 h-3.5 shrink-0" />;

  // Backend Brand Icons
  if (name.includes('node')) return <NodeIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('python')) return <PythonIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('express')) return <ExpressIcon className="w-3.5 h-3.5 text-accent shrink-0" />;

  // Database Brand Icons
  if (name.includes('postgres') || name === 'postgresql') return <PostgresIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('mysql')) return <MySQLIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('mongo')) return <MongoDBIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('vector')) return <Database className="w-3.5 h-3.5 text-pink-500 shrink-0" />;

  // Tools & Platforms Brand Icons
  if (name === 'aws') return <AWSIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('docker')) return <DockerIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('hostinger')) return <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
  if (name === 'git') return <GitIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name === 'github') return <GithubIcon className="w-3.5 h-3.5 text-white shrink-0" />;
  if (name === 'jira') return <JiraIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name === 'postman') return <PostmanIcon className="w-3.5 h-3.5 shrink-0" />;

  // AI & Automation
  if (name.includes('openai') || name.includes('api')) return <OpenAIIcon className="w-3.5 h-3.5 shrink-0" />;
  if (name.includes('openclaw')) return <Cpu className="w-3.5 h-3.5 text-orange-400 shrink-0" />;
  if (name.includes('automation') || name.includes('agent')) return <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;

  // Other Essentials
  if (name.includes('jwt') || name.includes('auth') || name.includes('security')) return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
  if (name.includes('deployment') || name.includes('ci/cd')) return <Settings className="w-3.5 h-3.5 text-gray-400 shrink-0" />;
  if (name.includes('design') || name.includes('responsive')) return <Layout className="w-3.5 h-3.5 text-accent shrink-0" />;

  return <Code className="w-3.5 h-3.5 text-accent shrink-0" />;
};

const About = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillsData = [
    {
      category: 'Frontend',
      icon: <Layout className="w-5 h-5 text-accent" />,
      skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vue.js', 'Redux Toolkit'],
    },
    {
      category: 'Backend',
      icon: <Server className="w-5 h-5 text-accent" />,
      skills: ['Node.js', 'Python', 'Express.js'],
    },
    {
      category: 'Database',
      icon: <Database className="w-5 h-5 text-accent" />,
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Vector Database'],
    },
    {
      category: 'Tools & Platforms',
      icon: <Settings className="w-5 h-5 text-accent" />,
      skills: ['AWS', 'Docker', 'Hostinger', 'Git', 'GitHub', 'Jira', 'Postman'],
    },
    {
      category: 'AI & Automation',
      icon: <Cpu className="w-5 h-5 text-accent" />,
      skills: ['OpenAI API Integration', 'OpenClaw', 'AI Workflow Automation', 'AI Agents Basics'],
    },
    {
      category: 'Other Essentials',
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      skills: ['REST APIs', 'JWT Authentication', 'Deployment', 'CI/CD Basics', 'Responsive Design'],
    },
  ];

  return (
    <section id="about" className="scroll-mt-20 py-24 bg-[#0c0d10] relative px-4 sm:px-6 lg:px-8 border-t border-gray-900">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5 flex-wrap">
            <LetterHover text="About" />
            <LetterHover text="Me" className="text-gradient" />
          </h2>
          <div className="mt-3 w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
            A developer who bridges engineering and aesthetics, building resilient architectures and clean user flows.
          </p>
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Summary & Education */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <LetterHover text="Professional Summary" />
              </h3>
              <p className="text-gray-300 leading-relaxed font-sans mb-4 select-none">
                <LetterHover text="I am a Full Stack Developer with over 1.5 years of industry experience. I specialize in designing, developing, and deploying scalable web applications. My sweet spot lies at the junction of backend logic and frontend interactivity." />
              </p>
              <p className="text-gray-300 leading-relaxed font-sans select-none">
                <LetterHover text="I have a proven record of building and managing responsive layouts, REST APIs, and authentication pipelines, collaborating in agile environments, and implementing clean code methodologies." />
              </p>
            </div>

            {/* Education Box */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-full -mr-6 -mt-6 transition-transform duration-500 group-hover:scale-125" />
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5 select-none">
                <BookOpen className="w-5 h-5 text-accent" />
                <LetterHover text="Education" />
              </h3>
              <div>
                <h4 className="text-white font-semibold text-base">
                  B.E. – Computer Science Engineering
                </h4>
                <p className="text-accent font-medium text-sm mt-1">
                  SNS College of Technology, Coimbatore
                </p>
                <div className="mt-4 flex items-center space-x-2 text-xs text-gray-400 font-medium">
                  <span className="px-2.5 py-1 bg-gray-900 rounded-full border border-gray-800">
                    Graduated
                  </span>
                  <span className="px-2.5 py-1 bg-gray-900 rounded-full border border-gray-800">
                    Engineering
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Technical Skills Grid */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <LetterHover text="Technical Skill Set" />
              </h3>
              <span className="text-xs text-gray-500 italic hidden sm:inline">
                Hover columns to spotlight relative skillsets
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsData.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveCategory(item.category)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`glass-card p-5 rounded-xl border transition-all duration-300 ${activeCategory && activeCategory !== item.category
                      ? 'opacity-40 scale-[0.98]'
                      : 'opacity-100 scale-100'
                    }`}
                >
                  <div className="flex items-center space-x-3 mb-4 select-none">
                    <div className="p-2 rounded-lg bg-gray-900 border border-white/5">
                      {item.icon}
                    </div>
                    <h4 className="text-white font-bold text-sm tracking-wide">
                      <LetterHover text={item.category} />
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gray-950/60 text-gray-300 border border-gray-850 hover:border-accent/30 hover:text-accent-hover transition-all cursor-default flex items-center gap-1.5"
                      >
                        {getSkillIcon(skill)}
                        <span>{skill}</span>
                      </span>
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

export default About;
