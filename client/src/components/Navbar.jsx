import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getResumeUrl } from '../api/index';

const navLinks = [
  { href: '#about',        label: 'About' },
  { href: '#projects',     label: 'Projects' },
  { href: '#certificates', label: 'Certs' },
  { href: '#stats',        label: 'Stats' },
  { href: '#contact',      label: 'Contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navBg = scrolled
    ? isDark ? 'glass-dark shadow-lg shadow-black/20' : 'glass-light shadow-lg shadow-mocha-900/10'
    : 'bg-transparent';

  const acc   = isDark ? 'text-violet-400' : 'text-mocha-500';
  const text  = isDark ? 'text-ink-50'     : 'text-mocha-800';
  const muted = isDark ? 'text-ink-100'    : 'text-mocha-700';
  const hov   = isDark ? 'hover:text-violet-400' : 'hover:text-mocha-500';
  const btnO  = isDark
    ? 'border-violet-400/40 text-violet-400 hover:bg-violet-400/10'
    : 'border-mocha-500/40 text-mocha-500 hover:bg-mocha-500/10';

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className={`font-mono text-lg font-semibold ${text}`}>
          <span className={acc}>Ronald's Portfolio</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={`text-sm font-medium transition-colors duration-200 ${muted} ${hov}`}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={getResumeUrl()} download
              className={`flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-lg border transition-all duration-200 ${btnO}`}>
              <Download size={13} /> Resume
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className={`p-2 rounded-lg transition-colors duration-200 ${muted} ${hov}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-lg transition-colors ${muted} ${hov}`}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden px-6 py-4 flex flex-col gap-4 ${isDark ? 'glass-dark' : 'glass-light'}`}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${muted} ${hov}`}>{label}</a>
          ))}
          <a href={getResumeUrl()} download onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 text-sm font-medium w-fit px-4 py-1.5 rounded-lg border transition-all ${btnO}`}>
            <Download size={13} /> Resume
          </a>
        </div>
      )}
    </nav>
  );
}
