import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoDetail from './pages/TodoDetail.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="logo">✓</span> TaskFlow
        </h1>
        <p className="app-subtitle">Organize your day, one task at a time</p>
      </header>
      <TodoDetail />
      <footer className="app-footer">
        Built with React + Node.js + MongoDB
      </footer>
    </div>
  </React.StrictMode>,
)
