// Ensure window.fetch has both a getter and setter for extension interceptors
try {
  if (typeof window !== 'undefined') {
    let _origFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get() { return _origFetch; },
      set(fn) { _origFetch = fn; },
      configurable: true,
      enumerable: true
    });
  }
} catch (_) {}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
