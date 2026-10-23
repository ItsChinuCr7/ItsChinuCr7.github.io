import { motion, useReducedMotion } from 'framer-motion'

export default function SectionHeading({ index, eyebrow, title, detail, accent = false }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="section-heading"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-heading__kicker">
        <span className="section-index">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="section-heading__main">
        <h2>{title}{accent ? <span className="accent-dot">.</span> : null}</h2>
        {detail ? <p>{detail}</p> : null}
      </div>
    </motion.div>
  )
}
