import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/global.scss'

import { TaskProvider } from './contexts/TaskContext'

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
