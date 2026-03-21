import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Contact form — proxied through Express (avoids exposing email creds)
export const sendContactEmail = (data) => API.post('/contact', data);

// Resume — served as a static file from Express
export const getResumeUrl = () =>
  `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/resume/download`;

// Note: competitive stats (LeetCode, HackerRank, GFG) are fetched
// directly from the browser inside Stats.jsx — those platforms block
// server-side requests with 403.
