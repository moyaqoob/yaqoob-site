import type { FC } from 'react';

interface NavProps {
  onOpenEditor: () => void;
  view: 'home' | 'writing';
}

const Nav: FC<NavProps> = ({ onOpenEditor, view }) => (
  <nav>
    <a href="#/" className="nav-logo">
      MY
    </a>
    <ul className="nav-links">
      {view === 'home' ? (
        <>
          <li><a href="#now">Now</a></li>
          <li><a href="#domains">Domains</a></li>
          <li><a href="#projects">Builds</a></li>
          <li><a href="#/writing">Writing</a></li>
          <li><a href="#proof">Contact</a></li>
        </>
      ) : (
        <>
          <li><a href="#/">Home</a></li>
          <li><a href="#writing-backend">Backend</a></li>
          <li><a href="#writing-systems">Systems</a></li>
          <li><a href="#writing-retrieval">Retrieval</a></li>
          <li><a href="#proof">Contact</a></li>
        </>
      )}
      <li>
        <button
          type="button"
          className="nav-editor-btn"
          id="open-editor-btn"
          onClick={onOpenEditor}
        >
          Editor
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
