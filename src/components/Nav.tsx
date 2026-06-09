import type { FC } from 'react';

interface NavProps {
  onOpenEditor: () => void;
}

const Nav: FC<NavProps> = ({ onOpenEditor }) => (
  <nav>
    <a href="#" className="nav-logo">
      MOHAMMED YAQOOB
    </a>
    <ul className="nav-links">
      <li><a href="#writing">Writing</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="https://github.com/moyaqoob" target="_blank">GitHub</a></li>
      <li>
        <a href="#" className="nav-editor-btn" id="open-editor-btn" onClick={onOpenEditor}>
          Editor
        </a>
      </li>
    </ul>
  </nav>
);

export default Nav;
