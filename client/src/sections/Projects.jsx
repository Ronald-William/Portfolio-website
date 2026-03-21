import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import { Carousel, Card } from '../components/AppleCarousel';
import FadeContent from '../components/FadeContent';

// Project images — add your own to /public/projects/ or use any URL
const projectImages = {
  1: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80', // chat app
  2: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', // resume/docs
  3: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',    // finance/advisory
  4: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80', // code/graph
  5: 'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=800&q=80', // support/complaints
  6: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', // AI/chatbot
};

function ProjectContent({ project, isDark }) {
  const muted  = isDark ? 'text-ink-100'   : 'text-mocha-700';
  const acc    = isDark ? 'text-violet-400' : 'text-mocha-500';
  // Modal always has a dark background regardless of theme, so tags need to be readable on dark
  const tagBg  = 'bg-white/10 text-white border-white/20';
  const linkCls= `flex items-center gap-1.5 text-sm font-medium transition-colors ${isDark ? 'text-violet-300 hover:text-violet-200' : 'text-violet-300 hover:text-violet-200'} hover:underline`;

  return (
    
    <div>
      
      <p className="text-sm leading-relaxed mb-5 text-white/70">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map(t => (
          <span key={t} className={`px-2.5 py-1 text-xs font-mono rounded-lg border ${tagBg}`}>{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
          <Github size={14} /> View Code
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkCls}>
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
      </div>
      
    </div>
   
  );
}

export default function Projects() {
  const { isDark } = useTheme();

  const bg   = isDark ? 'bg-ink-700'    : 'bg-mocha-50';
  const acc  = isDark ? 'text-violet-400' : 'text-mocha-500';

  // Build card data for the carousel
  const cards = projects.map(project => ({
    src:      projectImages[project.id] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    title:    project.title,
    category: project.subtitle,
    content:  <ProjectContent project={project} isDark={isDark} />,
  }));

  const carouselItems = cards.map((card, i) => (
    <Card
      key={i}
      card={card}
      index={i}
    />
  ));

  return (
    <section id="projects" className={`py-24 ${bg}`}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          label="// projects"
          title="Things I've Built"
          subtitle="Click any card to explore the project details."
        />
      </div>

      {/* Carousel bleeds slightly beyond container for the Apple effect */}
      <div
        className="w-full"
        style={{
          '--acc':        isDark ? '#b794ff' : '#e07b39',
          '--card-bg':    isDark ? '#1e1840' : '#f8f9fc',
          '--btn-bg':     isDark ? 'rgba(155,109,255,0.15)' : 'rgba(224,123,57,0.12)',
          '--btn-border': isDark ? 'rgba(155,109,255,0.3)'  : 'rgba(224,123,57,0.3)',
        }}
      >
        <Carousel items={carouselItems} />
      </div>
    </section>
  );
}