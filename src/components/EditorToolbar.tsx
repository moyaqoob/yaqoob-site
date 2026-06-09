import type { FC } from 'react';

const EditorToolbar: FC = () => {
  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val ?? undefined);
  };

  const onCmd =
    (cmd: string, val?: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      exec(cmd, val);
    };

  const wrapInline = (tag: 'code' | 'mark') => (e: React.MouseEvent) => {
    e.preventDefault();
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      const el = document.createElement(tag);
      el.textContent = sel.toString() || (tag === 'code' ? 'code' : 'highlight');
      range.deleteContents();
      range.insertNode(el);
    }
  };

  const insertCodeBlock = (e: React.MouseEvent) => {
    e.preventDefault();
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = sel.toString() || '// code here';
      pre.appendChild(code);
      range.deleteContents();
      range.insertNode(pre);
    }
  };

  const insertLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = prompt('URL:');
    if (url) exec('createLink', url);
  };

  return (
    <div className="editor-toolbar">
      <button className="toolbar-btn" onMouseDown={onCmd('bold')} title="Bold">
        B
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('italic')} title="Italic">
        <em>I</em>
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('underline')} title="Underline">
        <u>U</u>
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('strikeThrough')} title="Strike">
        S̶
      </button>
      <div className="toolbar-divider" />
      <button className="toolbar-btn" onMouseDown={onCmd('formatBlock', 'h1')} title="Heading 1">
        H1
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('formatBlock', 'h2')} title="Heading 2">
        H2
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('formatBlock', 'h3')} title="Heading 3">
        H3
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('formatBlock', 'p')} title="Paragraph">
        ¶
      </button>
      <div className="toolbar-divider" />
      <button className="toolbar-btn" onMouseDown={onCmd('insertUnorderedList')} title="Bullet list">
        • list
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('insertOrderedList')} title="Numbered list">
        1. list
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('formatBlock', 'blockquote')} title="Blockquote">
        "
      </button>
      <button className="toolbar-btn" onMouseDown={wrapInline('code')} title="Inline code">
        `code`
      </button>
      <button className="toolbar-btn" onMouseDown={insertCodeBlock} title="Code block">
        ````
      </button>
      <div className="toolbar-divider" />
      <button className="toolbar-btn" onMouseDown={insertLink} title="Insert link">
        link
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('insertHorizontalRule')} title="Divider">
        —
      </button>
      <button className="toolbar-btn" onMouseDown={wrapInline('mark')} title="Highlight">
        mark
      </button>
      <div className="toolbar-divider" />
      <button className="toolbar-btn" onMouseDown={onCmd('undo')} title="Undo">
        ↩
      </button>
      <button className="toolbar-btn" onMouseDown={onCmd('redo')} title="Redo">
        ↪
      </button>
    </div>
  );
};

export default EditorToolbar;
