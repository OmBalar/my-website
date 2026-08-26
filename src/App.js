import React, { useEffect, useRef, useState, useCallback } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "./App.css";
import SkillGraph from "./SkillGraph";
import {
  heroRoles,
  about,
  stats,
  experience,
  flagshipProject,
  featuredProjects,
  projects,
  skills,
  education,
  links,
} from "./data";

/* ---------- Hooks ---------- */

function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target, duration = 1600, start = false, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const factor = Math.pow(10, decimals);
    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target * factor) / factor);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, decimals]);
  return value;
}

/* ---------- Particle background ---------- */

function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles = [];
    let raf;
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(Math.floor((w * h) / 16000), 110);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: null, y: null };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const LINK = 130;
      const m = mouse.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // gentle attraction toward cursor
        if (m.x !== null) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200 && dist > 0.001) {
            p.x += (dx / dist) * 0.25;
            p.y += (dy / dist) * 0.25;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(125, 211, 252, 0.55)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.14 * (1 - dist / LINK)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

/* ---------- Small components ---------- */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

function StatCard({ stat, started }) {
  const decimals = stat.decimals || 0;
  const animated = useCountUp(stat.value, 1600, started, decimals);
  return (
    <div className="stat-card">
      <span className="stat-value">
        {animated.toFixed(decimals)}
        <span className="stat-suffix">{stat.suffix}</span>
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

function Stats() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="stats-grid reveal" ref={ref}>
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} started={started} />
      ))}
    </div>
  );
}

function TiltCard({ children, className, id }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
    el.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
  }, []);
  const onLeave = useCallback(() => {
    ref.current.style.transform = "";
  }, []);
  return (
    <div ref={ref} id={id} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function ScreenshotCarousel({ screenshots }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, screenshots.length]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-frame">
        {screenshots.map((shot, i) => (
          <img
            key={shot.caption}
            src={shot.src}
            alt={shot.caption}
            className={`carousel-img ${i === index ? "visible" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <p className="carousel-caption">{screenshots[index].caption}</p>
      <div className="carousel-dots">
        {screenshots.map((shot, i) => (
          <button
            key={shot.caption}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            aria-label={`Show screenshot ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "";
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <a
        href="#top"
        className="nav-logo"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          setMenuOpen(false);
        }}
      >
        <span className="logo-bracket">&lt;</span>OB<span className="logo-bracket">/&gt;</span>
      </a>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV_SECTIONS.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
            onClick={(e) => go(e, id)}
          >
            <span className="nav-index">0{i + 1}.</span> {label}
          </a>
        ))}
        <a
          className="nav-cta"
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <a className="nav-cta nav-cta-solid" href={`mailto:${links.email}`}>
          Hire Me
        </a>
      </nav>
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero() {
  const typed = useTypewriter(heroRoles);
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="hero-eyebrow">Hi, my name is</p>
        <h1 className="hero-name">Om Balar<span className="accent-dot">.</span></h1>
        <h2 className="hero-typed">
          {typed}
          <span className="cursor-blink">|</span>
        </h2>
        <p className="hero-sub">
          Computer Engineering student at Toronto Metropolitan University with{" "}
          <strong>20 months</strong> of experience shipping production software.
          <br />
          Seeking <strong>New Grad Software Engineering</strong> roles for <strong>2027</strong>.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View My Work
          </a>
          <a className="btn btn-ghost" href={`mailto:${links.email}`}>
            Get In Touch
          </a>
        </div>
        <div className="hero-terminal reveal revealed">
          <div className="terminal-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">om@portfolio: zsh</span>
          </div>
          <div className="terminal-body">
            <p>
              <span className="prompt">$</span> whoami
            </p>
            <p className="terminal-out">engineer · builder · lifelong learner</p>
            <p>
              <span className="prompt">$</span> gpa --cumulative
            </p>
            <p className="terminal-out">4.29 / 4.33 (Dean's List)</p>
            <p>
              <span className="prompt">$</span> status --availability
            </p>
            <p className="terminal-out terminal-green">● open to New Grad SWE roles for Summer 2027</p>
          </div>
        </div>
      </div>
      <a
        className="scroll-hint"
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to about section"
      >
        <span className="mouse-icon">
          <span className="mouse-wheel" />
        </span>
      </a>
    </section>
  );
}

function SectionHeading({ index, title }) {
  return (
    <h2 className="section-heading reveal">
      <span className="section-index">{index}.</span> {title}
      <span className="heading-line" />
    </h2>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionHeading index="01" title="About Me" />
      <div className="about-grid">
        <div className="about-text reveal">
          <p>{about.intro}</p>
          <p>{about.focus}</p>
          <p className="about-seeking">{about.seeking}</p>
        </div>
        <Stats />
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading index="02" title="Where I've Worked" />
      <div className="timeline">
        {experience.map((job) => (
          <div className="timeline-item reveal" key={job.company + job.period} id={job.slug}>
            <div className="timeline-marker" />
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3>
                    {job.role} <span className="at-company">@ {job.company}</span>
                  </h3>
                  <p className="timeline-period">
                    {job.period} <span className="period-tag">{job.tag}</span>
                  </p>
                </div>
              </div>
              <ul className="timeline-points">
                {job.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div className="tech-tags">
                {job.tech.map((t) => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading index="03" title="Things I've Built" />

      <div className="flagship-card reveal" id={flagshipProject.slug}>
        <div className="flagship-text">
          <div className="featured-label">Flagship Project</div>
          <div className="featured-top">
            <h3>{flagshipProject.title}</h3>
            <a
              href={flagshipProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {flagshipProject.linkLabel} <ArrowOutwardIcon fontSize="small" />
            </a>
          </div>
          <p className="featured-subtitle">{flagshipProject.subtitle}</p>
          <p className="featured-desc">{flagshipProject.description}</p>
          <div className="flagship-highlights">
            {flagshipProject.highlights.map((h) => (
              <span className="featured-highlight" key={h}>
                {h}
              </span>
            ))}
          </div>
          <div className="tech-tags">
            {flagshipProject.tech.map((t) => (
              <span className="tech-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <ScreenshotCarousel screenshots={flagshipProject.screenshots} />
      </div>

      <div className="featured-projects">
        {featuredProjects.map((p) => (
          <TiltCard className="featured-card reveal" key={p.title} id={p.slug}>
            <div className="featured-label">Featured Project</div>
            <div className="featured-top">
              <h3>{p.title}</h3>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  {p.linkLabel} <ArrowOutwardIcon fontSize="small" />
                </a>
              )}
            </div>
            <p className="featured-subtitle">{p.subtitle}</p>
            <p className="featured-desc">{p.description}</p>
            <p className="featured-highlight">{p.highlight}</p>
            <div className="tech-tags">
              {p.tech.map((t) => (
                <span className="tech-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="project-grid">
        {projects.map((p) => (
          <TiltCard className="project-card reveal" key={p.title} id={p.slug}>
            <div className="project-card-top">
              <h4>{p.title}</h4>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="project-gh"
                >
                  <GitHubIcon fontSize="small" />
                </a>
              )}
            </div>
            <p>{p.description}</p>
            <div className="tech-tags">
              {p.tech.map((t) => (
                <span className="tech-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading index="04" title="Skills & Technologies" />
      <SkillGraph />
      <details className="skills-details reveal">
        <summary>View the full list</summary>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-group" key={group.category}>
              <h4>{group.category}</h4>
              <div className="tech-tags">
                {group.items.map((item) => (
                  <span className="tech-tag skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading index="05" title="Education" />
      <div className="education-card reveal" id="education-card">
        <div className="education-main">
          <h3>{education.degree}</h3>
          <p className="education-specialization">{education.specialization}</p>
          <p className="education-school">{education.school}</p>
          <p className="timeline-period">{education.period}</p>
          <p className="gpa-badge">{education.gpa}</p>
        </div>
        <div className="education-detail">
          <h4>Honors & Awards</h4>
          <ul className="honors-list">
            {education.honors.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h4 className="activities-heading">Relevant Coursework</h4>
          <div className="tech-tags">
            {education.coursework.map((c) => (
              <span className="tech-tag" key={c}>
                {c}
              </span>
            ))}
          </div>
          <h4 className="activities-heading">Beyond the Classroom</h4>
          {education.activities.map((a) => (
            <p className="activity" key={a.title}>
              <strong>{a.title}</strong>: {a.detail}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <p className="contact-eyebrow reveal">06. What's Next?</p>
      <h2 className="contact-title reveal">Let's Build Something Together</h2>
      <p className="contact-text reveal">
        I'm looking for a New Grad Software Engineering role starting Summer 2027: a team
        where I can ship meaningful software and keep growing as an engineer. If you think
        I'd be a good fit, my inbox is always open.
      </p>
      <a className="btn btn-primary btn-large reveal" href={`mailto:${links.email}`}>
        Say Hello
      </a>
      <div className="contact-icons reveal">
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon fontSize="large" />
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon fontSize="large" />
        </a>
        <a href={`mailto:${links.email}`} aria-label="Email">
          <EmailIcon fontSize="large" />
        </a>
      </div>
      <footer className="footer">
        <p>Designed & built by Om Balar</p>
      </footer>
    </section>
  );
}

/* ---------- App ---------- */

function App() {
  useReveal();
  return (
    <div className="App">
      <ParticleField />
      <ScrollProgress />
      <Navbar />
      <aside className="side-rail left">
        <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href={`mailto:${links.email}`} aria-label="Email">
          <EmailIcon />
        </a>
        <span className="rail-line" />
      </aside>
      <aside className="side-rail right">
        <a href={`mailto:${links.email}`} className="rail-email">
          {links.email}
        </a>
        <span className="rail-line" />
      </aside>
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;
