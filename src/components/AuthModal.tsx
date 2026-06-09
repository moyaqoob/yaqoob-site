import { useState, type FC, type FormEvent } from 'react';

interface AuthModalProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const PASSPHRASE = import.meta.env.VITE_EDITOR_PASSPHRASE || 'yaqoob2025';

const AuthModal: FC<AuthModalProps> = ({ open, onSuccess, onClose }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  if (!open) return null;

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (value === PASSPHRASE) {
      setError(false);
      setValue('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="auth-modal" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Editor access</h2>
        <p>This space is for you only. Enter the passphrase to continue.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Passphrase</label>
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="Enter passphrase…"
              autoComplete="current-password"
              autoFocus
            />
          </div>
          <div className={`form-error${error ? ' show' : ''}`}>
            Incorrect passphrase. Try again.
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Enter →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
