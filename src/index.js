import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from './utils/Context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RecoilEnv } from 'recoil';

import '@fontsource/roboto/300.css'; // 300
import '@fontsource/roboto/400.css'; // 400
import '@fontsource/roboto/500.css'; // 500
import '@fontsource/roboto/700.css'; // 700

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ContextProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ContextProvider>
  </BrowserRouter>
);
