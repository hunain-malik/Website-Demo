import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container nav-inner">
        <a href="#" className="brand">
          <motion.span
            className="brand-mark"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          />
          AETHER
        </a>
        <div className="nav-links">
          <a href="#tech">Technology</a>
          <a href="#features">Features</a>
          <a href="#specs">Specs</a>
        </div>
        <button className="nav-cta">Reserve</button>
      </div>
    </motion.nav>
  )
}

function WatchVisual() {
  const ticks = Array.from({ length: 60 })
  return (
    <div className="watch-stage">
      <motion.div
        className="watch-glow"
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="watch-orbit"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="watch-orbit inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="watch"
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="watch-bezel" />
        <div className="watch-face">
          <motion.div
            className="watch-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="watch-ticks">
            {ticks.map((_, i) => (
              <span
                key={i}
                style={{
                  transform: `translateX(-50%) rotate(${i * 6}deg)`,
                  transformOrigin: '50% 50vw',
                  opacity: i % 5 === 0 ? 1 : 0.3,
                  height: i % 5 === 0 ? '12px' : '6px',
                }}
              />
            ))}
          </div>
          <motion.div
            className="watch-time"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            ∞ : ∞
          </motion.div>
          <div className="watch-pulse">
            <svg viewBox="0 0 100 14" preserveAspectRatio="none">
              <motion.path
                d="M0 7 L20 7 L25 2 L30 12 L35 4 L40 10 L45 7 L100 7"
                fill="none"
                stroke="#00e7ff"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              />
            </svg>
          </div>
          <motion.div
            className="watch-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Aetheric Core™
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="dot" />
            Introducing AETHER · Series One
          </motion.span>
          <motion.h1 className="hero-headline" variants={fadeUp}>
            A battery <br />
            that <span className="accent-word">never dies</span>.
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>
            AETHER is the first smartwatch you'll never charge again. Powered by
            Aetheric Core™ — a self-sustaining cell that draws energy from
            ambient motion, light, and body heat.
          </motion.p>
          <motion.div className="hero-ctas" variants={fadeUp}>
            <button className="btn btn-primary">
              Reserve yours
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn btn-ghost">Watch the film</button>
          </motion.div>

          <motion.div className="hero-stats" variants={fadeUp}>
            <div>
              <div className="stat-num">∞</div>
              <div className="stat-label">Battery life</div>
            </div>
            <div>
              <div className="stat-num">0g</div>
              <div className="stat-label">Charging cable</div>
            </div>
            <div>
              <div className="stat-num">38g</div>
              <div className="stat-label">Total weight</div>
            </div>
          </motion.div>
        </motion.div>

        <WatchVisual />
      </div>
    </section>
  )
}

function ForeverSection() {
  return (
    <section className="section" id="tech">
      <div className="container forever">
        <motion.div
          className="forever-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="infinity-svg" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c5cff" />
                <stop offset="50%" stopColor="#00e7ff" />
                <stop offset="100%" stopColor="#ff5cf0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M40 50 C40 20, 80 20, 100 50 C120 80, 160 80, 160 50 C160 20, 120 20, 100 50 C80 80, 40 80, 40 50 Z"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="forever-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="dot" />
            Aetheric Core™
          </motion.span>
          <motion.h3 variants={fadeUp}>
            Energy from everything you do.
          </motion.h3>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-dim)', fontSize: '17px', lineHeight: 1.6 }}>
            We didn't make a bigger battery. We made the cable obsolete. AETHER
            harvests micro-currents from kinetic, thermal, and photonic sources
            — continuously, silently, indefinitely.
          </motion.p>

          <motion.ul className="forever-bullets" variants={stagger}>
            {[
              'Kinetic harvesting from natural wrist movement',
              'Thermo-electric conversion of body heat',
              'Ambient-light photovoltaic accent layer',
              'Solid-state cell rated for 25+ years',
            ].map((t) => (
              <motion.li key={t} variants={fadeUp}>
                <span className="check">✓</span>
                <span>{t}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}

const features = [
  {
    title: 'Aetheric Core™',
    body: 'Proprietary self-charging cell. Eliminates the charger entirely without compromise on power.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    title: 'Pulse Engine',
    body: 'Medical-grade ECG and SpO2, with continuous arrhythmia detection — accurate to 0.4 BPM.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l2-7 4 14 2-7h6" />
      </svg>
    ),
  },
  {
    title: 'Sapphire Halo',
    body: 'A single-piece sapphire crystal display — virtually unscratchable, edge-to-edge clarity.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6 2 18 2 22 8 12 22 2 8" />
      </svg>
    ),
  },
  {
    title: 'Always-On',
    body: 'A truly always-on display, with no battery anxiety. The face never sleeps because it never has to.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    title: 'Hydroseal 200',
    body: 'Rated to 200 meters. Engineered for free-divers, sailors, and the people who love rain.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12z" />
      </svg>
    ),
  },
  {
    title: 'Quiet OS',
    body: 'A focused operating system that surfaces only what matters. No notifications, just signal.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 10h6M9 14h4" />
      </svg>
    ),
  },
]

function FeatureCard({ f, i }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <motion.div
      ref={ref}
      className="feature-card"
      onMouseMove={onMove}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div>
        <div className="feature-icon">{f.icon}</div>
        <h4>{f.title}</h4>
        <p>{f.body}</p>
      </div>
    </motion.div>
  )
}

function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" />
            Built different
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            The details, in detail.
          </motion.h2>
          <motion.p
            className="section-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Six engineering decisions that compound into something that doesn't
            just feel premium — it behaves that way.
          </motion.p>
        </div>

        <motion.div
          className="feature-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const specs = [
  { k: 'Battery', v: '∞' },
  { k: 'Display', v: '1.78″ Sapphire' },
  { k: 'Weight', v: '38 g' },
  { k: 'Water', v: '200 m' },
  { k: 'Materials', v: 'Grade-5 Ti' },
  { k: 'Sensors', v: '14' },
  { k: 'Connectivity', v: 'LTE · BT 5.4' },
  { k: 'Warranty', v: '25 years' },
]

function Specs() {
  return (
    <section className="section" id="specs">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Specs.
          </motion.h2>
        </div>

        <motion.div
          className="specs-wrap"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {specs.map((s) => (
            <motion.div className="spec" key={s.k} variants={fadeUp}>
              <span className="spec-key">{s.k}</span>
              <span className="spec-val">{s.v}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="container">
      <motion.div
        className="cta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>Time, untethered.</h2>
        <p>Reservations open now. Ships globally — without a charger in the box.</p>
        <button className="btn btn-primary" style={{ margin: '0 auto' }}>
          Reserve AETHER
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="container footer">
      <span>© {new Date().getFullYear()} AETHER. Powered by Aetheric Core™.</span>
      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Press</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <ForeverSection />
      <Features />
      <Specs />
      <CTA />
      <Footer />
    </div>
  )
}
