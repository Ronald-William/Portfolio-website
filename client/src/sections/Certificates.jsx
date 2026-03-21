import { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Award, X, ZoomIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { certificates } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import FadeContent from "../components/FadeContent"

const categoryColors = {
  'JavaScript': { dark: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20', light: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  'Python':     { dark: 'bg-blue-400/10 text-blue-300 border-blue-400/20',       light: 'bg-blue-100 text-blue-700 border-blue-200' },
  'Graph Theory':{ dark: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20', light: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'Achievement': { dark: 'bg-pink-400/10 text-pink-300 border-pink-400/20',      light: 'bg-pink-100 text-pink-700 border-pink-200' },
};

export default function Certificates() {
  const { isDark } = useTheme();
  const [active, setActive]       = useState(0);
  const [lightbox, setLightbox]   = useState(false);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setLightbox(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const bg    = isDark ? 'bg-ink-600'    : 'bg-mocha-100';
  const card  = isDark ? 'glass-dark'    : 'glass-light';
  const text  = isDark ? 'text-ink-50'   : 'text-mocha-800';
  const muted = isDark ? 'text-ink-100'  : 'text-mocha-700';
  const acc   = isDark ? 'text-violet-400' : 'text-mocha-500';
  const imgBg = isDark ? 'bg-ink-500/60' : 'bg-mocha-200/60';
  const btnO  = isDark ? 'border-violet-400/40 text-violet-400 hover:bg-violet-400/10' : 'border-mocha-500/40 text-mocha-500 hover:bg-mocha-500/10';
  const dotA  = isDark ? 'bg-violet-400' : 'bg-mocha-500';
  const dotI  = isDark ? 'bg-ink-300'    : 'bg-mocha-300';

  const cert = certificates[active];
  const colors = categoryColors[cert.category];
  const catCls = colors ? (isDark ? colors.dark : colors.light) : (isDark ? 'bg-violet-400/10 text-violet-300 border-violet-400/20' : 'bg-mocha-500/10 text-mocha-600 border-mocha-300/40');

  const prev = () => setActive(i => (i - 1 + certificates.length) % certificates.length);
  const next = () => setActive(i => (i + 1) % certificates.length);

  return (
    <section id="certificates" className={`py-24 ${bg}`}>
      <FadeContent blur={true} duration={2000} easing="ease-out" initialOpacity={0}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader label="// certificates & courses" title="Learning & Credentials"
          subtitle="Courses and certifications that have shaped my skill set." />

        {/* Lightbox */}
        {lightbox && cert.image && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(false)}
            >
              <X size={22} />
            </button>
            <img
              src={cert.image}
              alt={cert.title}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image panel */}
          <div className={`relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center ${imgBg} ${card} group ${cert.image ? 'cursor-zoom-in' : ''}`}
            onClick={() => cert.image && setLightbox(true)}>
            {cert.image ? (
              <>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </>
            ) : null}
            <div className={`w-full h-full flex-col items-center justify-center gap-3 ${cert.image ? 'hidden' : 'flex'}`}>
              <Award size={48} className={`opacity-30 ${acc}`} />
              <p className={`text-sm font-mono opacity-40 ${muted}`}>Add image to /public/certs/</p>
            </div>
          </div>

          {/* Info panel */}
          <div className={`p-8 rounded-2xl ${card}`}>
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2.5 py-1 text-xs font-mono rounded border ${catCls}`}>{cert.category}</span>
              <span className={`font-mono text-xs ${muted}`}>{cert.date}</span>
            </div>
            <h3 className={`font-display text-2xl font-bold mb-2 ${text}`}>{cert.title}</h3>
            <p className={`text-base font-medium mb-6 ${acc}`}>{cert.issuer}</p>

            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all ${btnO}`}>
                <ExternalLink size={13} /> View Credential
              </a>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="flex gap-2">
                {certificates.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${i === active ? `${dotA} w-6` : dotI}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className={`p-2 rounded-lg border transition-all ${btnO}`}><ChevronLeft size={15} /></button>
                <button onClick={next} className={`p-2 rounded-lg border transition-all ${btnO}`}><ChevronRight size={15} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
          {certificates.map((c, i) => (
            <button key={c.id} onClick={() => setActive(i)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-mono border transition-all duration-200
                ${i === active
                  ? isDark ? 'bg-violet-500/20 border-violet-400/40 text-violet-300' : 'bg-mocha-500/20 border-mocha-400/40 text-mocha-600'
                  : isDark ? 'border-ink-300/10 text-ink-100 hover:border-violet-400/30' : 'border-mocha-200 text-mocha-600 hover:border-mocha-400/50'
                }`}>
              {c.issuer} · {c.title.length > 16 ? c.title.slice(0, 16) + '…' : c.title}
            </button>
          ))}
        </div>
      </div>
      </FadeContent>
    </section>
  );
}