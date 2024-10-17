import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx'
import { Providers } from '@/redux/provider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter basename='/web/gis'>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>,
)
