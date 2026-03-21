import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personal } from '../data/portfolio';
import { getResumeUrl } from '../api/index';
import DecryptedText from '../components/DecryptedText';

function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;
    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && display === '') {
      setIsDeleting(false);
      setWordIdx(i => i + 1);
    } else {
      timeout = setTimeout(() => {
        setDisplay(isDeleting
          ? current.slice(0, display.length - 1)
          : current.slice(0, display.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

export default function Hero() {
  const { isDark } = useTheme();
  const typed = useTypingEffect(personal.roles);

  const bg    = isDark ? 'bg-ink-700'    : 'bg-mocha-800';
  const text  = isDark ? 'text-ink-50'   : 'text-mocha-50';
  const muted = isDark ? 'text-ink-100'  : 'text-mocha-200';
  const acc   = isDark ? 'text-violet-400' : 'text-mocha-500';
  const btnP  = isDark
    ? 'bg-violet-500 text-white hover:bg-violet-600'
    : 'bg-mocha-500 text-white hover:bg-mocha-600';
  const btnO  = isDark
    ? 'border-violet-400/40 text-violet-400 hover:bg-violet-400/10'
    : 'border-mocha-200/40 text-mocha-200 hover:bg-mocha-200/10';

  return (
    <section id="hero" className={`relative min-h-screen flex flex-col justify-center overflow-hidden ${bg}`}>

      {/* Decorative blobs */}
      <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none z-10 ${isDark ? 'bg-violet-600/10' : 'bg-mocha-500/15'}`} />
      <div className={`absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none z-10 ${isDark ? 'bg-violet-500/10' : 'bg-mocha-600/20'}`} />

      {/* Content — sits above everything */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-32 w-full">
        <p className={`font-mono text-sm tracking-widest uppercase mb-5 ${acc}`}>// hello, world</p>

        <h1 className={`font-display text-5xl md:text-7xl font-bold leading-tight mb-3 whitespace-nowrap ${text}`}>
          I'm{' '}
          <span className={acc} style={{ display: 'inline-block' }}>
            <DecryptedText
              text={personal.name}
              animateOn="view"
              speed={70}
              maxIterations={25}
              sequential
              characters="aceilnorstu"
              className={acc}
              encryptedClassName="opacity-40"
              revealDirection="start"
            />
          </span>
        </h1>

        <div className={`font-display text-2xl md:text-3xl font-semibold mb-6 h-10 ${muted}`}>
          <span>{typed}</span>
          <span className={`inline-block w-0.5 h-7 ml-1 align-middle animate-pulse ${isDark ? 'bg-violet-400' : 'bg-mocha-500'}`} />
        </div>

        <p className={`text-base md:text-lg max-w-lg leading-relaxed mb-10 ${muted}`}>
          {personal.bio.split('\n')[0]}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a href="#projects" className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg ${btnP}`}>
            View My Work
          </a>
          <a href={getResumeUrl()} download className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${btnO}`}>
            Download Resume
          </a>
        </div>

        <div className="flex items-center gap-6">
          {[
            { icon: Github,   href: personal.github },
            { icon: Linkedin, href: personal.linkedin },
            { icon: Mail,     href: `mailto:${personal.email}` },
          ].map(({ icon: Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'text-ink-100 hover:text-violet-400 hover:bg-violet-400/10' : 'text-mocha-200 hover:text-mocha-500 hover:bg-mocha-500/10'}`}>
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-20 flex justify-center pb-10">
        <a href="#about" aria-label="Scroll down" className={`animate-bounce ${acc}`}>
          <ArrowDown size={22} />
        </a>
      </div>

    </section>
  );
}