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
