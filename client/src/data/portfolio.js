export const personal = {
  name: 'Ronald William Joseph',
  tagline: 'Full Stack Developer',
  roles: ['CS Undergrad @ LPU', 'DSA Enthusiast', 'Full Stack Developer', 'Open Source Contributor'],
  bio: `I'm a passionate CS undergrad at LPU who loves building elegant solutions to complex problems.
I work across the full stack and have a strong foundation in core CS — algorithms, OS, DBMS, and networks.
When I'm not coding, you'll find me grinding DSA or exploring new technologies.`,
  location: 'New Delhi, India',
  email: 'ronaldjoseph439@gmail.com',
  github: 'https://github.com/ronald-william',
  linkedin: 'https://www.linkedin.com/in/ronaldwilliamjoseph/',
  leetcodeUsername: 'ronaldjoseph439',
  hackerrankUsername: 'ronaldjoseph439',
  gfgUsername: 'ronaldjoevxu',
};

// Skills grouped by what role they signal, not just tech layer
export const skills = {
  'Web Development': ['React', 'Node.js', 'Express.js', 'PHP', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs'],
  'Languages':       ['C++', 'Java','JavaScript', 'Python'],
  'Data & Storage':  ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  'CS Fundamentals': ['Data Structures', 'Algorithms', 'OS Concepts', 'DBMS', 'Computer Networks', 'OOP'],
  'Tools & Infra':   ['Git', 'Docker', 'Postman', 'XAMPP', 'Linux'],
};

export const projects = [
  {
    id: 1,
    title: 'YapperHub',
    subtitle: 'Real-time Chat App',
    description: 'Full-stack MERN chat app with Socket.IO and Redis. Supports one-on-one messaging, group chats, live presence, and message caching.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Redis', 'JWT'],
    github: 'https://github.com/Ronald-William/YapperHub-A-ChatApp',
    live: 'https://yapper-hub-a-chat-app.vercel.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'Resume Analyser',
    subtitle: 'OCR-powered Hiring Tool',
    description: 'PHP web app using Tesseract OCR to extract text from resume images and match against an XML database of key skills.',
    tech: ['PHP', 'MySQL', 'HTML', 'Tailwind', 'Tesseract OCR'],
    github: 'https://github.com/Ronald-William/Resume-Analyser',
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Elite-Advisers',
    subtitle: 'GST Consultancy Platform',
    description: 'Consultancy-focused GST service with simplified invoicing, tax calculation assistance, and audit guidance for businesses.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/Ronald-William/Elite-Advisers/tree/main',
    live: null,
    featured: false,
  },
  {
    id: 4,
    title: 'RAG Simulator',
    subtitle: 'Deadlock Detection Tool',
    description: 'Python visualization tool using PyQt6 and NetworkX to simulate process-resource interactions and detect deadlocks in real time.',
    tech: ['Python', 'PyQt6', 'NetworkX', 'Matplotlib'],
    github: 'https://github.com/Ronald-William/Graphical-Simulator-for-Resource-Allocation-Graphs',
    live: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Complaint Resolution Tracker',
    subtitle: 'Java System Design',
    description: 'A Java-based complaint resolution system prototype demonstrating core logic and workflow of complaint management — including ticket routing, status tracking, and resolution lifecycle.',
    tech: ['Java', 'OOP', 'Maven'],
    github: 'https://github.com/Ronald-William/complaint-resolution-tracker',
    live: null,
    featured: false,
  },
  {
    id: 6,
    title: 'AI Bill Splitter ChatBot',
    subtitle: 'Gemini AI + FastAPI',
    description: 'A conversational assistant powered by Gemini 1.5 Pro that splits bills smartly — supports natural language prompts, image-based bill uploads, uneven contributions, and percentage-based splits.',
    tech: ['Python', 'FastAPI', 'Gemini API', 'HTML'],
    github: 'https://github.com/Ronald-William/Ai-Based-Bill-Splitter-ChatBot',
    live: null,
    featured: false,
  },
];

export const certificates = [
  {
    id: 1,
    title: 'Social Networks',
    issuer: 'NPTEL',
    date: 'Nov 2025',
    credentialUrl: null,
    category: 'Graph Theory',
    image: '/certs/nptel-social-networks.jpg',
  },
  {
    id: 2,
    title: 'JavaScript',
    issuer: 'HackerRank',
    date: 'Oct 2025',
    credentialUrl: 'https://www.hackerrank.com/certificates/e43ba99f424a',
    category: 'JavaScript',
    image: '/certs/hackerrank-js.jpg',
  },
  {
    id: 3,
    title: 'Introduction to hardware and operating systems',
    issuer: 'Coursera',
    date: 'September 2024',
    category: 'Operating systems',
    image: '/certs/os.jpg'
  },
  {
    id: 4,
    title: 'Bits and Bytes of Computer Networks',
    issuer: 'Coursera',
    date: 'September 2024',
    category: 'Computer Networks',
    image: '/certs/networking.jpg'
  },
  {
    id: 5,
    title: 'Python',
    issuer: 'HackerRank',
    date: 'April 2024',
    credentialUrl: 'https://www.hackerrank.com/certificates/aa8e24822d55',
    category: 'Python',
    image: '/certs/hackerrank-python.jpg',
  },
  {
    id: 6,
    title: 'Gram-Quest — Runner Up',
    issuer: 'LPU',
    date: 'Feb 2024',
    credentialUrl: null,
    category: 'Achievement',
    image: '/certs/gram-quest.jpg',
  },
];

// Hardcoded stats — update these manually when needed
export const stats = {
  leetcode: {
    totalSolved:  339,
    easySolved:   122,
    mediumSolved: 178,
    hardSolved:   39,
    rating:       1568,
    contestsAttended: 7,
    globalRanking: 239360,
    topPercent:   '28.37%',
    badges:       2,
  },
  hackerrank: {
    totalBadges: 5,
    badges: [
      { name: 'Problem Solving', stars: 3 },
      { name: 'C++',             stars: 5 },
      { name: 'Java',            stars: 5 },
      { name: 'Python',          stars: 4 },
      { name: 'SQL',             stars: 2 },
    ],
  },
  gfg: {
    totalSolved:  251,
    codingScore:  878,
    instituteRank: 1104,
    easy:   0,
    medium: 0,
    hard:   0,
  },
};

export const education = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Lovely Professional University, Phagwara',
    duration: '2023 – 2027',
    grade: 'CGPA: 8.76 / 10',
  },
  {
    degree: 'Intermediate (12th)',
    institution: 'St. Francis De Sales School, New Delhi',
    duration: '2022 – 2023',
    grade: '91.4%',
  },
  {
    degree: 'Matriculation (10th)',
    institution: 'St. Francis De Sales School, New Delhi',
    duration: '2020 – 2021',
    grade: '91.8%',
  },
];
