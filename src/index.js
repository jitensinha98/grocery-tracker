import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserAuthContextProvider from './Context/AuthContextProvider';
import UserDataContextProvider from './Context/DataContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Main application wrapped inside context provider components
root.render(
  <React.StrictMode>
    <UserDataContextProvider>
      <UserAuthContextProvider>
        <App/>
      </UserAuthContextProvider>
    </UserDataContextProvider>
  </React.StrictMode>
);


