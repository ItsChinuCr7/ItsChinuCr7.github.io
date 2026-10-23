import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Camera, Clock, Github, GitFork,
  Heart, MapPin, RefreshCw, Search, Sparkles, Star, X, FileText, Download,
  ChevronLeft, ChevronRight, Leaf, Volume2, Compass,
} from 'lucide-react'
import { certifications, experience, fieldNotes, highlights, profile, projects, skillGroups } from './data/portfolio'

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'journey', label: 'Path' },
  { id: 'ideas', label: 'In progress' },
  { id: 'field-notes', label: 'Frames' },
  { id: 'contact', label: 'Say hello' },
]

function WaveBackdrop() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let time = 0
    let pointer = { x: -1000, y: -1000 }
    let target = { x: -1000, y: -1000 }
    let ripples = []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const palette = [
      'rgba(213, 179, 111, 0.18)',
      'rgba(121, 162, 144, 0.16)',
      'rgba(209, 121, 85, 0.14)',
      'rgba(125, 151, 116, 0.15)',
      'rgba(126, 157, 168, 0.12)',
    ]

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paint()
    }

    const paint = () => {
      ctx.clearRect(0, 0, width, height)
      const spacing = width < 650 ? 31 : 24
      const lines = Math.ceil(height / spacing) + 3
      pointer.x += (target.x - pointer.x) * (reduceMotion ? 1 : 0.075)
      pointer.y += (target.y - pointer.y) * (reduceMotion ? 1 : 0.075)

      for (let row = -1; row < lines; row += 1) {
        const baseY = row * spacing + ((time * 0.22 + row * 7) % spacing)
        ctx.beginPath()
        for (let x = -20; x <= width + 24; x += width < 650 ? 12 : 8) {
          const ambient = Math.sin(x * 0.0042 + time * 0.008 + row * 0.19) * 7
            + Math.sin(x * 0.0105 - time * 0.005 + row * 0.13) * 2.7
          const dx = x - pointer.x
          const dy = baseY - pointer.y
          const falloff = Math.exp(-((dx * dx) / (2 * 180 * 180) + (dy * dy) / (2 * 135 * 135)))
          const cursorWave = falloff * Math.sin(dx * 0.025 - time * 0.035) * 20
          const y = baseY + ambient + cursorWave
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = palette[(row + palette.length * 4) % palette.length]
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      ripples = ripples.filter((ripple) => ripple.life > 0.015)
      ripples.forEach((ripple) => {
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(225, 185, 108, ${ripple.life * 0.3})`
        ctx.lineWidth = 1.1
        ctx.stroke()
        ripple.radius += 2.4
        ripple.life *= 0.965
      })
    }

    const animate = () => {
      time += reduceMotion ? 0 : 1
      paint()
      if (!reduceMotion || ripples.length) frame = window.requestAnimationFrame(animate)
      else frame = 0
    }
    const onMove = (event) => {
      target = { x: event.clientX, y: event.clientY }
      if (reduceMotion) paint()
    }
    const onDown = (event) => {
      ripples.push({ x: event.clientX, y: event.clientY, radius: 3, life: 1 })
      if (!frame) frame = window.requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    resize()
    frame = window.requestAnimationFrame(animate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return <canvas ref={canvasRef} className="wave-backdrop" aria-hidden="true" />
}

const codeAtmosphereRails = [
  {
    className: 'code-rail--left',
    lines: [
      'const input = normalize(rawInput)',
      'const chunks = splitDocument(pdf)',
      'const vectors = await embed(chunks)',
      'const evidence = rank(query, vectors)',
      'if (!evidence.length) return askAgain()',
      'return validate(answer, sources)',
    ],
  },
  {
    className: 'code-rail--right',
    lines: [
      'async function buildSomethingUseful()',
      '  observe(signal, context)',
      '  test(edgeCases)',
      '  trace(source, result)',
      '  refine(theNextVersion)',
      '}',
    ],
  },
  {
    className: 'code-rail--middle',
    lines: [
      'retrieval = FAISS + BM25',
      'grounding > confident guessing',
      'measure → learn → improve',
      'frontend ↔ backend ↔ data',
      'small systems, clearer outcomes',
    ],
  },
]

function CodeAtmosphere() {
  return (
    <div className="code-atmosphere" aria-hidden="true">
      {codeAtmosphereRails.map((rail) => (
        <div className={`code-rail ${rail.className}`} key={rail.className}>
          {rail.lines.map((line, index) => (
            <div className="code-rail-line" key={`${line}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span><code>{line}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return undefined

    const cursor = cursorRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!cursor || !ring || !dot || !label) return undefined

    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let frame = 0
    let clickTimer
    const animate = () => {
      rx += (x - rx) * 0.19
      ry += (y - ry) * 0.19
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ring.style.transform = `translate3d(${rx - x}px, ${ry - y}px, 0)`
      frame = window.requestAnimationFrame(animate)
    }
    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
    }
    const onOver = (event) => {
      const target = event.target.closest('a, button, [data-cursor-label], .repo-book, .photo-tile')
      cursor.classList.toggle('is-hovering', Boolean(target))
      label.textContent = target?.getAttribute('data-cursor-label') || ''
    }
    const onDown = () => {
      cursor.classList.add('is-clicking')
      window.clearTimeout(clickTimer)
      clickTimer = window.setTimeout(() => cursor.classList.remove('is-clicking'), 260)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    frame = window.requestAnimationFrame(animate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(clickTimer)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-ring" ref={ringRef}><span className="cursor-label" ref={labelRef} /></span>
      <span className="cursor-dot" ref={dotRef} />
    </div>
  )
}

function ScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-revealed'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return null
}

function TransitionLoader({ active }) {
  return (
    <div className={`transition-loader${active ? ' is-active' : ''}`} aria-hidden="true">
      <div className="transition-mark"><span>CC</span><i /><i /><i /></div>
      <span className="transition-caption">A little shift</span>
    </div>
  )
}

function Buddy({ activeSection, onNavigate, onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const guide = {
    top: { kicker: 'START HERE', title: 'Want the short tour?', body: 'Start with the work, then see the thinking behind the systems.', target: 'work', action: 'Explore the work' },
    work: { kicker: 'THE WORK', title: 'Look under the cover.', body: 'The repository shelf shows what I have been building and exploring.', target: 'approach', action: 'See how I think' },
    approach: { kicker: 'THE APPROACH', title: 'Follow the reasoning.', body: 'Five lenses explain how I think about quality, analytics, automation and AI.', target: 'journey', action: 'See the path so far' },
    journey: { kicker: 'THE PATH', title: 'Context matters.', body: 'A quick look at the roles, study and experiences that shaped the work.', target: 'ideas', action: 'See current experiments' },
    ideas: { kicker: 'IN PROGRESS', title: 'Ideas, not finished claims.', body: 'The bottle and speaker concepts are research studies still being explored.', target: 'field-notes', action: 'Visit the field notes' },
    'field-notes': { kicker: 'OUTSIDE THE WORK', title: 'A different point of view.', body: 'Nine original photographs—night skies, water, small details and places worth slowing down for.', target: 'contact', action: 'Get in touch' },
    contact: { kicker: 'THE NEXT GOOD THING', title: 'Have a question?', body: 'For a project, a technical conversation, or a problem worth untangling.', target: 'work', action: 'Return to the work' },
  }[activeSection] || { kicker: 'START HERE', title: 'Want the short tour?', body: 'Start with the work, then see the thinking behind the systems.', target: 'work', action: 'Explore the work' }

  useEffect(() => {
    if (!isOpen) return undefined
    const onOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('pointerdown', onOutside)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onOutside)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const goTo = (id) => {
    setIsOpen(false)
    onNavigate(id)
  }

  const openResume = () => {
    setIsOpen(false)
    onOpenResume()
  }

  return (
    <div className={`buddy-wrap${isOpen ? ' is-open' : ''}`} ref={containerRef}>
      <button className={`buddy-button${isOpen ? ' is-waving' : ''}`} onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close portfolio field guide' : 'Open portfolio field guide'} aria-expanded={isOpen} aria-controls={isOpen ? 'buddy-panel' : undefined} data-cursor-label="GUIDE">
        <svg viewBox="0 0 84 86" className="buddy-drawing" aria-hidden="true">
          <ellipse cx="42" cy="76" rx="24" ry="5" fill="rgba(28, 50, 43, .13)" />
          <path className="buddy-antenna" d="M42 18 C40 8 47 8 50 12" fill="none" stroke="#294e43" strokeWidth="3" strokeLinecap="round" />
          <circle cx="51" cy="11" r="4" fill="#e3a45f" />
          <path d="M19 39 Q18 19 42 19 Q66 19 65 40 L62 61 Q60 70 42 70 Q24 70 22 61 Z" fill="#f1e8d5" stroke="#294e43" strokeWidth="2.2" />
          <path d="M20 41 Q11 45 15 55 Q17 59 22 54" fill="#e9e2d1" stroke="#294e43" strokeWidth="2" strokeLinecap="round" />
          <path className="buddy-arm" d="M63 43 Q75 44 74 32" fill="none" stroke="#294e43" strokeWidth="4" strokeLinecap="round" />
          <circle cx="75" cy="28" r="4" fill="#e3a45f" stroke="#294e43" strokeWidth="1.5" />
          <circle cx="34" cy="43" r="2.4" fill="#294e43" />
          <circle cx="49" cy="43" r="2.4" fill="#294e43" />
          <path d="M36 51 Q42 56 48 51" fill="none" stroke="#294e43" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 70 L30 77 M51 70 L54 77" stroke="#294e43" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M29 34 Q42 28 55 34" fill="none" stroke="#c36d4e" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="buddy-button-hint">{isOpen ? '×' : '↗'}</span>
      </button>
      {isOpen ? (
        <section className="buddy-panel" id="buddy-panel" aria-label="Portfolio field guide">
          <div className="buddy-panel-topline"><span><Compass size={14} /> FIELD GUIDE</span><button type="button" onClick={() => setIsOpen(false)} aria-label="Close field guide"><X size={15} /></button></div>
          <span className="buddy-panel-kicker">{guide.kicker}</span>
          <h3>{guide.title}</h3>
          <p>{guide.body}</p>
          <button className="button button--primary buddy-panel-action" type="button" onClick={() => goTo(guide.target)}>{guide.action}<ArrowUpRight size={15} /></button>
          <div className="buddy-panel-shortcuts">
            <button type="button" onClick={openResume}><FileText size={14} /> View résumé</button>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={12} /></a>
          </div>
        </section>
      ) : null}
      <span className="buddy-caption">field guide</span>
    </div>
  )
}

function Header({ activeSection, onNavigate }) {
  const navRef = useRef(null)
  const [dogPosition, setDogPosition] = useState({ left: 28, top: 12 })
  const [pinnedDogId, setPinnedDogId] = useState(null)

  const moveDogTo = useCallback((id, sourceElement = null) => {
    const nav = navRef.current
    if (!nav) return
    const link = sourceElement || nav.querySelector(`[data-nav-id="${id}"]`)
    if (!link) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setDogPosition({
      left: linkRect.left - navRect.left + linkRect.width / 2,
      top: linkRect.top - navRect.top + 3,
    })
  }, [])

  useEffect(() => {
    const targetId = navItems.some((item) => item.id === activeSection) ? activeSection : navItems[0].id
    if (pinnedDogId) return undefined
    const frame = window.requestAnimationFrame(() => moveDogTo(targetId))
    const handleResize = () => moveDogTo(targetId)
    window.addEventListener('resize', handleResize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSection, pinnedDogId, moveDogTo])

  const handleSectionClick = (event, id) => {
    event.preventDefault()
    setPinnedDogId(id)
    moveDogTo(id, event.currentTarget)
    onNavigate(id)
  }

  const clearPointerPin = () => {
    setPinnedDogId(null)
    const targetId = navItems.some((item) => item.id === activeSection) ? activeSection : navItems[0].id
    moveDogTo(targetId)
  }

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" onClick={(event) => { event.preventDefault(); onNavigate('top') }} data-cursor-label="HOME" aria-label="Chinmay Chaudhari, home">
        <span className="brand-stamp">C<span>.</span></span>
        <span className="brand-copy"><strong>CHINMAY CHAUDHARI</strong><small>SOFTWARE / AUTOMATION / APPLIED AI</small></span>
      </a>

      <nav
        id="site-navigation"
        ref={navRef}
        className="site-nav site-nav--dog"
        aria-label="Main navigation"
        onPointerLeave={clearPointerPin}
        onBlurCapture={(event) => {
          if (!navRef.current?.contains(event.relatedTarget)) clearPointerPin()
        }}
      >
        <span
          className="nav-dog-marker"
          aria-hidden="true"
          style={{ transform: `translate3d(${dogPosition.left}px, ${dogPosition.top}px, 0) translate(-50%, -88%)` }}
        >
          <svg className="nav-dog-figure" viewBox="0 0 76 50" fill="none">
            <ellipse cx="36" cy="44" rx="20" ry="3.5" fill="rgba(12, 25, 19, .2)" />
            <path d="M16 27 Q7 20 10 12 Q18 15 20 23" stroke="#e0b66c" strokeWidth="5" strokeLinecap="round" />
            <path d="M18 26 Q20 16 35 17 Q47 17 51 27 L49 37 L22 37Z" fill="#e8d9ba" stroke="#18352a" strokeWidth="1.6" />
            <path d="M25 35 L24 42 M43 35 L45 42" stroke="#e8d9ba" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M21 42 L27 42 M42 42 L48 42" stroke="#18352a" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M47 26 Q53 21 61 23 L67 28 L64 35 L53 36 L48 32Z" fill="#e8d9ba" stroke="#18352a" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M52 23 L51 15 Q57 14 60 22" fill="#c36d4e" stroke="#18352a" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M61 23 L67 19 L69 28" fill="#c36d4e" stroke="#18352a" strokeWidth="1.4" strokeLinejoin="round" />
            <circle cx="60" cy="27" r="1.5" fill="#18352a" />
            <ellipse cx="67" cy="30" rx="3.1" ry="2.5" fill="#d9a05b" stroke="#18352a" strokeWidth="1.1" />
            <circle cx="69" cy="29.5" r="1" fill="#18352a" />
            <path d="M47 31 Q43 35 39 31" stroke="#c36d4e" strokeWidth="2.1" strokeLinecap="round" />
            <path d="M48 28 Q42 24 38 27" stroke="#18352a" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id
          return (
            <a
              key={item.id}
              data-nav-id={item.id}
              className={`nav-dog-link${isActive ? ' is-active' : ''}`}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onPointerEnter={(event) => { setPinnedDogId(item.id); moveDogTo(item.id, event.currentTarget) }}
              onFocus={(event) => { setPinnedDogId(item.id); moveDogTo(item.id, event.currentTarget) }}
              onClick={(event) => handleSectionClick(event, item.id)}
              data-cursor-label="GO"
            >
              <span className="nav-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="nav-dog-label">{item.label}</span>
              <span className="nav-dog-underline" aria-hidden="true" />
            </a>
          )
        })}
      </nav>

      <a className="header-status" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noreferrer" data-cursor-label="GMAIL"><span /> Say hello <ArrowUpRight size={14} /></a>
    </header>
  )
}

function SectionEyebrow({ number, children }) {
  return <div className="section-eyebrow"><span>{number}</span><i />{children}</div>
}

function ResumeModal({ onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('has-lightbox')

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('has-lightbox')
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus()
    }
  }, [onClose])

  const resumeUrl = profile.resumeUrl || '/resume.pdf'

  return createPortal(
    <div
      className="resume-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <section className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-modal-title" ref={dialogRef}>
        <header className="resume-modal-header">
          <div className="resume-modal-heading">
            <span className="resume-modal-kicker"><i /> THE PERSON BEHIND THE WORK / RÉSUMÉ</span>
            <h2 id="resume-modal-title">Chinmay Sanjay Chaudhari</h2>
            <p>Experience, projects, and the systems I’m learning to build better.</p>
          </div>
          <div className="resume-modal-actions">
            <a className="button button--primary resume-modal-download" href={resumeUrl} download="Chinmay-Sanjay-Chaudhari-Resume.pdf" data-cursor-label="DOWNLOAD">
              <Download size={15} /> Download PDF
            </a>
            <button className="resume-modal-close" ref={closeRef} type="button" onClick={onClose} aria-label="Close résumé preview" data-cursor-label="CLOSE">
              <X size={20} />
            </button>
          </div>
        </header>
        <div className="resume-preview-topbar"><span><FileText size={13} /> PDF PREVIEW</span><span>2 PAGES / SCROLL TO READ</span></div>
        <div className="resume-preview-frame">
          <iframe
            title="Chinmay Sanjay Chaudhari résumé PDF"
            src={`${resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
            loading="eager"
          >
            Your browser cannot display an embedded PDF. Use the Download PDF button above to read the résumé.
          </iframe>
        </div>
        <footer className="resume-modal-footer">
          <span>THE LATEST VERSION · UPDATED OCTOBER 2026</span>
          <a href={resumeUrl} target="_blank" rel="noreferrer">If the preview doesn’t load, open the PDF in a new tab <ArrowUpRight size={13} /></a>
        </footer>
      </section>
    </div>,
    document.body,
  )
}

function HeroArt({ onOpenResume }) {
  return (
    <div className="hero-art" aria-label="An abstract illustration of ideas moving and connecting">
      <div className="hero-art-grid" />
      <div className="hero-code-fragments" aria-hidden="true">
        <div className="hero-code-fragment hero-code-fragment--one"><span>01 / INPUT</span><code>extract(pdf) → chunk(text)</code></div>
        <div className="hero-code-fragment hero-code-fragment--two"><span>02 / RETRIEVE</span><code>rank(query, FAISS + BM25)</code></div>
        <div className="hero-code-fragment hero-code-fragment--three"><span>03 / VERIFY</span><code>evidence && checks</code></div>
      </div>
      <svg className="hero-art-ribbons" viewBox="0 0 540 560" fill="none" aria-hidden="true">
        <path d="M-10 345 C90 80 200 70 270 230 S430 455 550 115" stroke="#c36d4e" strokeWidth="36" strokeLinecap="round" opacity=".15" />
        <path d="M-30 367 C70 102 180 92 250 252 S410 477 530 137" stroke="#e1c78f" strokeWidth="2" strokeLinecap="round" />
        <path d="M-20 393 C80 128 190 118 260 278 S420 503 540 163" stroke="#d77a55" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M-10 419 C90 154 200 144 270 304 S430 529 550 189" stroke="#8fb5a0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M80 510 C130 380 195 338 250 345 S370 395 458 200" stroke="#e7bd6f" strokeWidth="4" strokeLinecap="round" />
        <circle cx="264" cy="273" r="87" stroke="#b7c5b3" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="264" cy="273" r="125" stroke="#d77a55" strokeWidth="1" strokeDasharray="1 11" />
      </svg>
      <div className="hero-orbit hero-orbit--one"><span /></div>
      <div className="hero-orbit hero-orbit--two"><span /></div>
      <div className="hero-note hero-note--one"><span className="note-dot" /> THINK / BUILD / REPEAT</div>
      <div className="hero-note hero-note--two"><Sparkles size={15} /> Curious by default</div>
      <button className="hero-art-center resume-person-trigger" type="button" onClick={onOpenResume} aria-label="Open Chinmay’s résumé" data-cursor-label="RÉSUMÉ">
        <svg className="resume-person-drawing" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="18" r="8.5" fill="#e6b675" />
          <path d="M42 16 Q42 7 51 8 Q59 8 59 17 Q53 12 42 16Z" fill="#172b23" />
          <path d="M41 31 Q50 26 59 31 L64 52 Q64 57 59 58 L57 43 L57 67 L43 67 L43 43 L40 58 Q35 57 36 52Z" fill="#e9dfcb" stroke="#e6b675" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M41 34 L31 47 L35 53 M59 34 L69 46 L66 52" fill="none" stroke="#e9dfcb" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 67 L43 82 M54 67 L58 82" fill="none" stroke="#e6b675" strokeWidth="6" strokeLinecap="round" />
          <path d="M39 84 L46 84 M55 84 L62 84" stroke="#e9dfcb" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="resume-person-label">VIEW RÉSUMÉ</span>
        <i aria-hidden="true">↗</i>
      </button>
      <div className="hero-coordinate">23° / 72°<br />SOMETHING IN MOTION</div>
    </div>
  )
}

function Hero({ onNavigate, onOpenResume }) {
  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-copy">
        <div className="hero-kicker"><span className="live-dot" /> A CURIOUS MIND, A WORKING TOOLKIT</div>
        <h1>Make sense<br />of the <em>mess.</em><br /><span>Make something</span><br /><em className="hero-last-line">matter.</em></h1>
        <p className="hero-intro">I’m Chinmay — a <strong>software developer working across frontend and backend features</strong>, automation, and applied AI. I build practical tools, explore LLM systems, and care about making the whole workflow easier to understand and trust.</p>
        <div className="hero-capability-strip" aria-label="Areas of work and learning"><span>FRONT-END / BACK-END</span><i /><span>AUTOMATION</span><i /><span>LLM SYSTEMS IN LEARNING</span></div>
        <div className="hero-actions">
          <button className="button button--primary" onClick={() => onNavigate('work')} data-cursor-label="EXPLORE">Explore what I build <ArrowDownRight size={17} /></button>
          <button className="text-link resume-inline-trigger" type="button" onClick={onOpenResume} data-cursor-label="RÉSUMÉ"><FileText size={16} /> View résumé <ArrowUpRight size={15} /></button>
          <a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer" data-cursor-label="GITHUB"><Github size={16} /> GitHub profile <ArrowUpRight size={15} /></a>
        </div>
        <div className="hero-footnote"><span className="footnote-rule" /> Building software. Learning LLM systems. Measuring what actually works.</div>
      </div>
      <div className="hero-visual-wrap"><HeroArt onOpenResume={onOpenResume} /></div>
      <div className="hero-bottom-note"><span>SCROLL A LITTLE</span><span className="scroll-line-icon"><ArrowDown size={15} /></span><span>THERE’S MORE BELOW</span></div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlight-strip" aria-label="A few career highlights" data-reveal>
      <div className="highlight-intro"><span>IN A FEW NUMBERS</span><p>Ideas are nice.<br /><em>Useful outcomes are better.</em></p></div>
      {highlights.map((item, index) => (
        <div className="highlight-item" key={item.label}>
          <span className="highlight-index">0{index + 1}</span>
          <strong>{item.value}</strong>
          <span className="highlight-label">{item.label}</span>
          <small>{item.note}</small>
        </div>
      ))}
    </section>
  )
}

const coverThemes = [
  { paper: '#f1d500', ink: '#182b35', accent: '#ef4b9b' },
  { paper: '#5d2a81', ink: '#fff5e7', accent: '#f2d41d' },
  { paper: '#0d83bb', ink: '#f6f1e8', accent: '#ef4b9b' },
  { paper: '#f04d9e', ink: '#211b3f', accent: '#d5d900' },
  { paper: '#a5c900', ink: '#202d2e', accent: '#276bad' },
  { paper: '#df7045', ink: '#fff5e7', accent: '#f1d500' },
  { paper: '#283d83', ink: '#fff5e7', accent: '#e9489a' },
  { paper: '#2f8a5d', ink: '#fff5e7', accent: '#f2d41d' },
  { paper: '#f2eee5', ink: '#233a39', accent: '#c56b48' },
]

function CoverArtwork({ index }) {
  return (
    <div className={`cover-art cover-art--${index % 9}`} aria-hidden="true">
      <i className="art-shape art-shape--a" /><i className="art-shape art-shape--b" /><i className="art-shape art-shape--c" />
      <i className="art-shape art-shape--d" /><i className="art-shape art-shape--e" /><span className="art-spark">✳</span>
    </div>
  )
}

function formatUpdated(dateString) {
  if (!dateString) return 'Update date unavailable'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'Update date unavailable'
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(date)
}

function RepositoryArchive() {
  const [repos, setRepos] = useState([])
  const [publicCount, setPublicCount] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const shelfRef = useRef(null)

  const loadRepos = useCallback(async () => {
    setStatus('loading')
    setError('')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 14000)
    try {
      const headers = { Accept: 'application/vnd.github+json' }
      const [profileResponse, repoResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${profile.githubUsername}`, { headers, signal: controller.signal }),
        fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&direction=desc&per_page=100&type=owner`, { headers, signal: controller.signal }),
      ])
      if (!profileResponse.ok || !repoResponse.ok) {
        const failed = !repoResponse.ok ? repoResponse : profileResponse
        if (failed.status === 404) throw new Error('The GitHub username could not be found. Check src/data/portfolio.js.')
        if (failed.status === 403) throw new Error('GitHub has temporarily rate-limited public API requests. Wait a little, then try again.')
        throw new Error(`GitHub returned status ${failed.status}. Try refreshing in a moment.`)
      }
      const [user, rawRepos] = await Promise.all([profileResponse.json(), repoResponse.json()])
      const cleanRepos = rawRepos
        .filter((repo) => !repo.private)
        .sort((a, b) => new Date(b.pushed_at || b.updated_at || 0) - new Date(a.pushed_at || a.updated_at || 0))
      setRepos(cleanRepos)
      setPublicCount(typeof user.public_repos === 'number' ? user.public_repos : cleanRepos.length)
      setActiveId((current) => current && cleanRepos.some((repo) => repo.id === current) ? current : cleanRepos[0]?.id ?? null)
      setStatus('success')
    } catch (caught) {
      setError(caught?.name === 'AbortError' ? 'The GitHub request took too long. Check your connection and try again.' : (caught instanceof Error ? caught.message : 'Could not load public repositories.'))
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    loadRepos()
  }, [loadRepos])

  const filteredRepos = useMemo(() => repos.filter((repo) => {
    const needle = query.trim().toLowerCase()
    if (!needle) return true
    return `${repo.name} ${repo.description || ''} ${repo.language || ''} ${(repo.topics || []).join(' ')}`.toLowerCase().includes(needle)
  }), [repos, query])
  const visibleRepos = showAll || query.trim() ? filteredRepos : filteredRepos.slice(0, 9)
  const activeRepo = filteredRepos.find((repo) => repo.id === activeId) || filteredRepos[0] || (!query.trim() ? repos[0] || null : null)

  const moveShelf = (direction) => {
    if (!shelfRef.current) return
    shelfRef.current.scrollBy({ left: direction * Math.min(580, shelfRef.current.clientWidth * 0.72), behavior: 'smooth' })
  }

  return (
    <div className="repository-archive">
      <div className="archive-topline">
        <div className="archive-profile"><span className="archive-avatar">{profile.handle.slice(0, 2).toUpperCase()}</span><div><span className="micro-label">A LIVE WINDOW INTO</span><h3>@{profile.githubUsername}</h3></div></div>
        <div className="archive-tools">
          <label className="repo-search"><Search size={15} /><input value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(true) }} placeholder="Find a repository…" aria-label="Search repositories" /></label>
          <button className="quiet-icon-button" onClick={loadRepos} disabled={status === 'loading'} aria-label="Refresh repositories" title="Refresh repositories" data-cursor-label="REFRESH"><RefreshCw size={16} className={status === 'loading' ? 'is-spinning' : ''} /></button>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="archive-profile-link" data-cursor-label="PROFILE">Profile <ArrowUpRight size={14} /></a>
        </div>
      </div>

      <div className="archive-note-row">
        <p><span className="live-pip" /> {status === 'success' || repos.length > 0 ? <><strong>{publicCount ?? repos.length}</strong> public repositories <span className="soft-divider">/</span> {status === 'error' ? 'showing last loaded data' : 'latest work first'}</> : status === 'loading' ? 'Finding the latest work…' : 'Live repository data is unavailable right now.'}</p>
        <div className="shelf-controls"><button onClick={() => moveShelf(-1)} aria-label="Scroll repository shelf left"><ArrowRight className="flip-arrow" size={16} /></button><button onClick={() => moveShelf(1)} aria-label="Scroll repository shelf right"><ArrowRight size={16} /></button><span>HOVER / PICK A BOOK</span></div>
      </div>

      {status === 'loading' && repos.length === 0 ? (
        <div className="archive-loading"><div className="loader-glyph"><i /><i /><i /></div><p>Arranging the shelves…</p><span>Fetching public repository metadata</span></div>
      ) : null}

      {status === 'error' ? (
        <div className="archive-error"><span className="error-mark">!</span><div><h3>The shelf is taking a breather.</h3><p>{error} The rest of the portfolio is still available.</p></div><button className="button button--small" onClick={loadRepos}>Try again <RefreshCw size={14} /></button></div>
      ) : null}

      {status === 'success' && repos.length === 0 ? <div className="archive-error"><Github size={25} /><div><h3>No public repositories were returned.</h3><p>Visit GitHub to check the account, or try refreshing the data.</p></div><a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={14} /></a></div> : null}

      {repos.length > 0 ? (
        <>
          <div className="repo-shelf-mask">
            <div className="repo-shelf" ref={shelfRef}>
              {visibleRepos.map((repo, index) => {
                const theme = coverThemes[index % coverThemes.length]
                const selected = activeRepo?.id === repo.id
                const tilt = Math.max(-12, Math.min(13, (index - Math.min(visibleRepos.length - 1, 4)) * 2.8))
                return (
                  <button
                    key={repo.id}
                    className={`repo-book${selected ? ' is-selected' : ''}`}
                    style={{ '--cover-paper': theme.paper, '--cover-ink': theme.ink, '--cover-accent': theme.accent, '--book-tilt': `${tilt}deg`, '--book-index': index }}
                    onMouseEnter={() => setActiveId(repo.id)}
                    onFocus={() => setActiveId(repo.id)}
                    onClick={() => setActiveId(repo.id)}
                    aria-pressed={selected}
                    aria-label={`Inspect repository ${repo.name}`}
                    data-cursor-label="INSPECT"
                  >
                    <span className="book-edge" />
                    <span className="book-topline"><span>{String(index + 1).padStart(2, '0')}</span><span>GH / PUBLIC</span></span>
                    <CoverArtwork index={index} />
                    <span className="book-title">{repo.name.replaceAll('-', ' ').replaceAll('_', ' ')}</span>
                    <span className="book-bottomline"><span>{repo.language || 'CODE / NOTES'}</span><ArrowUpRight size={15} /></span>
                    <span className="book-spine" aria-hidden="true" />
                  </button>
                )
              })}
              {visibleRepos.length === 0 ? <div className="empty-search">No repositories match “{query}”. Try another term.</div> : null}
            </div>
          </div>
          {filteredRepos.length > 9 && !query.trim() ? (
            <button className="show-all-link" onClick={() => setShowAll((value) => !value)}>{showAll ? 'Back to the short shelf' : `Browse all ${filteredRepos.length} repositories`} <ArrowDownRight size={16} /></button>
          ) : null}
          {activeRepo ? (
            <div className="repo-detail" key={activeRepo.id}>
              <div className="repo-detail-main">
                <div className="repo-detail-eyebrow"><span>SELECTED REPOSITORY</span><span className="detail-id">№ {String(repos.findIndex((repo) => repo.id === activeRepo.id) + 1).padStart(2, '0')}</span></div>
                <h3>{activeRepo.name.replaceAll('-', ' ').replaceAll('_', ' ')}</h3>
                <p>{activeRepo.description || 'A public repository from the workbench. Open it on GitHub to read the README and explore the implementation.'}</p>
                <div className="repo-topics">{(activeRepo.topics || []).slice(0, 5).map((topic) => <span key={topic}>{topic}</span>)}{!activeRepo.topics?.length && activeRepo.language ? <span>{activeRepo.language}</span> : null}{activeRepo.fork ? <span>fork</span> : null}{activeRepo.archived ? <span>archived</span> : null}</div>
              </div>
              <div className="repo-detail-side">
                <div className="repo-metric-grid">
                  <div><span>LANGUAGE</span><strong><i className={`language-dot language-${(activeRepo.language || 'other').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} />{activeRepo.language || 'Mixed / N.A.'}</strong></div>
                  <div><span>STARS</span><strong><Star size={14} />{activeRepo.stargazers_count || 0}</strong></div>
                  <div><span>FORKS</span><strong><GitFork size={14} />{activeRepo.forks_count || 0}</strong></div>
                  <div><span>LAST TOUCHED</span><strong><Clock size={14} />{formatUpdated(activeRepo.pushed_at || activeRepo.updated_at)}</strong></div>
                </div>
                <a className="button button--dark" href={activeRepo.html_url} target="_blank" rel="noreferrer" data-cursor-label="OPEN REPO">Open this repository <ArrowUpRight size={16} /></a>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      <div className="archive-footnote"><span><i /> Live metadata from GitHub’s public API</span><span>Repository descriptions and code belong to their respective projects.</span></div>
    </div>
  )
}

function SelectedBuilds() {
  return (
    <div className="selected-builds">
      <div className="selected-builds-intro" data-reveal>
        <span className="micro-label">A FEW DEEPER DIVES</span>
        <h3>Some things<br />I stayed with<br /><em>a little longer.</em></h3>
        <p>Selected projects from data analysis to retrieval systems. The live archive above reflects GitHub; these notes add a little context to the builds I want to tell a story about.</p>
      </div>
      <div className="selected-project-list" data-reveal>
        {projects.map((project, index) => (
          <article className="selected-project" key={project.title}>
            <span className="selected-project-number">{project.number || String(index + 1).padStart(2, '0')}</span>
            <div>
              <h4>{project.title}<span className="selected-project-subtitle">{project.subtitle}</span></h4>
              <p>{project.summary}</p>
              <div className="selected-project-stack">{(project.stack || []).slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <a className="selected-project-link" href={project.repoUrl || '#contact'} target={project.repoUrl ? '_blank' : undefined} rel={project.repoUrl ? 'noreferrer' : undefined} aria-label={project.repoUrl ? `Open ${project.title} repository` : `Ask about ${project.title}`} data-cursor-label={project.repoUrl ? 'REPO' : 'ASK'}><ArrowUpRight size={16} /></a>
          </article>
        ))}
      </div>
    </div>
  )
}

function WorkSection() {
  return (
    <section className="work-section section-wrap" id="work">
      <div className="section-heading section-heading--work" data-reveal>
        <SectionEyebrow number="01">THE WORKBENCH</SectionEyebrow>
        <div className="section-heading-main"><h2>Every repo has<br />a <em>story.</em></h2><p>A little archive of things I’ve been building, breaking, learning, and rebuilding. Hover over a cover to get the short version before heading into the code.</p></div>
        <div className="section-heading-bottom"><span className="heading-doodle">↘</span><span>SMALL EXPERIMENTS. PRACTICAL SYSTEMS. CONTINUOUS ITERATION.</span></div>
      </div>
      <RepositoryArchive />
      <SelectedBuilds />
    </section>
  )
}

const initiativeStudies = [
  {
    id: 'bottle',
    number: '01',
    theme: 'PACKAGING / CIRCULAR DESIGN',
    title: 'A bottle that starts with the material.',
    dek: 'A paper-forward bottle concept that treats packaging as a design problem: material, protection, cost, and what happens after use.',
    summary: 'The starting point is a moulded-fibre outer shell with a carefully considered barrier or liner, a tamper-evident closure, and a surface that can carry a distinctive brand identity.',
    status: 'ONGOING RESEARCH / NO PROTOTYPE',
    image: '/images/initiatives/paper-bottle-material-study.webp',
    imageAlt: 'A studio study of natural-fibre bottles, paperboard, and packaging materials in warm earthy light',
    gallery: [
      { src: '/images/initiatives/paper-bottle-product-reference.webp', alt: 'Reference bottle silhouette and product notes', label: 'PRODUCT REFERENCE' },
      { src: '/images/initiatives/paper-bottle-shape-reference.webp', alt: 'Technical outline of a paper-bottle shape', label: 'FORM STUDY' },
    ],
    facts: [
      { label: 'Design lens', value: 'Moulded fibre + barrier system' },
      { label: 'Early use cases', value: 'Hospitality, gifting, selected retail' },
      { label: 'Stage', value: 'Research / concept exploration' },
    ],
    thinking: [
      {
        title: 'The question behind it',
        body: 'Could the familiar bottle be redesigned around a renewable-fibre outer shell without sacrificing the everyday requirements people take for granted: leak resistance, handling strength, hygiene, and a dependable closure?'
      },
      {
        title: 'How the direction took shape',
        body: 'The idea begins with the contrast between a natural, tactile paper surface and the engineered parts a liquid container still needs. A moulded-pulp shell, an inner barrier or liner, a resealable tamper-evident cap, and direct-print branding form the early design language.'
      },
      {
        title: 'What needs to be tested',
        body: 'Compare fibre blends, moisture resistance, liner and coating choices, drop strength, water-contact safety, production cost, recyclability, and realistic end-of-life routes. A paper exterior alone does not make a bottle leakproof, recyclable, compostable, or biodegradable in every environment.'
      },
      {
        title: 'Where it could fit',
        body: 'An initial small-batch pilot could focus on premium hospitality, gifting, and selected B2B customers before attempting the demands of large-scale packaged-water distribution.'
      },
    ],
    note: 'Visuals combine a generated material moodboard with reference images. This is a concept study, not a tested food-contact package.'
  },
  {
    id: 'speaker',
    number: '02',
    theme: 'HARDWARE / ACOUSTIC EXPERIMENT',
    title: 'Sound you hear. Bass you can feel.',
    dek: 'A compact speaker concept pairing conventional drivers with tactile transducers, designed to explore how a physical surface can become part of the listening experience.',
    summary: 'The proposal combines two mid-range drivers and a small tweeter on the upper face with two low-power tactile transducers coupled to a lower plate. The enclosure target is compact; the acoustic and mechanical layout still needs prototyping.',
    status: 'DESIGN RESEARCH / NO PROTOTYPE',
    image: '/images/initiatives/tactile-transducer-exploded.webp',
    imageAlt: 'Exploded conceptual rendering of a tactile transducer showing the vibration plate, coils, and magnetic assembly',
    gallery: [
      { src: '/images/initiatives/speaker-component-layout.webp', alt: 'Conceptual component studies for midrange speakers and a tactile transducer', label: 'COMPONENT STUDY' },
      { src: '/images/initiatives/speaker-cross-section-study.webp', alt: 'Illustrative speaker enclosure cross-section with tactile hardware', label: 'CROSS-SECTION STUDY' },
      { src: '/images/initiatives/tactile-driver-principle.webp', alt: 'Illustrative cross-section showing the coil, magnetic array, and vibrating plate', label: 'DRIVER PRINCIPLE' },
    ],
    facts: [
      { label: 'Proposed envelope', value: '150 × 70 × 50 mm' },
      { label: 'Upper drivers', value: '2 × 1.5 in midrange, 7 W each + ~0.75 in tweeter' },
      { label: 'Tactile system', value: '2 × 5 W transducers + coupling plate' },
    ],
    thinking: [
      {
        title: 'The question behind it',
        body: 'Can a small speaker deliver intelligible mid/high-frequency audio while transferring a controlled low-frequency vibration into the surface it rests on? The aim is to test the feeling of bass as a complement to airborne sound—not to assume that tactile vibration automatically creates deeper audible bass.'
      },
      {
        title: 'How the concept is arranged',
        body: 'The current external-envelope target is 150 mm long × 70 mm wide × 50 mm high. The top face is planned around two 1.5-inch (about 38 mm) midrange drivers, rated at 7 W each, and one small roughly 0.75-inch (about 19 mm) tweeter. The lower assembly uses two 5 W tactile transducers mounted to a vibration-coupling plate that makes controlled contact with a supporting surface.'
      },
      {
        title: 'Amplifier and signal path',
        body: 'The current electronics idea is five independently controlled outputs: two tactile channels, two midrange channels, and one tweeter path. The actual amplifier and crossover design depends on the selected drivers’ impedance and response; the tweeter must receive suitable high-pass filtering, and the enclosure needs verified internal volume and mounting depth.'
      },
      {
        title: 'What the prototype must answer',
        body: 'Test transducer placement, vibration transfer on wood/glass/other surfaces, coupling-plate stiffness, cabinet resonance, acoustic isolation, heat, battery/current demand, polarity, crossover points, and whether the chosen driver sizes can physically fit inside the proposed enclosure. Dimensions and power ratings are design targets, not validated specifications.'
      },
    ],
    note: 'The supplied/generated diagrams are for visual explanation only; some labels and component proportions may be inaccurate. They are not manufacturing drawings or validated engineering calculations.'
  },

]

function InitiativesSection() {
  const [selectedVisual, setSelectedVisual] = useState(null)

  useEffect(() => {
    if (!selectedVisual) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') setSelectedVisual(null) }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('has-lightbox')
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.classList.remove('has-lightbox') }
  }, [selectedVisual])

  return (
    <section className="initiatives-section" id="ideas">
      <div className="initiatives-inner">
        <div className="initiatives-heading" data-reveal>
          <div>
            <SectionEyebrow number="04">WORKING / LEARNING / REFINING</SectionEyebrow>
            <h2>Ideas in progress.<br /><em>Researching with curiosity.</em></h2>
          </div>
          <div className="initiatives-heading-aside">
            <span className="initiatives-index">CONCEPT STUDIES / 02</span>
            <p>Two early-stage explorations: paper-forward packaging and a compact speaker concept pairing conventional drivers with surface-coupled tactile vibration. Both are in research and design-study stages; no physical prototypes have been built yet.</p>
            <span className="initiatives-rule" />
          </div>
        </div>

        <div className="initiative-list">
          {initiativeStudies.map((study) => {
            const isBottle = study.id === 'bottle'
            const isSpeaker = study.id === 'speaker'
            const StudyIcon = isBottle ? Leaf : Volume2
            const visualCaption = isBottle ? 'PULP / FORM / MATERIAL' : isSpeaker ? 'COILS / MAGNETS / VIBRATION' : 'PDF / RETRIEVAL / EVALUATION'
            return (
              <article className={`initiative-study initiative-study--${study.id}`} key={study.id} data-reveal>
                <div className="initiative-visual-column">
                  <div className={`initiative-main-visual initiative-main-visual--${study.id}`}>
                    <button className="initiative-image-open" type="button" onClick={() => setSelectedVisual({ src: study.image, alt: study.imageAlt, label: study.title })} aria-label={`Enlarge image: ${study.title}`} data-cursor-label="ZOOM">
                      <img src={study.image} alt={study.imageAlt} loading="lazy" />
                    </button>
                    <div className="initiative-visual-index"><span>{study.number} / VISUAL NOTES</span><span><StudyIcon size={15} /></span></div>
                    <span className="initiative-image-caption">{visualCaption}</span>
                  </div>
                  {study.gallery.length > 0 ? (
                    <div className={`initiative-gallery initiative-gallery--${study.id}`}>
                      {study.gallery.map((image) => (
                        <figure className="initiative-gallery-item" key={image.src}>
                          <button className="initiative-image-open" type="button" onClick={() => setSelectedVisual({ src: image.src, alt: image.alt, label: image.label })} aria-label={`Enlarge ${image.label.toLowerCase()}`} data-cursor-label="ZOOM">
                            <img src={image.src} alt={image.alt} loading="lazy" />
                          </button>
                          <figcaption>{image.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="initiative-copy-column">
                  <div className="initiative-meta"><span>{study.theme}</span><span>{study.status}</span></div>
                  <h3>{study.title}</h3>
                  <p className="initiative-dek">{study.dek}</p>
                  <p className="initiative-summary">{study.summary}</p>
                  <dl className="initiative-facts">
                    {study.facts.map((fact) => (
                      <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                    ))}
                  </dl>
                  {study.repoUrl ? (
                    <a className="initiative-repo-link" href={study.repoUrl} target="_blank" rel="noreferrer" data-cursor-label="OPEN REPO">
                      <Github size={14} /> Explore the implementation on GitHub <ArrowUpRight size={14} />
                    </a>
                  ) : null}

                </div>
              </article>
            )
          })}
        </div>
        <div className="initiatives-footer"><span><i /> RESEARCH IS A PROCESS, NOT A CLAIM OF COMPLETION.</span><span>UPDATED AS THE IDEAS DEVELOP</span></div>
      </div>
      {selectedVisual ? (
        <div className="initiative-lightbox" role="dialog" aria-modal="true" aria-label={selectedVisual.label} onClick={() => setSelectedVisual(null)}>
          <button className="initiative-lightbox-close" type="button" onClick={() => setSelectedVisual(null)} aria-label="Close image"><X size={20} /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedVisual.src} alt={selectedVisual.alt} />
            <figcaption>{selectedVisual.label}</figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  )
}

function SkillCloud() {
  return (
    <section className="approach-section section-wrap" id="approach">
      <div className="approach-intro" data-reveal>
        <SectionEyebrow number="02">HOW I THINK & BUILD</SectionEyebrow>
        <h2>Curiosity is the<br /><em>common thread.</em></h2>
        <p>Different tools, same instinct: understand the problem, get close to the data, make the workflow less fragile, and leave things clearer than I found them.</p>
        <div className="approach-note"><span className="approach-note-mark">↗</span><span>Tools are a means.<br /><strong>Good judgement is the work.</strong></span></div>
      </div>
      <div className="skill-catalog" data-reveal>
        {skillGroups.map((group, index) => (
          <article className={`skill-row skill-row--${index + 1}`} key={group.label}>
            <div className="skill-row-label"><span>0{index + 1}</span><h3>{group.label}</h3></div>
            <div className="skill-row-copy">
              <p>{group.description}</p>
              {group.practice ? <p className="skill-row-practice">{group.practice}</p> : null}
              {group.linkUrl ? (
                <a className="skill-row-link" href={group.linkUrl} target="_blank" rel="noreferrer" data-cursor-label="OPEN REPO">
                  <Github size={13} /> Explore the document assistant <ArrowUpRight size={13} />
                </a>
              ) : null}
            </div>
            <div className="skill-tags">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <span className="skill-ornament" aria-hidden="true">{['⌘', '◌', '↗', '✳', '∿'][index]}</span>
          </article>
        ))}
        <div className="learning-line"><span className="learning-spark">✳</span><p>Currently learning deeper LLM evaluation, model guardrails, observability, and the systems that make AI applications reliable—while treating measured results, not assumptions, as proof.</p></div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="journey-section section-wrap" id="journey">
      <div className="journey-heading" data-reveal>
        <SectionEyebrow number="03">A SHORT TIMELINE</SectionEyebrow>
        <h2>Experience, in<br /><em>the making.</em></h2>
        <p>Work, study, side quests — all part of learning how to build things that hold up.</p>
      </div>
      <div className="journey-grid">
        <div className="journey-list" data-reveal>
          {experience.filter((item) => item.type === 'experience' || item.type === 'education').map((item, index) => (
            <article className="journey-item" key={`${item.org}-${item.period}`}>
              <div className="journey-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
              <div className="journey-content">
                <div className="journey-top"><span>{item.period}</span><span>{item.type === 'experience' ? 'WORK' : 'EDUCATION'}</span></div>
                <h3>{item.title}</h3><div className="journey-org">{item.org}</div>
                {item.summary ? <p>{item.summary}</p> : null}
                {item.details?.length ? <ul>{item.details.slice(0, 3).map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}
                <span className="journey-location"><MapPin size={12} />{item.location}</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="journey-aside" data-reveal>
          <div className="aside-doodle"><svg viewBox="0 0 240 190" fill="none" aria-hidden="true"><path d="M16 121C63 20 133 18 153 78S187 157 224 53" stroke="#345f50" strokeWidth="2" strokeLinecap="round"/><path d="M8 142C55 41 125 39 145 99S179 178 216 74" stroke="#c77953" strokeWidth="1.4" strokeLinecap="round"/><circle cx="155" cy="81" r="32" stroke="#345f50" strokeDasharray="2 5"/><circle cx="155" cy="81" r="4" fill="#c77953"/></svg></div>
          <span className="micro-label">A NOTE TO SELF</span>
          <blockquote>Build with curiosity. Research with intent. Let evidence shape the next version.</blockquote>
          <div className="aside-signature">— field note no. 04</div>
          <div className="certifications"><span className="micro-label">CERTIFICATIONS & LEARNING</span>{certifications.map((cert) => <div className="cert-row" key={cert.name}><span>{cert.name}</span><small>{cert.year || cert.provider}</small></div>)}</div>
        </aside>
      </div>
    </section>
  )
}

const photoJournal = fieldNotes

function PhotoJournal() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const activePhoto = lightboxIndex === null ? null : photoJournal[lightboxIndex]
  const visiblePhotos = showAllPhotos ? photoJournal : photoJournal.slice(0, 5)

  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') setLightboxIndex((index) => (index + 1) % photoJournal.length)
      if (event.key === 'ArrowLeft') setLightboxIndex((index) => (index + photoJournal.length - 1) % photoJournal.length)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('has-lightbox')
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.classList.remove('has-lightbox') }
  }, [lightboxIndex])

  const stepPhoto = (direction) => {
    setLightboxIndex((index) => (index + direction + photoJournal.length) % photoJournal.length)
  }

  return (
    <section className="field-section section-wrap" id="field-notes">
      <div className="field-heading" data-reveal>
        <SectionEyebrow number="05">OUTSIDE THE WORK</SectionEyebrow>
        <div><h2>Frames from<br />the <em>field.</em></h2><p>Nine original frames, collected from late-night water, long walks, small details and places worth slowing down for. Select a frame to see it larger.</p></div>
        <span className="field-stamp"><Camera size={18} /><span>FIELD<br />NOTES / 09</span></span>
      </div>
      <div className={`photo-wall${showAllPhotos ? ' is-expanded' : ''}`}>
        {visiblePhotos.map((photo, index) => (
          <button className={`photo-tile ${photo.size}`} key={photo.id} onClick={() => setLightboxIndex(index)} data-cursor-label="LOOK CLOSER" aria-label={`Open photograph: ${photo.title}`}>
            <img src={photo.image} alt={photo.alt} loading={index < 3 ? 'eager' : 'lazy'} />
            <span className="photo-shade" />
            <span className="photo-tile-index">{photo.id} <span>{photo.place}</span></span>
            <span className="photo-tile-bottom"><strong>{photo.title}</strong><i><ArrowUpRight size={18} /></i></span>
            <span className="photo-tile-hover">Open frame <ArrowUpRight size={14} /></span>
          </button>
        ))}
      </div>
      <div className="photo-expand-wrap">
        <button className="photo-expand" type="button" onClick={() => setShowAllPhotos((show) => !show)} aria-expanded={showAllPhotos}>
          <span>{showAllPhotos ? 'Show the featured frames' : 'Explore all 9 photographs'}</span>
          <span className={`photo-expand-icon${showAllPhotos ? ' is-open' : ''}`}><ArrowDownRight size={17} /></span>
        </button>
        <span className="photo-expand-count">{showAllPhotos ? '09 / 09 FRAMES VISIBLE' : '05 FEATURED / 04 MORE TO EXPLORE'}</span>
      </div>
      <div className="photo-footnote"><span>PHOTOGRAPHS TAKEN BY ME</span><span>The best bits are often the unplanned ones.</span></div>
      {activePhoto ? (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={activePhoto.title} onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close image"><X size={20} /></button>
          <button className="photo-lightbox-nav photo-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); stepPhoto(-1) }} aria-label="Previous photograph"><ChevronLeft size={23} /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activePhoto.image} alt={activePhoto.alt} />
            <figcaption><span>{activePhoto.id} / {activePhoto.place}</span><h3>{activePhoto.title}</h3><p>{activePhoto.caption}</p></figcaption>
          </figure>
          <button className="photo-lightbox-nav photo-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); stepPhoto(1) }} aria-label="Next photograph"><ChevronRight size={23} /></button>
          <span className="photo-lightbox-count">{String(lightboxIndex + 1).padStart(2, '0')} / {String(photoJournal.length).padStart(2, '0')}</span>
        </div>
      ) : null}
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact-section section-wrap" id="contact">
      <div className="contact-drift" aria-hidden="true"><svg viewBox="0 0 640 380" fill="none"><path d="M-10 260C140 20 260 55 330 170S500 335 650 65" stroke="#f1d7af" strokeWidth="34" opacity=".08" strokeLinecap="round"/><path d="M-10 260C140 20 260 55 330 170S500 335 650 65" stroke="#e4bb82" strokeWidth="1.5" strokeLinecap="round"/><path d="M-30 285C120 45 240 80 310 195S480 360 630 90" stroke="#c1d5c2" strokeWidth="1" strokeLinecap="round"/></svg></div>
      <div className="contact-main" data-reveal>
        <SectionEyebrow number="06">THE NEXT GOOD THING</SectionEyebrow>
        <h2>Have a good<br /><em>question?</em></h2>
        <p>Maybe there’s a problem worth untangling, a system worth improving, or an idea that’s not quite a plan yet. I’m open to hearing about it.</p>
        <a className="contact-email" href={`mailto:${profile.email}`} data-cursor-label="EMAIL ME">{profile.email}<span><ArrowUpRight size={21} /></span></a>
      </div>
      <div className="contact-meta" data-reveal><span><MapPin size={14} /> Based in India</span><span><Heart size={14} /> Curious about thoughtful teams</span><a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={13} /></a></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="footer-signature" href="#top" aria-label="Back to top"><span className="brand-stamp">C<span>.</span></span><span>Made with curiosity,<br /><em>and a few too many tabs.</em></span></a>
      <span className="footer-middle">© {new Date().getFullYear()} CHINMAY CHAUDHARI</span>
      <a className="back-to-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Back to top <ArrowUpRight size={15} /></a>
    </footer>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('top')
  const [transitioning, setTransitioning] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const transitionTimer = useRef(null)
  const isNavigating = useRef(false)

  const closeResume = useCallback(() => setResumeOpen(false), [])

  const navigateTo = useCallback((id) => {
    if (isNavigating.current) return
    isNavigating.current = true
    setTransitioning(true)
    window.clearTimeout(transitionTimer.current)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    }, 125)
    transitionTimer.current = window.setTimeout(() => {
      setTransitioning(false)
      isNavigating.current = false
    }, 620)
  }, [])

  useEffect(() => {
    const sections = ['top', 'work', 'approach', 'journey', 'ideas', 'field-notes', 'contact'].map((id) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target?.id) setActiveSection(visible.target.id)
    }, { rootMargin: '-25% 0px -58% 0px', threshold: [0, 0.1, 0.25, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      document.documentElement.style.setProperty('--scroll-progress', String(progress))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])

  return (
    <div className="app-shell">
      <WaveBackdrop />
      <CustomCursor />
      <ScrollReveal />
      <div className="paper-grain" aria-hidden="true" />
      <CodeAtmosphere />
      <div className="scroll-progress" aria-hidden="true" />
      <Header activeSection={activeSection} onNavigate={navigateTo} />
      <main>
        <Hero onNavigate={navigateTo} onOpenResume={() => setResumeOpen(true)} />
        <Highlights />
        <WorkSection />
        <SkillCloud />
        <Journey />
        <InitiativesSection />
        <PhotoJournal />
        <ContactSection />
      </main>
      <Footer />
      <Buddy activeSection={activeSection} onNavigate={navigateTo} onOpenResume={() => setResumeOpen(true)} />
      <TransitionLoader active={transitioning} />
      {resumeOpen ? <ResumeModal onClose={closeResume} /> : null}
    </div>
  )
}
