import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personal } from '../data/portfolio';

export default function Footer() {
  const { isDark } = useTheme();
  const border = isDark ? 'border-ink-300/10' : 'border-mocha-200';
  const bg     = isDark ? 'bg-ink-800'        : 'bg-mocha-50';
  const muted  = isDark ? 'text-ink-100'      : 'text-mocha-600';
  const acc    = isDark ? 'text-violet-400'   : 'text-mocha-500';
  const hov    = isDark ? 'hover:text-violet-400' : 'hover:text-mocha-500';
  const links  = [
    { icon: Github,   href: personal.github   },
    { icon: Linkedin, href: personal.linkedin },
    { icon: Mail,     href: `mailto:${personal.email}` },
  ];
  return (
    <footer className={`border-t py-10 ${border} ${bg}`}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className={`font-mono text-sm ${muted}`}>
          <span className={acc}>&lt;</span>{personal.name}<span className={acc}> /&gt;</span>
        </p>
        <div className="flex items-center gap-5">
          {links.map(({ icon: Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className={`transition-colors duration-200 ${muted} ${hov}`}>
              <Icon size={18} />
            </a>
          ))}
        </div>
        <p className={`text-xs opacity-50 ${muted}`}>© {new Date().getFullYear()} {personal.name}</p>
      </div>
    </footer>
  );
}
