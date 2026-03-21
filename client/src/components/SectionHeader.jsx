import { useTheme } from '../context/ThemeContext';

export default function SectionHeader({ label, title, subtitle }) {
  const { isDark } = useTheme();
  const acc  = isDark ? 'text-violet-400' : 'text-mocha-500';
  const text = isDark ? 'text-ink-50'     : 'text-mocha-800';
  const muted= isDark ? 'text-ink-100'    : 'text-mocha-600';
  return (
    <div className="mb-14">
      <p className={`font-mono text-xs tracking-widest uppercase mb-3 ${acc}`}>{label}</p>
      <h2 className={`font-display text-4xl font-bold mb-3 ${text}`}>{title}</h2>
      {subtitle && <p className={`text-base max-w-xl ${muted}`}>{subtitle}</p>}
      <div className={`mt-4 w-12 h-0.5 rounded-full ${isDark ? 'bg-violet-400' : 'bg-mocha-500'}`} />
    </div>
  );
}
