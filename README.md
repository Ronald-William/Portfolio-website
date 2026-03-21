# 🧑‍💻 Dev Portfolio — MERN Stack

A full-stack developer portfolio built with **MongoDB · Express · React · Node.js** and **Tailwind CSS v4**.

---

## ✨ Features

- **Light / Dark mode** — Mocha theme (light) + Ink Slate theme (dark), persisted to localStorage
- **Sections** — Hero, About, Projects, Certificates & Courses, Competitive Stats, Contact
- **Resume download** — served via Express endpoint
- **Contact form** — sends email via Nodemailer (Gmail)
- **Live competitive stats** — LeetCode (GraphQL API), HackerRank, GeeksForGeeks
- **Hardcoded data** — all portfolio content lives in `client/src/data/portfolio.js`, easy to edit

---

## 📁 Project Structure

```
portfolio/
├── client/                      # React + Vite + Tailwind CSS v4
│   └── src/
│       ├── api/index.js         # Axios wrappers for backend
│       ├── context/ThemeContext.jsx
│       ├── data/portfolio.js    # ← EDIT YOUR DATA HERE
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── SectionHeader.jsx
│       └── sections/
│           ├── Hero.jsx
│           ├── About.jsx
│           ├── Projects.jsx
│           ├── Certificates.jsx
│           ├── Stats.jsx
│           └── Contact.jsx
│
└── server/                      # Express API
    ├── index.js
    ├── assets/resume.pdf        # ← PUT YOUR RESUME HERE
    └── routes/
        ├── contact.js           # POST /api/contact
        ├── resume.js            # GET  /api/resume/download
        └── stats.js             # GET  /api/stats/leetcode/:u etc.
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
# From the root portfolio/ folder
npm run install:all
```

### 2. Configure environment variables

**Server** — copy and fill in:
```bash
cp server/.env.example server/.env
```

```env
PORT=5000
CLIENT_URL=http://localhost:5173

# Gmail + App Password (https://myaccount.google.com/apppasswords)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_TO=your-gmail@gmail.com

# Optional — only needed if you extend the backend with MongoDB
MONGO_URI=mongodb://localhost:27017/portfolio
```

**Client** — copy and fill in:
```bash
cp client/.env.example client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Add your resume

Place your resume PDF at:
```
server/assets/resume.pdf
```

### 4. Edit your portfolio data

Open `client/src/data/portfolio.js` and fill in:
- Personal info, bio, social links
- Competitive platform **usernames** (leetcodeUsername, hackerrankUsername, gfgUsername)
- Projects array
- Certificates array
- Skills object

### 5. Run in development

```bash
# From root — starts both server (port 5000) and client (port 5173)
npm run dev
```

Or run separately:
```bash
npm run dev:server
npm run dev:client
```

---

## 🎨 Themes

| Token | Light (Mocha) | Dark (Ink Slate) |
|---|---|---|
| Background | `#f5ede0` warm cream | `#0d1117` deep navy |
| Card | `#faf4ed` | `#1a2030` |
| Accent | `#a0522d` sienna | `#7dd3c8` teal |
| Text | `#3c2a1e` | `#e2e8f0` |

All tokens are defined in `client/src/index.css` under `@theme { }`.

---

## 🔌 Adding Animations

This project is animation-ready. Recommended libraries:

```bash
# Framer Motion
npm install framer-motion

# GSAP
npm install gsap

# React Bits (copy-paste components from reactbits.dev)
```

Good places to drop animations:
- `Hero.jsx` — entrance animation on name + tagline
- `SectionHeader.jsx` — scroll-triggered reveal
- `Projects.jsx` — staggered card entrance
- `Stats.jsx` — number counter on scroll

---

## 📦 Build for Production

```bash
cd client && npm run build
```

The `dist/` folder can be deployed to Vercel, Netlify, or any static host.
Deploy the `server/` folder to Railway, Render, or any Node.js host.

---

## 🔧 Gmail Setup (Contact Form)

1. Enable 2FA on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Create an app password for "Mail"
4. Paste the 16-character password into `EMAIL_PASS` in `server/.env`
