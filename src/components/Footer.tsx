import type { FC } from 'react';

const Footer: FC = () => (
  <footer>
    <div className="footer-left">
      © 2025 Mohammed Yaqoob · Built with intention
    </div>
    <div className="footer-right">
      <a href="#writing">Writing</a>
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="https://github.com/moyaqoob" target="_blank">
        GitHub
      </a>
    </div>
  </footer>
);

export default Footer;
