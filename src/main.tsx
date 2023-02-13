import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { theme } from './utils/theme';

import 'antd/dist/reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
