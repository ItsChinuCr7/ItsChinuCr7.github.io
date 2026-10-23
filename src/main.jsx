import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

class PortfolioErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Portfolio rendering failed:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', padding: '48px 24px', background: '#090a0a', color: '#e9ede4', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: 760, margin: '8vh auto' }}>
            <p style={{ color: '#c5fa68', letterSpacing: '.14em', fontSize: 12 }}>PORTFOLIO / RENDER ERROR</p>
            <h1 style={{ fontSize: 'clamp(30px, 6vw, 54px)', marginBottom: 16 }}>The page could not render.</h1>
            <p style={{ color: '#a8aea5', lineHeight: 1.7 }}>A JavaScript error stopped the portfolio from loading. Open the browser developer console (F12 → Console) and inspect the error below. Fix the reported source line, then restart the dev server or redeploy.</p>
            <pre style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap', padding: 18, border: '1px solid #34382f', background: '#111310', color: '#f0b4a7', lineHeight: 1.6 }}>{String(this.state.error?.message || this.state.error || 'Unknown rendering error')}</pre>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioErrorBoundary>
      <App />
    </PortfolioErrorBoundary>
  </React.StrictMode>,
)
