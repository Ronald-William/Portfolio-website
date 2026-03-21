import { MapPin, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personal, skills, education } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import ElectricBorder from "../components/ElectricBorder"
import FadeContent from "../components/FadeContent"
import ScrollFloat from '../components/ScrollFloat';

const roleColors = {
  'Web Development': { dark: 'bg-violet-400/10 text-violet-300 border-violet-400/20', light: 'bg-mocha-500/10 text-mocha-600 border-mocha-400/30' },
  'Languages': { dark: 'bg-blue-400/10 text-blue-300 border-blue-400/20', light: 'bg-blue-100 text-blue-700 border-blue-200' },
  'Data & Storage': { dark: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20', light: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'CS Fundamentals': { dark: 'bg-orange-400/10 text-orange-300 border-orange-400/20', light: 'bg-orange-100 text-orange-700 border-orange-200' },
  'Tools & Infra': { dark: 'bg-pink-400/10 text-pink-300 border-pink-400/20', light: 'bg-pink-100 text-pink-700 border-pink-200' },
};

export default function About() {
  const { isDark } = useTheme();
  const bg = isDark ? 'bg-ink-600' : 'bg-mocha-100';
  const card = isDark ? 'glass-dark glow-violet' : 'glass-light glow-mocha';
  const text = isDark ? 'text-ink-50' : 'text-mocha-800';
  const muted = isDark ? 'text-ink-100' : 'text-mocha-700';
  const acc = isDark ? 'text-violet-400' : 'text-mocha-500';
  const edBg = isDark ? 'bg-ink-500/40 border-ink-300/10' : 'bg-white/80 border-mocha-200';

  return (
    
      <section id="about" className={`py-24 ${bg}`}>
        
        <FadeContent blur={true} duration={3000} easing="ease-out" initialOpacity={0}>
        
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader label="// about me" title="Who I Am" subtitle="A bit about my background, skills, and what drives me." />

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Bio */}
            <div>
              <p className={`text-base leading-relaxed mb-6 ${muted}`}>{personal.bio}</p>
              <div className={`flex items-center gap-2 text-sm ${acc}`}>
                <MapPin size={15} /><span>{personal.location}</span>
              </div>

              {/* Education */}
              <div className="mt-8">
                <p className={`font-mono text-xs tracking-widest uppercase mb-4 ${acc}`}>Education</p>
                <div className="flex flex-col gap-3">
                  {education.map((ed, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${edBg}`}>
                      <div className="flex items-start gap-3">
                        <GraduationCap size={16} className={`mt-0.5 shrink-0 ${acc}`} />
                        <div>
                          <p className={`font-semibold text-sm ${text}`}>{ed.degree}</p>
                          <p className={`text-xs ${muted}`}>{ed.institution}</p>
                          <p className={`text-xs mt-1 font-mono ${acc}`}>{ed.duration} · {ed.grade}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.12}
              thickness={2}
              style={{ borderRadius: 16, display: 'flex', flexDirection: 'column' ,alignSelf: 'stretch'}}
            >
              <div className={`p-6 rounded-2xl  ${card}`} style={{ border: 'none' }}>
                <p className={`font-mono text-xs tracking-widest uppercase mb-5 ${acc}`}>Skills & Expertise</p>
                <div className="flex flex-col gap-5">
                  {Object.entries(skills).map(([category, items]) => {
                    const colors = roleColors[category];
                    const cls = isDark ? colors.dark : colors.light;
                    return (
                      <div key={category}>
                        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${muted}`}>{category}</p>
                        <div className="flex flex-wrap gap-2">
                          {items.map(skill => (
                            <span key={skill} className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all duration-200 hover:scale-105 ${cls}`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>
        </FadeContent>
      </section>
    
  );
}
