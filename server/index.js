const path = require('path');
const fs   = require('fs');

// Manually parse .env to bypass dotenv v17 quirks
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const contactRoutes = require('./routes/contact');
const resumeRoutes  = require('./routes/resume');

const app  = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:4173',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('/{*path}', cors(corsOptions)); // handle preflight

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contact', contactRoutes);
app.use('/api/resume',  resumeRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/debug-assets', (req, res) => {
  const assetsDir = path.join(__dirname, 'assets');
  try {
    const files = fs.readdirSync(assetsDir);
    res.json({ assetsDir, files });
  } catch (e) {
    res.json({ error: e.message, assetsDir });
  }
});

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB error:', err));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
