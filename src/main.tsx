import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { startAnimatedFavicon } from './lib/animatedFavicon';

startAnimatedFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
