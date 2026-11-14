import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {captureAndStoreUtm} from './utils/utm';

captureAndStoreUtm();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" was not found in index.html');
}

createRoot(rootElement).render(<App />);
