import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from '././components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashCursor from './components/SplashCursor';
import { Eye } from 'lucide-react';
import { io } from 'socket.io-client';

function App() {
  const [activeTheme, setActiveTheme] = useState('blue');
  const [liveViewers, setLiveViewers] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorClicked, setCursorClicked] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);
  
  const socketRef = useRef(null);

  // Setup custom mouse cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setCursorClicked(true);
    const handleMouseUp = () => setCursorClicked(false);

    const handleHoverStart = () => setCursorHovered(true);
    const handleHoverEnd = () => setCursorHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Track dynamic hovers on interactive items
    const setupHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], input[type="submit"], select');
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', handleHoverStart);
        target.removeEventListener('mouseleave', handleHoverEnd);
        target.addEventListener('mouseenter', handleHoverStart);
        target.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    setupHoverListeners();

    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  // Setup WebSocket connection to Node backend
  useEffect(() => {
    // Define global scroll navigation method
    window.scrollToSection = (id) => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Connect to port 5001 to avoid AirPlay conflict
    const socket = io('http://localhost:5001');
    socketRef.current = socket;

    // Global document-level click listener to register actual link and button clicks
    const handleGlobalInteractionClick = (event) => {
      const interactiveEl = event.target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
      if (interactiveEl && socketRef.current && typeof socketRef.current.emit === 'function') {
        try {
          socketRef.current.emit('register_click');
        } catch (err) {
          console.warn("Socket interaction emission failed:", err);
        }
      }
    };

    document.addEventListener('click', handleGlobalInteractionClick);

    // Listen to real-time analytics updates from the server
    socket.on('analytics_update', (data) => {
      setLiveViewers(data.activeViewers);
    });

    return () => {
      try {
        delete window.scrollToSection;
      } catch (e) {}
      document.removeEventListener('click', handleGlobalInteractionClick);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <SplashCursor />
      <div className={`min-h-screen bg-[#0c0d10] text-gray-100 flex flex-col theme-${activeTheme} selection:bg-accent/30 selection:text-accent-hover`}>
        <Navbar activeTheme={activeTheme} />
        <main className="flex-grow">
          <Hero 
            activeTheme={activeTheme} 
            setActiveTheme={setActiveTheme} 
            socket={socketRef.current} 
          />
          <About activeTheme={activeTheme} />
          <Experience activeTheme={activeTheme} />
          <Projects activeTheme={activeTheme} />
          <Contact 
            activeTheme={activeTheme} 
            setActiveTheme={setActiveTheme} 
            socket={socketRef.current}
          />
        </main>
        <div className="pt-20">
          <Footer />
        </div>

        {/* Floating Live Activity Feed Tracker */}
        <div className="fixed bottom-4 left-4 z-40 max-w-[200px] w-full hidden sm:block">
          {/* Floating Hub Card */}
          <div className="glass-card rounded-2xl p-4 shadow-xl border border-white/5 flex flex-col gap-2 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Analytics Hub
              </span>
              <div className="flex items-center gap-1 bg-accent/10 border border-accent/25 px-2 py-0.5 rounded text-[9px] font-semibold text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 border border-accent/10 rounded-lg text-accent">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-white">{liveViewers}</span>
                    <span className="text-[10px] text-gray-400 font-sans">Active Viewers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Custom Cursor Follower */}
        <div
          className={`custom-cursor-dot ${cursorClicked ? 'clicked' : ''} ${cursorHovered ? 'hovered' : ''}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
        <div
          className={`custom-cursor-ring ${cursorClicked ? 'clicked' : ''} ${cursorHovered ? 'hovered' : ''}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      </div>
    </>
  );
}

export default App;
