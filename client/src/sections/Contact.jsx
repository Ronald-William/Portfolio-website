import { useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personal } from '../data/portfolio';
import { sendContactEmail } from '../api/index';
import SectionHeader from '../components/SectionHeader';
import FadeContent from "../components/FadeContent"

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const bg    = isDark ? 'bg-ink-600'    : 'bg-mocha-100';
  const card  = isDark ? 'glass-dark'    : 'glass-light';
  const text  = isDark ? 'text-ink-50'   : 'text-mocha-800';
  const muted = isDark ? 'text-ink-100'  : 'text-mocha-700';
  const acc   = isDark ? 'text-violet-400' : 'text-mocha-500';
  const input = isDark
    ? 'bg-ink-500/50 border-ink-300/20 text-ink-50 placeholder-ink-200 focus:border-violet-400/60 focus:ring-violet-400/10'
    : 'bg-mocha-50 border-mocha-300/40 text-mocha-800 placeholder-mocha-400 focus:border-mocha-400 focus:ring-mocha-400/10';
  const btnP = isDark
    ? 'bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50'
    : 'bg-mocha-500 text-white hover:bg-mocha-600 disabled:opacity-50';
  const btnO = isDark
    ? 'border-violet-400/40 text-violet-400 hover:bg-violet-400/10'
    : 'border-mocha-500/40 text-mocha-500 hover:bg-mocha-500/10';

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendContactEmail(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err?.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  const info = [
    { icon: Mail,     label: personal.email,    href: `mailto:${personal.email}` },
    { icon: MapPin,   label: personal.location, href: null },
    { icon: Github,   label: 'GitHub',          href: personal.github },
    { icon: Linkedin, label: 'LinkedIn',        href: personal.linkedin },
  ];

  return (
    <section id="contact" className={`py-24 ${bg}`}>
      <FadeContent blur={true} duration={2000} easing="ease-out" initialOpacity={0}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader label="// contact" title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? My inbox is open." />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className={`text-base leading-relaxed mb-8 ${muted}`}>
              I'm currently open to new opportunities and collaborations — freelance projects, internships, or full-time roles. Feel free to reach out.
            </p>
            <div className="flex flex-col gap-4">
              {info.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-violet-400/10' : 'bg-mocha-200'}`}>
                    <Icon size={16} className={acc} />
                  </div>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" className={`text-sm ${muted} hover:underline transition-colors`}>{label}</a>
                    : <span className={`text-sm ${muted}`}>{label}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`p-6 rounded-2xl ${card}`}>
            <div className="flex flex-col gap-4">
              {[
                { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your Name' },
                { name: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com' },
              ].map(f => (
                <div key={f.name}>
                  <label className={`block text-xs font-semibold mb-1.5 ${muted}`}>{f.label}</label>
                  <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                    placeholder={f.placeholder} required
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${input}`} />
                </div>
              ))}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${muted}`}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} required
                  placeholder="Tell me about your project or just say hello…"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 resize-none ${input}`} />
              </div>
              {status === 'success' && <p className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>✓ Message sent! I'll get back to you soon.</p>}
              {status === 'error'   && <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errMsg}</p>}
              <button type="submit" disabled={status === 'loading'}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${btnP}`}>
                {status === 'loading' ? <span className="animate-pulse">Sending…</span> : <><Send size={14} /> Send Message</>}
              </button>
            </div>
          </form>
        </div>
      </div>
      </FadeContent>
    </section>
  );
}
