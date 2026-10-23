import { useEffect } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, AtSign, BriefcaseBusiness,
  Check, Compass, Download, Github, Globe2, GraduationCap, Heart, Linkedin, Mail, MapPin,
  MoveUpRight, Phone, Send, Sparkles, Terminal, Telescope, Waypoints, X,
} from 'lucide-react'
import {
  motion, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion'
import Navigation from './components/Navigation'
import SectionHeading from './components/SectionHeading'
import GitHubProjects from './components/GitHubProjects'
import { useActiveSection } from './hooks/useActiveSection'
import {
  certifications, experience, fieldNotes, highlights, profile, projects, skillGroups,
} from './data/portfolio'

const sectionIds = ['top', 'about', 'work', 'skills', 'journey', 'field-notes', 'contact']
const ease = [0.22, 1, 0.36, 1]

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

function ExternalArrow() {
  return <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Abstract animated diagram representing connected data and ideas">
      <div className="visual-stamp visual-stamp--top"><span className="signal-dot" /> FIELD NOTES / 001</div>
      <div className="orbit-scene">
        <div className="orbit-halo orbit-halo--one" />
        <div className="orbit-halo orbit-halo--two" />
        <div className="orbit-halo orbit-halo--three" />
        <div className="orbit-axis orbit-axis--vertical" />
        <div className="orbit-axis orbit-axis--horizontal" />
        <motion.div className="orbit-core" animate={{ rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}>
          <span>CC</span>
          <i className="core-cross core-cross--top" />
          <i className="core-cross core-cross--bottom" />
        </motion.div>
        <motion.div className="orbit-particle orbit-particle--one" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}><i /></motion.div>
        <motion.div className="orbit-particle orbit-particle--two" animate={{ rotate: -360 }} transition={{ duration: 31, repeat: Infinity, ease: 'linear' }}><i /></motion.div>
        <motion.div className="orbit-particle orbit-particle--three" animate={{ rotate: 360 }} transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}><i /></motion.div>
        <div className="orbit-label orbit-label--left"><span>01</span> DATA</div>
        <div className="orbit-label orbit-label--right"><span>02</span> AUTOMATION</div>
        <div className="orbit-label orbit-label--bottom"><span>03</span> CURIOSITY</div>
      </div>
      <div className="visual-metrics">
        <div><span className="metric-number">10K<span>+</span></span><span className="metric-caption">RECORDS / PROCESSED</span></div>
        <div className="metric-divider" />
        <div><span className="metric-number">∞</span><span className="metric-caption">THINGS / TO EXPLORE</span></div>
      </div>
      <div className="visual-coordinate">CURIOUS <span>·</span> EVERYWHERE</div>
      <span className="visual-grain" />
    </div>
  )
}

function Hero({ reduce }) {
  const { scrollY } = useScroll()
  const visualY = useTransform(scrollY, [0, 750], [0, reduce ? 0 : 105])
  const titleY = useTransform(scrollY, [0, 650], [0, reduce ? 0 : -55])
  const heroOpacity = useTransform(scrollY, [0, 580], [1, 0.25])

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-noise" aria-hidden="true" />
      <motion.div className="hero-copy" style={{ y: titleY, opacity: heroOpacity }}>
        <motion.div className="hero-overline" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <span className="availability"><i /> OPEN TO WHAT'S NEXT</span>
          <span className="overline-separator">/</span>
          <span className="mono-label">PORTFOLIO · 2026</span>
        </motion.div>
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.22, ease }}>
          Building useful
          <span className="hero-line-two">things<span className="hero-italic">,</span></span>
          <span className="hero-outline">staying curious<span className="accent-dot">.</span></span>
        </motion.h1>
        <motion.p className="hero-summary" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }}>
          I’m <strong>Chinmay</strong> — I turn data, automation, and practical AI into useful systems. Outside the screen, I’m usually looking for a new place, a longer route, or a detail worth photographing.
        </motion.p>
        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.62, ease }}>
          <button className="button button--primary" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}>Explore my work <ArrowDownRight size={17} /></button>
          <a className="button button--ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">Résumé <Download size={15} /></a>
        </motion.div>
        <motion.div className="hero-bottomline" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.8 }}>
          <span><MapPin size={13} /> BASED IN INDIA</span>
          <span className="hero-bottomline__divider" />
          <span>DATA <b>×</b> AUTOMATION <b>×</b> AI</span>
        </motion.div>
      </motion.div>
      <motion.div className="hero-art-wrap" style={{ y: visualY }} initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease }}>
        <HeroVisual />
      </motion.div>
      <div className="hero-rail" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i /></div>
      <div className="hero-index" aria-hidden="true">01 <span>/</span> 06</div>
    </section>
  )
}

function Marquee() {
  const entries = ['MAKE IT USEFUL', 'STAY CURIOUS', 'GET OUTSIDE', 'FOLLOW THE QUESTION', 'MAKE IT USEFUL', 'STAY CURIOUS', 'GET OUTSIDE', 'FOLLOW THE QUESTION']
  return (
    <div className="marquee" aria-label="Make it useful. Stay curious. Get outside.">
      <div className="marquee-track">{entries.map((entry, index) => <span className="marquee-item" key={`${entry}-${index}`}>{entry}<i>✳</i></span>)}</div>
    </div>
  )
}

function AboutSection({ reduce }) {
  return (
    <section className="section section-about section-shell" id="about">
      <SectionHeading index="01" eyebrow="A little context" title={<>More than a job title<span className="accent-dot">.</span></>} detail="The work matters. So does the person doing it." />
      <div className="about-grid">
        <motion.div className="about-manifesto" initial={reduce ? false : { opacity: 0, x: -26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease }}>
          <div className="manifesto-number">A / 01</div>
          <h3>Curiosity first.<br /><span>Useful by design.</span></h3>
          <p>I’m interested in the space between a messy problem and a working system. That has taken me through data analysis, market research, automation, and AI-enabled tools — usually with a spreadsheet, a script, or a question somewhere in the process.</p>
          <p>I’m still figuring out the exact shape of the path. I like it that way: there is more to learn, more places to go, and more useful things to build.</p>
          <div className="about-signature"><span className="signature-mark">c.</span><span>Curious by default.<br />Practical by choice.</span></div>
        </motion.div>
        <div className="about-stat-grid">
          {highlights.map((item, index) => (
            <motion.article className={`stat-card stat-card--${index + 1}`} key={item.value} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.58, delay: reduce ? 0 : index * 0.08, ease }}>
              <span className="stat-card__index">0{index + 1} / SIGNAL</span>
              <strong>{item.value}</strong>
              <span className="stat-card__label">{item.label}</span>
              <p>{item.note}</p>
              <span className="stat-decoration" aria-hidden="true">↗</span>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="about-footnote"><span className="tiny-diamond" /> Numbers from a real project log, not a personality quiz.</div>
    </section>
  )
}

function ProjectCard({ project, index, reduce }) {
  const projectUrl = project.repoUrl || `${profile.githubUrl}?tab=repositories`
  const projectLinkLabel = project.repoUrl ? 'View repository' : 'Browse repositories'
  return (
    <motion.article className={`project-card project-card--${project.accent}`} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay: reduce ? 0 : (index % 2) * 0.08, ease }}>
      <div className="project-card__top">
        <span className="project-number">PROJECT / {project.number}</span>
        <span className="project-category">{project.category}</span>
      </div>
      <div className="project-illustration" aria-hidden="true">
        <div className="project-illustration__grid" />
        {index === 0 ? <div className="diagram-rag"><span>QUERY</span><i /><span>RETRIEVE</span><i /><span>RERANK</span><i /><span>ANSWER</span></div> : null}
        {index === 1 ? <div className="pulse-graph"><svg viewBox="0 0 380 118" preserveAspectRatio="none"><path d="M0 70 L35 64 L58 76 L88 20 L112 96 L139 77 L164 83 L185 48 L208 56 L229 34 L250 72 L274 67 L301 85 L326 32 L350 58 L380 38" /></svg><span className="graph-label graph-label--one">IMU / X,Y,Z</span><span className="graph-label graph-label--two">SIGNAL DETECTED</span></div> : null}
        {index === 2 ? <div className="mini-dashboard"><div className="dashboard-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="dashboard-donut"><span>8K<span>+</span></span></div><div className="dashboard-line"><i /><i /><i /><i /><i /></div></div> : null}
        {index === 3 ? <div className="prompt-window"><span className="window-dots"><i /><i /><i /></span><span className="prompt-line prompt-line--short" /><span className="prompt-line" /><span className="prompt-line prompt-line--long" /><span className="prompt-response">response<span> ↗</span></span></div> : null}
        {index === 4 ? <div className="content-stack"><span>IDEA</span><ArrowDown size={17} /><span>STRUCTURED PROMPT</span><ArrowDown size={17} /><span>POST / DRAFT</span></div> : null}
        <div className="illustration-index">{project.number}<span>—</span>0{index + 1}</div>
      </div>
      <div className="project-card__content">
        <div className="project-title-group"><h3>{project.title}</h3><p>{project.subtitle}</p></div>
        <p className="project-summary">{project.summary}</p>
        <div className="project-impact"><span className="impact-icon"><Check size={13} /></span>{project.impact}</div>
        <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="project-card__footer">
        <span className="project-index-caption">SELECTED WORK / {project.number}</span>
        <a href={projectUrl} target="_blank" rel="noreferrer" aria-label={`${projectLinkLabel} for ${project.title}`}>{projectLinkLabel} <ExternalArrow /></a>
      </div>
    </motion.article>
  )
}

function WorkSection({ reduce }) {
  return (
    <section className="section section-work section-shell" id="work">
      <SectionHeading index="02" eyebrow="Selected builds & experiments" title={<>A few things I’ve worked on<span className="accent-dot">.</span></>} detail="Projects from analytics, automation and applied AI. The emphasis is on the problem, the pipeline, and what the system makes possible." />
      <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} reduce={reduce} />)}</div>
      <div className="github-intro">
        <div><span className="eyebrow">THE LIVE FEED</span><h3>From the repo, <span>not the résumé.</span></h3><p>Public repositories are fetched directly from GitHub at page load. If the API is unavailable, selected projects above remain visible.</p></div>
        <span className="api-note"><span className="api-pulse" /> PUBLIC API / LIVE WHEN AVAILABLE</span>
      </div>
      <GitHubProjects />
    </section>
  )
}

function SkillSection({ reduce }) {
  return (
    <section className="section section-skills section-shell" id="skills">
      <SectionHeading index="03" eyebrow="Tools I reach for" title={<>A toolkit, not a checklist<span className="accent-dot">.</span></>} detail="Strong foundations, useful combinations, and an ongoing learning curve." />
      <div className="skill-bento">
        {skillGroups.map((group, index) => (
          <motion.article key={group.label} className={`skill-tile skill-tile--${group.span} skill-tile--${index + 1}`} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.06, ease }}>
            <div className="skill-tile__top"><span className="skill-serial">0{index + 1}</span><span className="skill-orb" /></div>
            <h3>{group.label}</h3><p>{group.description}</p>
            <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.article>
        ))}
        <motion.article className="skill-tile skill-tile--learning" initial={reduce ? false : { opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease }}>
          <Telescope size={23} strokeWidth={1.4} /><span className="eyebrow">CURRENT MINDSET</span><h3>Learn it.<br />Try it. Improve it.</h3><p>Databricks, Spark fundamentals, stronger AI evaluation, and better ways to build reliable systems.</p><span className="learning-stamp">IN PROGRESS <ArrowUpRight size={13} /></span>
        </motion.article>
      </div>
      <div className="certs-block">
        <div className="certs-heading"><div><span className="eyebrow">Proof of learning</span><h3>Certifications <span className="accent-dot">.</span></h3></div><span className="mono-label">04 RECORDS</span></div>
        <div className="cert-list">{certifications.map((cert, index) => <motion.div className="cert-row" key={cert.name} initial={reduce ? false : { opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: reduce ? 0 : index * 0.05 }}><span className="cert-index">0{index + 1}</span><div className="cert-name"><strong>{cert.name}</strong><span>{cert.provider}</span></div><span className="cert-year">{cert.year}</span><Check size={15} className="cert-check" /></motion.div>)}</div>
      </div>
    </section>
  )
}

function JourneySection({ reduce }) {
  const timeline = experience
  return (
    <section className="section section-journey section-shell" id="journey">
      <div className="journey-heading"><div><span className="eyebrow">A few coordinates</span><h2>How I got here<span className="accent-dot">.</span></h2></div><span className="journey-side-note">WORK / EDUCATION / CONTEXT</span></div>
      <div className="timeline">
        {timeline.map((item, index) => <motion.article className="timeline-item" key={`${item.org}-${item.period}`} initial={reduce ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.04, ease }}>
          <div className="timeline-marker">{item.type === 'experience' ? <BriefcaseBusiness size={16} /> : <GraduationCap size={16} />}</div>
          <div className="timeline-date">{item.period}</div>
          <div className="timeline-content"><h3>{item.title}</h3><div className="timeline-org">{item.org}<span> / </span>{item.location}</div>{item.summary ? <p>{item.summary}</p> : null}{item.details.length ? <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}</div>
          <span className="timeline-type">{item.type === 'experience' ? 'EXPERIENCE' : 'EDUCATION'}</span>
        </motion.article>)}
      </div>
    </section>
  )
}

function FieldNotesSection({ reduce }) {
  return (
    <section className="section section-fieldnotes section-shell" id="field-notes">
      <SectionHeading index="04" eyebrow="Out of office, into the world" title={<>There’s a whole world outside the tab<span className="accent-dot">.</span></>} detail="Travel, hikes, photographs, and collecting small moments. This space is meant to grow with the places I visit and the frames I bring back." />
      <div className="field-note-disclaimer"><span className="tiny-diamond" /> Sample imagery for layout only — replace with original photographs before publishing.</div>
      <div className="field-notes-grid">
        {fieldNotes.map((note, index) => <motion.article className={`field-card field-card--${note.shape} field-card--${index + 1}`} key={note.id} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: reduce ? 0 : index * 0.1, ease }}>
          <div className="field-image"><img src={note.image} alt={note.alt} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} /><div className="field-image__scrim" /><span className="field-image__index">FRAME / {note.id}</span><span className="field-image__sample">SAMPLE FRAME</span><span className="field-image__arrow"><ArrowUpRight size={20} /></span></div>
          <div className="field-meta"><span>{note.place}</span><span>0{index + 1} / 03</span></div><h3>{note.title}</h3><p>{note.caption}</p>
        </motion.article>)}
      </div>
      <div className="field-note-end"><div className="field-note-end__icon"><Compass size={21} strokeWidth={1.4} /></div><div><span className="eyebrow">THE NEXT CHAPTER</span><h3>The best stories are still unwritten.</h3><p>When the photos are yours, swap them in under <code>src/data/portfolio.js</code> or the <code>public/images</code> folder.</p></div><a className="round-link" href={`mailto:${profile.email}?subject=${encodeURIComponent('Let’s swap travel notes')}`} aria-label="Email Chinmay to exchange travel notes"><ArrowUpRight size={19} /></a></div>
    </section>
  )
}

function ContactSection({ reduce }) {
  const socials = [
    { name: 'GitHub', value: `@${profile.githubUsername}`, href: profile.githubUrl, icon: Github },
    ...(profile.linkedinUrl ? [{ name: 'LinkedIn', value: 'Connect professionally', href: profile.linkedinUrl, icon: Linkedin }] : []),
    { name: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  ]
  return (
    <section className="section section-contact section-shell" id="contact">
      <div className="contact-topline"><span className="eyebrow">05 / THE OPEN CHANNEL</span><span className="availability"><i /> OPEN TO A GOOD CONVERSATION</span></div>
      <motion.div className="contact-main" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease }}>
        <p className="contact-pretitle">Have a question, an idea, or a problem worth untangling?</p>
        <h2>Let’s make<br /><span>something useful.</span></h2>
        <a className="contact-email" href={`mailto:${profile.email}`}><span>{profile.email}</span><span className="contact-email-icon"><ArrowUpRight size={24} /></span></a>
      </motion.div>
      <div className="contact-bottom">
        <div className="contact-socials">{socials.map((social) => { const Icon = social.icon; return <a key={social.name} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined}><Icon size={17} /><span><small>{social.name}</small><strong>{social.value}</strong></span><ExternalArrow /></a> })}</div>
        <a className="back-to-top" href="#top" onClick={(event) => { event.preventDefault(); document.getElementById('top')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }) }}>Back to top <ArrowLeft size={15} /></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-brand"><span className="brand-mark">c<span>.</span></span><span>CHINMAY CHAUDHARI</span></div>
      <div className="footer-middle"><span>BUILT WITH CURIOSITY</span><span className="footer-dot">✳</span><span>DEPLOYED WITH CARE</span></div>
      <div className="footer-meta"><span>© {new Date().getFullYear()} CHINMAY</span><a href={profile.githubUrl} target="_blank" rel="noreferrer">ItsChinuCr7 <ExternalArrow /></a></div>
    </footer>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const activeSection = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', Boolean(reduce))
  }, [reduce])

  return (
    <div className="app-root">
      <Navigation activeSection={activeSection} progress={progress} />
      <main>
        <Hero reduce={reduce} />
        <Marquee />
        <AboutSection reduce={reduce} />
        <WorkSection reduce={reduce} />
        <SkillSection reduce={reduce} />
        <JourneySection reduce={reduce} />
        <FieldNotesSection reduce={reduce} />
        <ContactSection reduce={reduce} />
      </main>
      <Footer />
      <div className="site-grain" aria-hidden="true" />
    </div>
  )
}
