import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bulma/css/bulma.css'; // Import Bulma's styles
import App from './App.jsx';
//use redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
