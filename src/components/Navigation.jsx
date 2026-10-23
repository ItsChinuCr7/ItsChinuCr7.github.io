import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const navItems = [
  ['about', 'About'],
  ['work', 'Work'],
  ['skills', 'Toolkit'],
  ['journey', 'Journey'],
  ['field-notes', 'Off-screen'],
  ['contact', 'Contact'],
]

export default function Navigation({ activeSection, progress }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="site-nav">
        <button className="brand" onClick={() => jumpTo('top')} aria-label="Scroll to top">
          <span className="brand-mark">c<span>.</span></span>
          <span className="brand-word">CHINMAY<span>/</span>CHAUDHARI</span>
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <button key={id} className={`nav-link ${activeSection === id ? 'is-active' : ''}`} onClick={() => jumpTo(id)}>
              {label}
              {activeSection === id ? <span className="nav-active-dot" /> : null}
            </button>
          ))}
          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </nav>
        <button className="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {open ? <button className="nav-scrim" onClick={() => setOpen(false)} aria-label="Close navigation" /> : null}
    </>
  )
}
