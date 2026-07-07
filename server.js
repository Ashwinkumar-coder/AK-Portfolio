import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json()); // Enable parsing of JSON body payloads

// Load .env file variables manually if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    // Skip empty lines or comments
    if (!line.trim() || line.trim().startsWith('#')) return;
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      process.env[key] = val;
    }
  });
}

// Serve index check route
app.get('/', (req, res) => {
  res.send('Vite Realtime Portfolio Backend is Running.');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const VISITS_FILE = path.join(__dirname, 'visits.json');

// Read count safely
const getVisits = () => {
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, 'utf8');
      return JSON.parse(data).count || 14248;
    }
  } catch (error) {
    console.error("Error reading visits file:", error);
  }
  return 14248;
};

// Save count safely
const saveVisits = (count) => {
  try {
    fs.writeFileSync(VISITS_FILE, JSON.stringify({ count }), 'utf8');
  } catch (error) {
    console.error("Error writing visits file:", error);
  }
};

let totalVisits = getVisits();
let viewerList = [];

// REST API endpoint to retrieve analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    totalVisits,
    activeViewers: viewerList.length,
    viewerList
  });
});

// REST API endpoint to receive contact form submissions and send email
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  console.log(`\n📬 [Contact Form Submission]`);
  console.log(`From: ${name} (${email})`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}\n`);

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassRaw = process.env.SMTP_PASS;
  // Automatically strip spaces from the password for robustness
  const smtpPass = smtpPassRaw ? smtpPassRaw.replace(/\s+/g, '') : '';

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost || 'smtp.gmail.com',
        port: parseInt(smtpPort, 10),
        secure: smtpPort == 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: `"Portfolio Contact - ${name}" <ashwinbaskaran2002@gmail.com>`,
        to: 'ashwinbaskaran2002@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `New Portfolio Message received from ${name} (${email}):\n\n${message}`,
        replyTo: email
      });

      console.log(`📧 [Email Sent] Successfully delivered to ashwinbaskaran2002@gmail.com`);
      res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error("❌ [Email Error] Nodemailer transport failure:", error);
      res.status(500).json({ success: false, error: 'SMTP delivery failed, message logged to console.' });
    }
  } else {
    console.log(`💡 [Email Sim] No SMTP credentials (SMTP_USER/SMTP_PASS) configured in environment.`);
    console.log(`Simulating success: Message logged successfully in terminal.`);
    res.json({ success: true, message: 'Message logged in server console (Simulation Mode).' });
  }
});

// REST API endpoint for AI assistant chat
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).send('Invalid request');
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');

  const userQuery = messages[messages.length - 1]?.content || '';
  const queryLower = userQuery.toLowerCase();

  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages.map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            })),
            systemInstruction: {
              parts: [{ text: `You are the professional executive assistant to Abakwe Carrington. Keep answers professional. Absolute rules: do NOT output asterisks, hashes, underscores, or bullet lists anywhere in your response. Organize in readable paragraphs. Keep it to 2-3 paragraphs. Stop scope: only discuss Abakwe.` }]
            }
          })
        }
      );

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data:')) {
              try {
                const dataJson = JSON.parse(line.substring(5).trim());
                const text = dataJson.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  res.write(text);
                }
              } catch (e) {}
            }
          }
        }
        return res.end();
      }
    } catch (err) {
      console.error("Gemini API error:", err);
    }
  } else if (anthropicKey) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 600,
          system: `You are the professional executive assistant to Abakwe Carrington. STRICT SCOPE: Only discuss Abakwe. DO NOT output asterisks, hashtags, or markdown formatting anywhere. Use blank line breaks between paragraphs.`,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          stream: true
        })
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();
          for (const line of lines) {
            if (line.startsWith('data:')) {
              try {
                const json = JSON.parse(line.slice(5).trim());
                if (json.type === 'content_block_delta' && json.delta?.text) {
                  res.write(json.delta.text);
                }
              } catch (e) {}
            }
          }
        }
        return res.end();
      }
    } catch (err) {
      console.error("Anthropic API error:", err);
    }
  }

  // Fallback / Simulated Response
  let responseText = "";

  if (queryLower.includes('available') || queryLower.includes('availability')) {
    responseText = "Abakwe Carrington is currently available for remote systems architecture, backend infrastructure, and platform engineering roles. He has capacity for select high-impact contract consulting engagements.\n\nHis primary working hours align globally, and he routinely handles cross-timezone coordination with clients in North America, Europe, and APAC with a minimum of 4 hours daily synchronous overlap.\n\nIf you have a potential fit, you can reach him directly at abakwecarrington@gmail.com or submit details through the contact form on this site.";
  } else if (queryLower.includes('engage') || queryLower.includes('structure') || queryLower.includes('rate') || queryLower.includes('contract')) {
    responseText = "Carrington structures engagements flexibly to suit the scope of the project. For ongoing development and advisory, he typically works on a weekly or monthly retainer model. For well-defined, short-term engineering deliverables, he works against fixed-price milestones.\n\nHe ensures clear service boundary agreements, weekly progression updates, and structured handoff documentation to ensure internal engineering teams are set up to successfully maintain and extend the system post-launch.";
  } else if (queryLower.includes('timezone') || queryLower.includes('remote') || queryLower.includes('communicate')) {
    responseText = "Yes, Carrington works fully remote and has done so for over 5 years. He coordinates seamlessly with clients globally. He communicates daily via Slack, Discord, email, and handles structured reviews through GitHub pull requests.\n\nHe operates with high-bandwidth documentation, ensuring every system decision is transparent and archived.";
  } else if (queryLower.includes('similar') || queryLower.includes('relevant') || queryLower.includes('experience') || queryLower.includes('project')) {
    responseText = "Carrington has engineered multiple production-ready products. Most recently, he built RecoverDerm, a HIPAA-compliant healthcare platform on AWS, reducing vulnerabilities by 60% and manual workflow by 40%.\n\nHe also built Orion, a distributed surveillance system across three microservices, connecting embedded camera hardware with a live WebRTC dashboard over WebSockets. Another notable project is Wytnest, a multi-tenant video testimonial collection SaaS with cloud-based HLS video streaming and Supabase RLS isolation.";
  } else if (queryLower.includes('ai') || queryLower.includes('vision') || queryLower.includes('embedded') || queryLower.includes('robot')) {
    responseText = "Abakwe has deep experience integrating AI models and embedded pipelines. In his NextGen Robotics role, he built Orion-Core, which streams H.264 video from cameras using GStreamer/OpenCV and uses Protobuf binary serialization to push system telemetry to a Django Channels middleware.\n\nHe is currently implementing YOLOv8 pipeline leak detection on thermal sensor feeds for automated alert notifications.";
  } else if (queryLower.includes('hipaa') || queryLower.includes('regulated') || queryLower.includes('compliance')) {
    responseText = "Carrington has strong compliance expertise. While building RecoverDerm, he implemented strict end-to-end encryption for patient records, role-based access permissions, secure JWT refresh token rotations, and automated audit logs.\n\nHe designs databases and server communication pathways around a zero-trust model to meet rigorous international data compliance requirements.";
  } else if (queryLower.includes('speed') || queryLower.includes('fast') || queryLower.includes('deliver') || queryLower.includes('ship')) {
    responseText = "His engineering motto is momentum over perfection. He prefers building modular, cleanly separated services that can be shipped quickly and iterated upon based on production metrics, rather than spending months planning a bloated monolith.";
  } else if (queryLower.includes('stack') || queryLower.includes('technologies') || queryLower.includes('languages') || queryLower.includes('specialise')) {
    responseText = "His primary technical specialization lies in Backend Architecture and Cloud Infrastructure. His backend toolkit includes Go, Python (Django, Django Channels, Flask), Node.js, and PostgreSQL/Redis.\n\nOn the cloud and infrastructure layer, he specializes in AWS, Docker, microservices orchestration, CI/CD pipelines, and secure WebSockets.\n\nAdditionally, he delivers high-end frontends using React, Next.js, Framer Motion, and GSAP scroll animations.";
  } else {
    responseText = "Hello! I am Carrington's assistant. Abakwe Carrington is an Infrastructure & Systems Architect specializing in cloud infrastructure, real-time streaming pipelines, and fault-tolerant backends.\n\nOver his career, he has shipped over 17 production systems. He is currently open to remote engineering roles and consulting contracts.\n\nFeel free to ask about his technical stack, embedded AI work, HIPAA compliance projects, or drop a message in the contact form to connect with him directly.";
  }

  const words = responseText.split(' ');
  let index = 0;
  const interval = setInterval(() => {
    if (index < words.length) {
      const chunk = words.slice(index, index + 3).join(' ') + ' ';
      res.write(chunk);
      index += 3;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 45);
});

// REST API endpoint to register click interaction
app.post('/api/click', (req, res) => {
  totalVisits += 1;
  saveVisits(totalVisits);
  console.log(`[Click API] Registered user interaction click. Total: ${totalVisits}`);
  io.emit('analytics_update', {
    totalVisits,
    activeViewers: viewerList.length,
    viewerList
  });
  res.json({ success: true, count: totalVisits });
});

io.on('connection', (socket) => {
  const newViewer = {
    socketId: socket.id,
    email: 'Anonymous Viewer',
    location: 'Detecting Location...',
    joinedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };
  viewerList.push(newViewer);

  console.log(`[Connect] Viewer joined. Socket ID: ${socket.id}. Active: ${viewerList.length}`);

  // Broadcast current stats
  io.emit('analytics_update', {
    totalVisits,
    activeViewers: viewerList.length,
    viewerList
  });

  // Client location update callback
  socket.on('send_location', (data) => {
    const viewer = viewerList.find(v => v.socketId === socket.id);
    if (viewer) {
      viewer.location = data.city && data.country ? `${data.city}, ${data.country}` : 'Chennai, India';
      console.log(`[Location] Socket ${socket.id} updated location: ${viewer.location}`);
      io.emit('analytics_update', {
        totalVisits,
        activeViewers: viewerList.length,
        viewerList
      });
    }
  });

  // Client email registration callback
  socket.on('register_email', (data) => {
    const viewer = viewerList.find(v => v.socketId === socket.id);
    if (viewer) {
      viewer.email = data.email || 'Anonymous Viewer';
      console.log(`[Identify] Socket ${socket.id} registered email: ${viewer.email}`);
      io.emit('analytics_update', {
        totalVisits,
        activeViewers: viewerList.length,
        viewerList
      });
    }
  });

  // Handle client click register
  socket.on('register_click', () => {
    totalVisits += 1;
    saveVisits(totalVisits);
    console.log(`[Click Socket] Registered user interaction click. Total: ${totalVisits}`);
    io.emit('analytics_update', {
      totalVisits,
      activeViewers: viewerList.length,
      viewerList
    });
  });

  // Client disconnect
  socket.on('disconnect', () => {
    viewerList = viewerList.filter(v => v.socketId !== socket.id);
    console.log(`[Disconnect] Viewer left. Socket ID: ${socket.id}. Active: ${viewerList.length}`);
    io.emit('analytics_update', {
      totalVisits,
      activeViewers: viewerList.length,
      viewerList
    });
  });
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
