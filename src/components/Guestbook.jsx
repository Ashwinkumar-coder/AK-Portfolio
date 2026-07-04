import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Users, Palette } from 'lucide-react';
import LetterHover from './LetterHover';

/* global google */

const Guestbook = ({ activeTheme, setActiveTheme, socket }) => {
  const [emailInput, setEmailInput] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [connections, setConnections] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const themeOptions = [
    { name: 'Default Navy/Blue', value: 'blue', colorClass: 'bg-blue-500' },
    { name: 'Emerald Mint', value: 'emerald', colorClass: 'bg-emerald-500' },
    { name: 'Amber Glow', value: 'amber', colorClass: 'bg-amber-500' },
    { name: 'Rose Petal', value: 'rose', colorClass: 'bg-rose-500' },
  ];

  // Default recruiter entries to populate lists
  const defaultConnections = [
    { email: 'talent@google.com', theme: 'blue', date: 'Jul 4, 2026' },
    { email: 'cto@annulartech.com', theme: 'emerald', date: 'Jul 4, 2026' },
    { email: 'recruiter@stripe.com', theme: 'rose', date: 'Jul 3, 2026' },
    { email: 'founder@ycombinator.com', theme: 'amber', date: 'Jul 2, 2026' }
  ];

  // Decode Google JWT Identity tokens on client side
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to parse Google JWT credential payload:", error);
      return null;
    }
  };

  // Google OAuth Success Callback
  const handleCredentialResponse = (response) => {
    const payload = decodeJwt(response.credential);
    if (payload && payload.email) {
      registerVisitorEmail(payload.email);
    } else {
      setErrorMsg("Failed to resolve email from Google sign-in.");
    }
  };

  // Initialize Google Identity Button
  useEffect(() => {
    const initGoogleGSI = () => {
      if (window.google && window.google.accounts) {
        if (!window.googleGsiInitialized) {
          window.google.accounts.id.initialize({
            client_id: "872348574312-placeholder.apps.googleusercontent.com", // Placeholder: requires client setup for production origin
            callback: handleCredentialResponse,
          });
          window.googleGsiInitialized = true;
        }
        
        const btnEl = document.getElementById("google-signin-btn");
        if (btnEl) {
          window.google.accounts.id.renderButton(btnEl, { 
            theme: "outline", 
            size: "large", 
            width: "270",
            text: "signin_with" 
          });
        }
      }
    };

    initGoogleGSI();
    const gsiInterval = setInterval(() => {
      if (window.google) {
        initGoogleGSI();
        clearInterval(gsiInterval);
      }
    }, 1000);

    return () => clearInterval(gsiInterval);
  }, [selectedTheme]); // Re-render button if selectedTheme changes

  // Load guestbook entries from local storage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_connections');
    if (saved) {
      setConnections(JSON.parse(saved));
    } else {
      setConnections(defaultConnections);
      localStorage.setItem('portfolio_connections', JSON.stringify(defaultConnections));
    }
  }, []);

  const registerVisitorEmail = (emailAddress) => {
    setErrorMsg('');
    setSuccess(false);

    // Save locally
    const newConnection = {
      email: emailAddress.trim(),
      theme: selectedTheme,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setConnections(prev => {
      if (prev.some(c => c.email.toLowerCase() === emailAddress.toLowerCase())) {
        return prev;
      }
      const updated = [newConnection, ...prev];
      localStorage.setItem('portfolio_connections', JSON.stringify(updated));
      return updated;
    });

    // Notify socket server of visitor's email identity!
    if (socket) {
      socket.emit('register_email', { email: emailAddress.trim() });
    }

    // Shift entire site color theme dynamically
    setActiveTheme(selectedTheme);

    setSuccess(true);
    setEmailInput('');
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleManualRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    registerVisitorEmail(emailInput);
  };

  const selectConnectionTheme = (theme) => {
    setActiveTheme(theme);
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl h-full flex flex-col justify-between text-left">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2.5 select-none">
            <Users className="w-5 h-5 text-accent" />
           
          </h3>
          <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/25">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>Live Sync</span>
          </span>
        </div>
        <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
          Register below to sign the guestbook. Choose a card color: clicking your card (or default recruiter cards) shifts the entire site's accent theme dynamically!
        </p>

        {/* Google Sign-in button */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
            Sign In with Google (Chrome Account)
          </span>
          <div id="google-signin-btn" className="w-full flex justify-center py-1"></div>
        </div>

        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-gray-900 w-full absolute" />
          <span className="bg-[#14161a] px-3 text-[9px] font-semibold text-gray-500 uppercase z-10 font-mono">
            Or simulation fallback
          </span>
        </div>

        {/* Manual Input Fallback */}
        <form onSubmit={handleManualRegister} className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label htmlFor="guestEmail" className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              Manual Email Input
            </label>
            <input
              type="email"
              id="guestEmail"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-gray-950/60 border border-gray-800 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-650 transition-all outline-none font-sans"
              placeholder="recruiter@company.com"
            />
          </div>

          {/* Theme Color Selector */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">
              Choose Card Accent Color Theme
            </span>
            <div className="flex gap-2">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedTheme(opt.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer ${
                    selectedTheme === opt.value
                      ? 'border-accent text-white bg-accent/10 font-bold'
                      : 'border-gray-800 text-gray-400 bg-gray-950/20 hover:text-white'
                  }`}
                  title={opt.name}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${opt.colorClass}`} />
                  <span className="capitalize">{opt.value}</span>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-400 font-sans font-semibold">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full glow-btn bg-accent hover:bg-accent-hover text-white font-bold py-2.5 rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-accent/10"
          >
            {success ? (
              <span className="text-emerald-200">Registered Successfully!</span>
            ) : (
              <span>Register Simulation Visit</span>
            )}
          </button>
        </form>
      </div>

      {/* Guest List */}
      <div className="border-t border-gray-900 pt-5 mt-auto">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          Recent Connections (Click to apply design)
        </h4>

        <div className="max-h-36 overflow-y-auto space-y-2 pr-1.5 custom-scroll">
          {connections.length === 0 ? (
            <p className="text-xs text-gray-500 font-sans italic">No visitors yet. Be the first!</p>
          ) : (
            connections.map((c, idx) => (
              <div
                key={idx}
                onClick={() => selectConnectionTheme(c.theme)}
                className={`p-2.5 rounded-lg bg-gray-950/40 border border-gray-900 hover:border-accent/40 flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 ${
                  activeTheme === c.theme ? 'border-accent bg-accent/5 ring-1 ring-accent/30' : ''
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    c.theme === 'blue' ? 'bg-blue-500' :
                    c.theme === 'emerald' ? 'bg-emerald-500' :
                    c.theme === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                  <span className="text-[11px] font-semibold text-gray-300 truncate hover:text-accent select-all">
                    {c.email}
                  </span>
                </div>
                <span className="text-[9px] text-gray-550 shrink-0 font-sans">
                  {c.date}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
