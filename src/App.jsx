import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Linkedin, Github, Mail, Youtube, Download, ArrowUpRight, ArrowRight,
  Award, Sun, Moon, Sparkles, Play, Maximize2, MapPin, BookOpen, Plane, Copy, Volume2, VolumeX
} from 'lucide-react';
import {
  PERSONAL_INFO, NOW, ABOUT, SKILLS, EDUCATION, EXPERIENCE, PROJECTS, RESEARCH
} from './data.js';
import { BLOGS, TRIPS, VIDEOS } from './personal.js';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'connect', label: 'Connect' }
];

const safeStorage = {
  get: (k) => { try { return window.localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { window.localStorage.setItem(k, v); } catch { /* ignore */ } }
};

/* ---------- hooks ---------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = safeStorage.get('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    safeStorage.set('portfolio-theme', theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

function useTypewriter(words) {
  const [text, setText] = useState('');
  useEffect(() => {
    let w = 0, c = 0, deleting = false, timer;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      setText(word.slice(0, c));
      let delay = deleting ? 40 : 90;
      if (!deleting && c === word.length) { deleting = true; delay = 1600; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

function useClock(timeZone) {
  const fmt = () => new Date().toLocaleTimeString('en-IN', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

/* ---------- ambient background ---------- */

function NetworkBG() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let w, h, dpr, nodes = [], raf, frame = 0, color = '194,65,12';
    const mouse = { x: -999, y: -999 };

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().replace('#', '');
      if (hex.length === 6) color = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',');
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 20000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25
      }));
    };
    const draw = () => {
      if (frame++ % 90 === 0) readColor();
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(${color},${(1 - d / 140) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 180) {
          ctx.strokeStyle = `rgba(${color},${(1 - md / 180) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${color},0.55)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onMove = (e) => {
      const zf = canvas.getBoundingClientRect().width / canvas.clientWidth || 1;
      mouse.x = e.clientX / zf; mouse.y = e.clientY / zf;
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };

    readColor(); resize(); draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <canvas ref={ref} className="net-bg" aria-hidden="true" />
    </>
  );
}

function useClickRipple() {
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest('.btn, .nav-link, .pill-link, .tab, .icon-btn, .email-big');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const dot = document.createElement('span');
      dot.className = 'ripple';
      dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      el.appendChild(dot);
      setTimeout(() => dot.remove(), 650);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

/* ---------- click sound ---------- */

function useClickSound() {
  const [on, setOn] = useState(() => safeStorage.get('portfolio-sound') !== 'off');
  const ctxRef = useRef(null);
  const lastRef = useRef(0);
  const onRef = useRef(on);
  onRef.current = on;

  useEffect(() => { safeStorage.set('portfolio-sound', on ? 'on' : 'off'); }, [on]);

  useEffect(() => {
    const click = () => {
      if (!onRef.current) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = ctxRef.current || (ctxRef.current = new AC());
        if (ctx.state === 'suspended') ctx.resume();
        const t = ctx.currentTime;
        if (t - lastRef.current < 0.09) return;
        lastRef.current = t;
        // soft, warm "thock": a mid-low tone with a gentle drop, rounded by a low-pass
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.1);
        filter.type = 'lowpass';
        filter.frequency.value = 1500;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        osc.connect(filter).connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.17);
      } catch { /* audio unavailable */ }
    };
    document.addEventListener('pointerdown', click);
    return () => document.removeEventListener('pointerdown', click);
  }, []);

  return [on, () => setOn((v) => !v)];
}

/* ---------- small pieces ---------- */

const Tag = ({ children }) => <span className="tag">{children}</span>;

const Heading = ({ eyebrow, title }) => (
  <div className="reveal">
    <div className="eyebrow mono">{eyebrow}</div>
    <h2 className="title">{title}</h2>
  </div>
);

const ThemeToggle = ({ theme, onToggle }) => (
  <button className="icon-btn" onClick={onToggle} aria-label="Toggle theme" title="Toggle theme">
    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
  </button>
);

/* ---------- portrait carousel ---------- */

function PortraitCarousel() {
  const slides = PERSONAL_INFO.gallery;
  const [i, setI] = useState(0);
  const next = () => setI((n) => (n + 1) % slides.length);
  return (
    <div className="frame">
      <div className="frame-inner">
        {slides.map((p, n) => (
          <img key={p.src} src={p.src} alt={n === i ? `${PERSONAL_INFO.name} - ${p.caption}` : ''} aria-hidden={n !== i}
            className={`slide ${n === i ? 'on' : ''}`} style={{ objectPosition: p.pos }} loading={n < 2 ? 'eager' : 'lazy'} />
        ))}
        <div className="frame-shade" />
        <div className="frame-caption mono" key={`c${i}`}>{slides[i].caption}</div>
        <div className="frame-bar"><i key={`b${i}`} onAnimationEnd={next} /></div>
      </div>
      <div className="frame-dots">
        {slides.map((p, n) => (
          <button key={p.src} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}: ${p.caption}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------- navigation ---------- */

function Nav({ view, active, goSection, goPersonal, theme, toggleTheme, sound, toggleSound }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (fn) => () => { setOpen(false); fn(); };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <button className="brand" onClick={go(() => goSection('top'))} style={{ background: 'none', border: 0 }}>
          <span>vk<b>.</b></span>
          <small className="mono">/ {view === 'personal' ? 'personal' : 'portfolio'}</small>
        </button>

        <nav className="nav-links">
          {SECTIONS.map((s) => (
            <button key={s.id} className={`nav-link ${view === 'home' && active === s.id ? 'active' : ''}`} onClick={() => goSection(s.id)}>
              {s.label}
            </button>
          ))}
          <button className={`pill-link ${view === 'personal' ? 'active' : ''}`} onClick={goPersonal}>
            <Sparkles size={14} /> Personal
          </button>
          <button className="icon-btn" onClick={toggleSound} aria-label={sound ? 'Mute click sound' : 'Unmute click sound'} title={sound ? 'Sound on' : 'Sound off'}>
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </nav>

        <div className="menu-btn" style={{ alignItems: 'center' }}>
          <button className="icon-btn" onClick={toggleSound} aria-label={sound ? 'Mute click sound' : 'Unmute click sound'} title={sound ? 'Sound on' : 'Sound off'}>
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button className="icon-btn" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={go(() => goSection(s.id))}>{s.label}</button>
          ))}
          <button onClick={go(goPersonal)} style={{ color: 'var(--accent)' }}>✦ Personal</button>
        </div>
      )}
    </header>
  );
}

/* ---------- home sections ---------- */

function Hero({ goSection, copyEmail, onResume }) {
  const role = useTypewriter(PERSONAL_INFO.roles);
  const time = useClock(PERSONAL_INFO.timeZone);

  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="status mono reveal">
            <span className="dot" /> Open to collaborations · {PERSONAL_INFO.location.split(',')[0]} {time}
          </div>
          <h1 className="reveal">Namaste, I'm <em>{PERSONAL_INFO.name}</em>.</h1>
          <div className="role-line reveal">I'm a <span>{role}</span></div>
          <p className="intro reveal">{PERSONAL_INFO.intro}</p>
          <div className="btns reveal">
            <button className="btn primary" onClick={() => goSection('work')}>View work <ArrowRight size={16} /></button>
            <button className="btn" onClick={onResume}><Download size={16} /> Resume</button>
            <button className="btn" onClick={() => goSection('connect')}><Mail size={16} /> Connect</button>
          </div>
          <div className="hint reveal">Press <kbd>C</kbd> to copy my email · scroll to explore ↓</div>
        </div>

        <div className="portrait reveal">
          <PortraitCarousel />
          <div className="now-card">
            <span className="mono">Now</span>
            Data Scientist @ Applied Materials
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="block">
      <div className="wrap">
        <Heading eyebrow="01 — About" title="Where research curiosity meets industry execution." />
        <div className="about-grid">
          <div className="about-text reveal">
            {ABOUT.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="now-list">
              {NOW.map((n) => (
                <li key={n.label}><span>{n.label}</span><span>{n.value}</span></li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <p className="sub mono">Education</p>
            {EDUCATION.map((e) => (
              <div className="edu" key={e.school}>
                <h4>{e.school}</h4>
                <p>{e.degree}</p>
                <p className="mono" style={{ fontSize: '0.75rem' }}>{e.year}</p>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="skills">
          {SKILLS.map((g) => (
            <div className="skill-group reveal" key={g.group}>
              <p className="sub mono">{g.group}</p>
              <div className="tags">{g.items.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const full = EXPERIENCE.filter((e) => e.type === 'Full Time');
  const part = EXPERIENCE.filter((e) => e.type !== 'Full Time');
  return (
    <section id="work" className="block">
      <div className="wrap">
        <Heading eyebrow="02 — Work Experience" title="Turning data into decisions with AI, ML and optimization." />
        <div className="work-grid">
          <div>
            <p className="sub mono reveal">Full-time experience</p>
            <div className="timeline">
              {full.map((e) => (
                <div className="tl-item reveal" key={e.company + e.period}>
                  <div className="tl-when mono">{e.period}</div>
                  <div>
                    <h3>{e.role}</h3>
                    <div className="tl-co">{e.company}</div>
                    <ul>{e.desc.map((d, i) => <li key={i}>{d}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="parttime reveal">
            <p className="sub mono">Part-time &amp; side roles</p>
            {part.map((e) => (
              <div className="pt-item" key={e.company + e.period}>
                <div className="tl-when mono">{e.period}</div>
                <h4>{e.role}</h4>
                <div className="tl-co">{e.company}</div>
                <ul>{e.desc.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="block">
      <div className="wrap">
        <Heading eyebrow="03 — Projects" title="Things I've built in AI, ML and optimization." />
        <div className="grid projects">
          {PROJECTS.map((p) => {
            const Wrapper = p.link ? 'a' : 'div';
            const props = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {};
            return (
              <Wrapper className="card reveal" key={p.title} {...props}>
                <div className="card-top">
                  <h3>{p.title}</h3>
                  {p.link ? <span className="arrow"><ArrowUpRight size={20} /></span> : <span className="soon mono">soon…</span>}
                </div>
                <div className="subtitle mono">{p.subtitle}</div>
                {p.highlight && <div className="badge-award"><Award size={13} /> {p.highlight}</div>}
                <ul>{p.desc.map((d, i) => <li key={i}>{d}</li>)}</ul>
                <div className="tags">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Research({ onZoom }) {
  return (
    <section id="research" className="block">
      <div className="wrap">
        <Heading eyebrow="04 — Research" title="Papers, talks and the occasional trophy." />
        <div className="grid research">
          {RESEARCH.map((r) => (
            <article className="card r-card reveal" key={r.title}>
              <button className="r-img" onClick={() => onZoom(r.image)} aria-label={`Enlarge ${r.title}`}>
                <img src={r.image} alt={r.title} loading="lazy" />
              </button>
              <div className="r-body">
                <div className="r-meta mono">{r.type} · {r.status}</div>
                <h3>{r.title}</h3>
                {r.people && <div className="r-people">{r.people}</div>}
                {r.award && <div className="badge-award"><Award size={13} /> {r.award}</div>}
                <p className={r.caption ? 'no-grow' : ''}>{r.desc}</p>
                {r.caption && <p className="r-caption" dangerouslySetInnerHTML={{ __html: r.caption }} />}
                {r.link
                  ? <a className="r-link" href={r.link} target="_blank" rel="noreferrer">Read more <ArrowUpRight size={14} /></a>
                  : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Connect({ copyEmail }) {
  const { social, email } = PERSONAL_INFO;
  return (
    <section id="connect" className="block connect">
      <div className="wrap">
        <div className="eyebrow mono reveal" style={{ justifyContent: 'center' }}>05 — Connect</div>
        <h2 className="reveal">Let's talk. :)</h2>
        <p className="reveal">Open to new opportunities, research collaborations, or just a friendly hi - my inbox is always open.</p>
        <div className="reveal">
          <button className="email-big" onClick={copyEmail} title="Click to copy">{email}</button>
        </div>
        <div className="socials reveal">
          <a className="btn" href={`mailto:${email}`}><Mail size={16} /> Email</a>
          <a className="btn" href={social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          <a className="btn" href={social.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          <a className="btn" href={social.youtube} target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- personal page ---------- */

function BlogModal({ blog, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={16} /></button>
        <img className="cover" src={blog.image} alt="" />
        <div className="modal-body">
          <h2>{blog.title}</h2>
          <span className="meta mono">{blog.year} · Blog</span>
          {blog.body.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
        </div>
      </div>
    </div>
  );
}

function Personal() {
  const [tab, setTab] = useState('blogs');
  const [blog, setBlog] = useState(null);
  useReveal([tab]);

  const tabs = [
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'trips', label: 'Trips', icon: Plane },
    { id: 'youtube', label: 'YouTube', icon: Youtube }
  ];

  return (
    <main key="personal" className="personal view">
      <div className="wrap">
        <div className="eyebrow mono">Off the clock</div>
        <h1>The personal side.</h1>
        <p className="lead">Stories, travels and videos - the stuff that doesn't fit on a resume, but says more about me than one.</p>

        <div className="tabs" role="tablist">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'blogs' && (
          <div className="grid three swap">
            {BLOGS.map((b) => (
              <button className="media reveal" key={b.id} onClick={() => setBlog(b)}>
                <div className="thumb"><img src={b.image} alt="" loading="lazy" /></div>
                <div className="info">
                  <span className="meta mono">{b.year} · Read</span>
                  <h3>{b.title}</h3>
                  <p>{b.summary}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === 'trips' && (
          <div className="swap">
            <div className="grid three">
              {TRIPS.map((t) => (
                <div className="media trip reveal" key={t.place}>
                  <div className="thumb"><img src={t.image} alt={t.place} loading="lazy" /></div>
                  <div className="info">
                    <span className="meta mono"><MapPin size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {t.when}</span>
                    <h3>{t.place}</h3>
                    <p>{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="trip-note reveal">More travel stories and photos are on the way. ✈️</p>
          </div>
        )}

        {tab === 'youtube' && (
          <div className="swap">
            <div className="yt-head reveal">
              <img src="./img/yt_pfp.png" alt="" />
              <div>
                <h3>@karnavivek</h3>
                <p>Video essays and podcasts to help students see the bigger picture.</p>
              </div>
              <a className="btn" style={{ marginLeft: 'auto' }} href={PERSONAL_INFO.social.youtube} target="_blank" rel="noreferrer">
                Subscribe <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="grid two">
              {VIDEOS.map((v) => (
                <a className="media reveal" key={v.link} href={v.link} target="_blank" rel="noreferrer">
                  <div className="thumb">
                    <img src={v.image} alt="" loading="lazy" />
                    <div className="play"><span><Play size={20} fill="currentColor" /></span></div>
                  </div>
                  <div className="info">
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {blog && <BlogModal blog={blog} onClose={() => setBlog(null)} />}
    </main>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [view, setView] = useState(() => (window.location.hash === '#/personal' ? 'personal' : 'home'));
  const [active, setActive] = useState('about');
  const [zoom, setZoom] = useState(null);
  const [toast, setToast] = useState(null);
  const pending = useRef(null);
  const progress = useRef(null);

  useReveal([view]);
  useClickRipple();
  const [sound, toggleSound] = useClickSound();

  const showToast = useCallback((msg, ms = 1800) => {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      showToast('Email copied ✓');
    } catch {
      showToast(PERSONAL_INFO.email);
    }
  }, [showToast]);

  // hash routing for the personal tab
  useEffect(() => {
    const onHash = () => setView(window.location.hash === '#/personal' ? 'personal' : 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const scrollToId = (id) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      el.classList.remove('landed');
      void el.offsetWidth;
      el.classList.add('landed');
    }, 450);
  };

  const goSection = (id) => {
    if (view === 'personal') {
      pending.current = id;
      window.location.hash = '';
    } else {
      scrollToId(id);
    }
  };

  const goPersonal = () => {
    window.scrollTo({ top: 0 });
    window.location.hash = '/personal';
  };

  // after switching back to home, run the queued scroll; reset scroll when entering personal
  useEffect(() => {
    if (view === 'home' && pending.current) {
      const id = pending.current;
      pending.current = null;
      setTimeout(() => scrollToId(id), 60);
    }
    if (view === 'personal') window.scrollTo({ top: 0 });
  }, [view]);

  // scrollspy + progress bar
  useEffect(() => {
    if (view !== 'home') return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); el && io.observe(el); });
    return () => io.disconnect();
  }, [view]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // keyboard: C copies email, Esc closes lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(null);
      const tag = e.target.tagName;
      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey && !e.altKey && tag !== 'INPUT' && tag !== 'TEXTAREA') copyEmail();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [copyEmail]);

  return (
    <>
      <NetworkBG />
      <div className="progress" ref={progress} />
      <Nav view={view} active={active} goSection={goSection} goPersonal={goPersonal} theme={theme} toggleTheme={toggleTheme} sound={sound} toggleSound={toggleSound} />

      {view === 'home' ? (
        <main key="home" className="view">
          <Hero goSection={goSection} copyEmail={copyEmail} onResume={() => showToast('Please contact for resume :)', 3200)} />
          <About />
          <Work />
          <Projects />
          <Research onZoom={setZoom} />
          <Connect copyEmail={copyEmail} />
        </main>
      ) : (
        <Personal />
      )}

      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Vivek Karna</span>
          <span className="mono">Built with React · Chennai, India</span>
        </div>
      </footer>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)}>
          <img src={zoom} alt="Enlarged view" />
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
