import { useState, useEffect } from 'react';

const GITHUB_USER = 'moyaqoob';
const LEETCODE_USER = 'moyaqoob';
const LEETCODE_STATS_URL = `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`;

type GitHubDay = { date: string; contributionCount: number };
type GitHubWeek = { contributionDays: GitHubDay[] };

type GitHubData = {
  totalContributions: number;
  weeks: GitHubWeek[];
} | null;

type LeetCodeData = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  submissionCalendar: Record<string, number>;
} | null;

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function ActivityGrid({
  grid,
  accent = 'green',
}: {
  grid: (number | undefined)[][];
  accent?: 'green' | 'amber';
}) {
  const levels =
    accent === 'green'
      ? [
          'bg-[hsl(var(--border))]/40 dark:bg-[hsl(var(--border))]/30',
          'bg-emerald-400/70 dark:bg-emerald-500/60',
          'bg-emerald-500/80 dark:bg-emerald-500/70',
          'bg-emerald-600 dark:bg-emerald-600',
          'bg-emerald-700 dark:bg-emerald-600',
        ]
      : [
          'bg-[hsl(var(--border))]/40 dark:bg-[hsl(var(--border))]/30',
          'bg-amber-400/60 dark:bg-amber-500/50',
          'bg-amber-500/80 dark:bg-amber-500/70',
          'bg-amber-600 dark:bg-amber-600',
          'bg-amber-600 dark:bg-amber-600',
        ];

  const cells = grid.flatMap((row) => row);

  return (
    <div className="activity-grid-wrap overflow-x-auto">
      <div
        className="grid gap-[2px] w-full"
        style={{
          gridTemplateColumns: 'repeat(53, minmax(0, 1fr))',
          gridAutoRows: 'minmax(10px, 1fr)',
        }}
      >
        {cells.map((count, i) => (
          <div
            key={i}
            className={`rounded-[2px] min-h-[10px] min-w-[10px] max-w-[12px] transition-colors ${levels[getLevel(count ?? 0)]}`}
            style={{ aspectRatio: '1' }}
            title={count != null && count > 0 ? `${count}` : ''}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export function ActivitySection() {
  const [github, setGitHub] = useState<GitHubData>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData>(null);
  const [loading, setLoading] = useState(true);

  const year = new Date().getFullYear();
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  useEffect(() => {
    let cancelled = false;

    async function fetchGitHub() {
      try {
        const res = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query($user:String!,$from:DateTime!,$to:DateTime!){
              user(login:$user){
                contributionsCollection(from:$from,to:$to){
                  contributionCalendar {
                    totalContributions
                    weeks { contributionDays { date contributionCount } }
                  }
                }
              }
            }`,
            variables: { user: GITHUB_USER, from, to },
          }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (json.errors || !json?.data?.user) {
          setGitHub(null);
          return;
        }
        const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (cal?.weeks?.length) setGitHub({ totalContributions: cal.totalContributions, weeks: cal.weeks });
      } catch {
        if (!cancelled) setGitHub(null);
      }
    }

    async function fetchLeetcode() {
      try {
        const res = await fetch(LEETCODE_STATS_URL);
        const data = await res.json();
        if (cancelled) return;
        if (data.status === 'success' && data.submissionCalendar) {
          setLeetcode({
            totalSolved: data.totalSolved ?? 0,
            easySolved: data.easySolved ?? 0,
            mediumSolved: data.mediumSolved ?? 0,
            hardSolved: data.hardSolved ?? 0,
            acceptanceRate: data.acceptanceRate ?? 0,
            submissionCalendar: data.submissionCalendar,
          });
        } else {
          setLeetcode(null);
        }
      } catch {
        if (!cancelled) setLeetcode(null);
      }
    }

    Promise.all([fetchGitHub(), fetchLeetcode()]).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [year]);

  // Build 7 x 53 grid from GitHub weeks
  const githubGrid: (number | undefined)[][] = Array(7)
    .fill(null)
    .map(() => Array(53).fill(undefined));
  if (github?.weeks) {
    github.weeks.forEach((week: GitHubWeek, colIdx: number) => {
      week.contributionDays.forEach((day: GitHubDay, rowIdx: number) => {
        if (rowIdx < 7 && colIdx < 53) {
          githubGrid[rowIdx][colIdx] = day.contributionCount;
        }
      });
    });
  }

  // Build 7 x 53 grid from LeetCode submissionCalendar (unix day start -> count)
  const leetcodeGrid: (number | undefined)[][] = Array(7)
    .fill(null)
    .map(() => Array(53).fill(undefined));
  if (leetcode?.submissionCalendar) {
    const jan1 = new Date(Date.UTC(year, 0, 1));
    const firstSunday = new Date(jan1);
    firstSunday.setUTCDate(1 - jan1.getUTCDay());
    for (let col = 0; col < 53; col++) {
      for (let row = 0; row < 7; row++) {
        const d = new Date(firstSunday);
        d.setUTCDate(firstSunday.getUTCDate() + col * 7 + row);
        if (d.getUTCFullYear() !== year) continue;
        const unix = Math.floor(d.getTime() / 1000);
        const count = leetcode.submissionCalendar[String(unix)];
        if (count != null) leetcodeGrid[row][col] = count;
      }
    }
  }

  const hasData = github || leetcode;
  const showGitHubFallback = !loading && !github;
  const showSection = hasData || showGitHubFallback;

  if (loading && !showSection) {
    return (
      <section className="mt-6">
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2">
          activity
        </h2>
        <div className="text-[13px] text-muted">Loading activity…</div>
      </section>
    );
  }

  if (!showSection) return null;

  return (
    <section className="mt-6" aria-label="Coding activity">
      <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted mb-3">
        activity
      </h2>
      <div className="space-y-4">
        {(github || showGitHubFallback) && (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-[13px] font-medium"
              >
                GitHub
              </a>
              {github && (
                <span className="text-[12px] text-muted tabular-nums">
                  {github.totalContributions} contributions in {year}
                </span>
              )}
            </div>
            {github ? (
              <ActivityGrid grid={githubGrid} accent="green" />
            ) : (
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full overflow-x-auto"
              >
                <img
                  src={`https://ghchart.rshah.org/2e7d32/${GITHUB_USER}`}
                  alt={`${GITHUB_USER}'s GitHub contribution chart`}
                  className="h-auto w-full max-w-[800px] rounded-[4px]"
                />
              </a>
            )}
          </div>
        )}
        {leetcode && (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <a
                href={`https://leetcode.com/u/${LEETCODE_USER}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-[13px] font-medium"
              >
                LeetCode
              </a>
              <span className="text-[12px] text-muted tabular-nums">
                {leetcode.totalSolved} solved · {leetcode.easySolved} / {leetcode.mediumSolved} /{' '}
                {leetcode.hardSolved} · {leetcode.acceptanceRate.toFixed(1)}% acceptance
              </span>
            </div>
            <ActivityGrid grid={leetcodeGrid} accent="amber" />
          </div>
        )}
      </div>
      <p className="text-[11px] text-muted mt-2">Jan — Dec {year}</p>
    </section>
  );
}
