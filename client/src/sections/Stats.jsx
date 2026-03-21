import { useTheme } from '../context/ThemeContext';
import { stats, personal } from '../data/portfolio';
import { Code2, Trophy, CheckCircle2, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import FadeContent from "../components/FadeContent"

function StatPill({ label, value, isDark }) {
  const acc  = isDark ? 'text-violet-400' : 'text-mocha-500';
  const muted= isDark ? 'text-ink-100'    : 'text-mocha-700';
  const bg   = isDark ? 'bg-ink-500/40'   : 'bg-mocha-200/50';
  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${bg}`}>
      <span className={`font-display text-2xl font-bold ${acc}`}>{value ?? '—'}</span>
      <span className={`text-xs font-medium mt-0.5 text-center ${muted}`}>{label}</span>
    </div>
  );
}

function PlatformCard({ title, icon: Icon, color, profileUrl, isDark, children }) {
  const card  = isDark ? 'glass-dark glow-violet' : 'glass-light glow-mocha';
  const text  = isDark ? 'text-ink-50'   : 'text-mocha-800';
  const muted = isDark ? 'text-ink-100'  : 'text-mocha-600';
  return (
    <div className={`p-6 rounded-2xl flex flex-col ${card}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}><Icon size={18} /></div>
          <h3 className={`font-semibold text-sm ${text}`}>{title}</h3>
        </div>
        {profileUrl && (
          <a href={profileUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1 text-xs hover:underline ${muted}`}>
            Profile <ExternalLink size={10} />
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

export default function Stats() {
  const { isDark } = useTheme();
  const lc  = stats.leetcode;
  const hr  = stats.hackerrank;
  const gfg = stats.gfg;

  const bg   = isDark ? 'bg-ink-700'    : 'bg-mocha-50';
  const acc  = isDark ? 'text-violet-400' : 'text-mocha-500';
  const muted= isDark ? 'text-ink-100'  : 'text-mocha-600';

  return (
    <section id="stats" className={`py-24 ${bg}`}>
      <FadeContent blur={true} duration={2000} easing="ease-out" initialOpacity={0}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader label="// competitive stats" title="Coding Profiles"
          subtitle="Stats from LeetCode, HackerRank, and GeeksForGeeks." />

        <div className="grid md:grid-cols-3 gap-6">

          {/* LeetCode */}
          <PlatformCard title="LeetCode" icon={Code2}
            color={isDark ? 'bg-yellow-400/10 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}
            profileUrl={`https://leetcode.com/${personal.leetcodeUsername}`}
            isDark={isDark}>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <StatPill label="Total Solved"   value={lc.totalSolved}   isDark={isDark} />
                <StatPill label="Contest Rating" value={lc.rating}        isDark={isDark} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <StatPill label="Easy"   value={lc.easySolved}   isDark={isDark} />
                <StatPill label="Medium" value={lc.mediumSolved} isDark={isDark} />
                <StatPill label="Hard"   value={lc.hardSolved}   isDark={isDark} />
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-xs font-mono ${acc}`}>Top {lc.topPercent}</p>
                <p className={`text-xs ${muted}`}>{lc.contestsAttended} contests</p>
              </div>
            </div>
          </PlatformCard>

          {/* HackerRank */}
          <PlatformCard title="HackerRank" icon={Trophy}
            color={isDark ? 'bg-green-400/10 text-green-400' : 'bg-green-100 text-green-600'}
            profileUrl={`https://www.hackerrank.com/${personal.hackerrankUsername}`}
            isDark={isDark}>
            <div className="flex flex-col gap-3">
              <StatPill label="Total Badges" value={hr.totalBadges} isDark={isDark} />
              <div className="flex flex-col gap-2 mt-1">
                {hr.badges.map((b, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className={`text-xs ${muted}`}>{b.name}</span>
                    <span className={`text-xs font-mono tracking-tighter ${acc}`}>
                      {'★'.repeat(b.stars)}{'☆'.repeat(5 - b.stars)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PlatformCard>

          {/* GFG */}
          <PlatformCard title="GeeksForGeeks" icon={CheckCircle2}
            color={isDark ? 'bg-emerald-400/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}
            profileUrl={`https://www.geeksforgeeks.org/user/${personal.gfgUsername}`}
            isDark={isDark}>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <StatPill label="Problems Solved" value={gfg.totalSolved}   isDark={isDark} />
                <StatPill label="Coding Score"    value={gfg.codingScore}   isDark={isDark} />
              </div>
              <StatPill label="Institute Rank" value={`#${gfg.instituteRank}`} isDark={isDark} />
            </div>
          </PlatformCard>

        </div>
      </div>
      </FadeContent>
    </section>
  );
}
