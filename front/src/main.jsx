import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';

import TaskScreen from './TaskScreen'
import './index.css'
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <TaskScreen />
    </Provider>
  </React.StrictMode>
)
