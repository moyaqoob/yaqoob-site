import { useState, type FC } from 'react';
import type { View } from '../lib/routes';
import { PROFILE } from '../content/site';
import { useTheme } from '../hooks/useTheme';

interface NavProps {
  onOpenEditor: () => void;
  view: View;
}

const LINKS: { href: string; label: string }[] = [
  { href: '#/work', label: 'Work' },
  { href: '#/writing', label: 'Blogs' },
  { href: '#/projects', label: 'Projects' },
];

const Nav: FC<NavProps> = ({ onOpenEditor, view }) => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-nav${open ? ' is-open' : ''}`}>
      <div className="site-nav-row">
        <a href="#/" className="nav-logo" aria-label="Go to homepage">
          <img src={PROFILE.photo} alt="" width={32} height={32} />
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-flip">
              <span className="nav-flip-inner">
                <span>{l.label}</span>
                <span aria-hidden="true">{l.label}</span>
              </span>
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.24,187.53A88,88,0,0,1,68.47,67.76a89,89,0,0,1,28.87-21.81A104.1,104.1,0,0,0,210.05,158.66,89,89,0,0,1,188.24,187.53Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="nav-editor-btn"
            onClick={onOpenEditor}
          >
            Editor
          </button>
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav className="nav-mobile" aria-label="Mobile" hidden={!open}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={view === l.href.replace('#/', '') ? 'is-active' : undefined}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Nav;
