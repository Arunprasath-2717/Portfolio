import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/big-shoulders-display/700';
import '@fontsource/big-shoulders-display/900';
import '@fontsource/atkinson-hyperlegible-next/400';
import '@fontsource/atkinson-hyperlegible-next/400-italic';
import '@fontsource/atkinson-hyperlegible-next/700';
import '@fontsource/b612-mono/400';
import '@fontsource/b612-mono/700';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
