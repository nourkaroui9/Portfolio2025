"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Mail, Linkedin, GraduationCap, MapPin, ChevronDown, Award, Sparkles, Zap, Layers, Users, Eye, Cpu, Globe, Lightbulb, Trophy, FileText, Code2, Palette, BarChart3, Rocket } from "lucide-react";

/* ═══════════════════════════════════════════════
   NOUR KAROUI — PORTFOLIO V2
   2026 Trends: Kinetic type, Bento grid, 
   Exaggerated hierarchy, Micro-delight, 
   Custom cursor, Scroll-driven motion
   ═══════════════════════════════════════════════ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@200;300;400;500;600;700&family=Noto+Kufi+Arabic:wght@400;700&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

:root {
  --bg: #F5F0EB;
  --bg-warm: #EDE6DD;
  --cream: #FAF7F3;
  --ink: #1A1612;
  --ink-soft: #5C554D;
  --ink-muted: #8A8279;
  --terracotta: #C45C3C;
  --terracotta-light: #E8926F;
  --terracotta-deep: #9E3A20;
  --sand: #D4C5B2;
  --olive: #6B7355;
  --night: #1A1612;
  --night-soft: #2A2520;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--ink);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  cursor: none;
}

::selection { background: var(--terracotta); color: var(--cream); }

.serif { font-family: 'Instrument Serif', serif; }
.arabic { font-family: 'Noto Kufi Arabic', serif; }

/* ── CUSTOM CURSOR ── */
.cursor-dot {
  width: 8px; height: 8px;
  background: var(--terracotta);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
}
.cursor-ring {
  width: 36px; height: 36px;
  border: 1.5px solid var(--terracotta);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transition: all 0.15s ease-out;
  opacity: 0.5;
}
.cursor-ring.hovering {
  width: 56px; height: 56px;
  opacity: 1;
  border-color: var(--terracotta-light);
  background: rgba(196,92,60,0.06);
}

/* ── GRAIN OVERLAY ── */
@keyframes grain {
  0%, 100% { transform: translate(0,0); }
  10% { transform: translate(-5%,-10%); }
  50% { transform: translate(12%,9%); }
  90% { transform: translate(-1%,7%); }
}
.grain::before {
  content: '';
  position: fixed;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  animation: grain 8s steps(10) infinite;
}

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes slideRight { from { opacity:0; transform:translateX(-80px); } to { opacity:1; transform:translateX(0); } }
@keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }

.reveal { opacity:0; transform:translateY(45px); transition: all 0.85s cubic-bezier(0.22,1,0.36,1); }
.reveal.vis { opacity:1; transform:translateY(0); }
.rd1 { transition-delay:.12s; }
.rd2 { transition-delay:.24s; }
.rd3 { transition-delay:.36s; }
.rd4 { transition-delay:.48s; }
.rd5 { transition-delay:.60s; }
.rd6 { transition-delay:.72s; }

a { color: inherit; text-decoration: none; }

/* ── HOVER LINE ── */
.hline { position:relative; display:inline-block; }
.hline::after {
  content:''; position:absolute; bottom:-2px; left:0;
  width:100%; height:1.5px; background:var(--terracotta);
  transform:scaleX(0); transform-origin:right;
  transition:transform 0.4s cubic-bezier(0.22,1,0.36,1);
}
.hline:hover::after { transform:scaleX(1); transform-origin:left; }

/* ── TAG ── */
.tag {
  display:inline-flex; align-items:center; gap:6px;
  padding:7px 16px; border:1px solid var(--sand);
  border-radius:100px; font-size:13px; font-weight:400;
  color:var(--ink-soft); letter-spacing:0.02em;
  transition:all 0.3s ease; cursor:default;
}
.tag:hover { border-color:var(--terracotta); color:var(--terracotta); transform:translateY(-2px); }

/* ── BENTO CARD ── */
.bento {
  padding:28px; border-radius:16px;
  border:1px solid rgba(212,197,178,0.4);
  background:var(--cream);
  transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
  position:relative; overflow:hidden;
}
.bento:hover {
  border-color:var(--terracotta);
  transform:translateY(-4px);
  box-shadow: 0 20px 60px rgba(26,22,18,0.08);
}
.bento::before {
  content:''; position:absolute; top:0; left:0;
  width:100%; height:100%;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(196,92,60,0.04) 0%, transparent 60%);
  pointer-events:none; transition:opacity 0.3s;
  opacity:0;
}
.bento:hover::before { opacity:1; }

/* ── MARQUEE ── */
.marquee-wrap { overflow:hidden; white-space:nowrap; }
.marquee-inner {
  display:inline-block;
  animation: marquee 30s linear infinite;
}
.marquee-inner:hover { animation-play-state: paused; }

/* ── DARK BENTO ── */
.bento-dark {
  background: var(--night);
  border-color: rgba(212,197,178,0.1);
  color: var(--cream);
}
.bento-dark:hover { border-color: var(--terracotta); }

@media (max-width: 768px) {
  body { cursor: auto; }
  .cursor-dot, .cursor-ring { display: none; }
}
`;

// ── Custom Cursor ──
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX - 4 + "px"; dot.current.style.top = e.clientY - 4 + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX - 18 + "px"; ring.current.style.top = e.clientY - 18 + "px"; }
    };
    const addListeners = () => {
      document.querySelectorAll("a, button, .tag, .bento, .hline").forEach(el => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };
    window.addEventListener("mousemove", move);
    addListeners();
    const timer = setTimeout(addListeners, 1000);
    return () => { window.removeEventListener("mousemove", move); clearTimeout(timer); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
    </>
  );
}

// ── Intersection Observer ──
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Bento mouse glow ──
function useBentoGlow(ref) {
  useEffect(() => {
    const handler = (e) => {
      ref.current?.querySelectorAll(".bento").forEach(card => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
}

// ═══════ NAV ═══════
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      padding: s ? "14px 40px" : "24px 40px",
      background: s ? "rgba(245,240,235,0.88)" : "transparent",
      backdropFilter: s ? "blur(24px) saturate(1.4)" : "none",
      borderBottom: s ? "1px solid rgba(212,197,178,0.3)" : "none",
      transition:"all 0.4s ease",
      display:"flex", justifyContent:"space-between", alignItems:"center",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span className="serif" style={{ fontSize:20, color:"var(--ink)" }}>NK</span>
        <span className="arabic" style={{ fontSize:12, color:"var(--ink-muted)", opacity:.5, marginTop:2 }}>نور</span>
      </div>
      <div style={{ display:"flex", gap:28, fontSize:13, fontWeight:400, color:"var(--ink-soft)", letterSpacing:"0.02em" }}>
        {["Work","Journey","About","Contact"].map(i => (
          <a key={i} href={`#${i.toLowerCase()}`} className="hline">{i}</a>
        ))}
      </div>
    </nav>
  );
}

// ═══════ HERO — Kinetic Type + Exaggerated Hierarchy ═══════
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const words = ["surgeons", "experts", "teams"];
  const [wi, setWi] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWi(p => (p + 1) % words.length); setFade(true); }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"0 clamp(40px,8vw,140px)", position:"relative",
    }}>
      {/* Geometric accents */}
      <div style={{
        position:"absolute", top:"12%", right:"6%",
        width:320, height:320, borderRadius:"50%",
        border:"1px solid var(--sand)", opacity:.3,
        animation: loaded ? "fadeIn 2s ease 1.2s both" : "none",
      }} />
      <div style={{
        position:"absolute", top:"20%", right:"10%",
        width:160, height:160, borderRadius:"50%",
        background:"var(--terracotta)", opacity:.05,
        animation: loaded ? "fadeIn 2s ease 1.5s both" : "none",
      }} />
      <div style={{
        position:"absolute", bottom:"20%", right:"14%",
        width:60, height:60, border:"1px solid var(--sand)",
        opacity:.2, animation: loaded ? "spin 20s linear infinite, fadeIn 2s ease 2s both" : "none",
      }} />

      <div style={{ maxWidth:1000 }}>
        {/* Subtitle — tiny text */}
        <p style={{
          fontSize:12, fontWeight:500, color:"var(--terracotta)",
          letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:28,
          animation: loaded ? "fadeIn 0.8s ease 0.3s both" : "none",
        }}>
          Interaction Designer · Product Builder · Researcher
        </p>

        {/* MASSIVE headline — exaggerated hierarchy */}
        <h1 className="serif" style={{
          fontSize:"clamp(52px,8vw,110px)", lineHeight:1.0, fontWeight:400,
          animation: loaded ? "slideRight 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s both" : "none",
        }}>
          I design how<br/>
          <span style={{
            fontStyle:"italic", color:"var(--terracotta)",
            display:"inline-block",
            transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(20px)",
          }}>
            {words[wi]}
          </span>
          <br/>
          interact with
          <br/>
          technology.
        </h1>

        {/* Tiny supportive text — hierarchy contrast */}
        <p style={{
          fontSize:15, lineHeight:1.75, color:"var(--ink-soft)", fontWeight:300,
          maxWidth:520, marginTop:32,
          animation: loaded ? "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.8s both" : "none",
        }}>
          From mechanical engineering to surgical AI — I build intelligent systems
          where physical instruments become digital interfaces. I care about the whole lifecycle:
          the research, the design, the product.
        </p>

        <div style={{
          display:"flex", gap:10, marginTop:36, flexWrap:"wrap",
          animation: loaded ? "fadeUp 1s ease 1.1s both" : "none",
        }}>
          <span className="tag"><Trophy size={13}/>CHI 2026</span>
          <span className="tag"><Globe size={13}/>MICCAI 2025</span>
          <span className="tag"><Award size={13}/>Startup Pitch Award</span>
          <span className="tag"><FileText size={13}/>Patent Pending</span>
        </div>
      </div>

      {/* Scroll */}
      <div style={{
        position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:6,
        animation: loaded ? "fadeIn 1s ease 2s both" : "none",
      }}>
        <span style={{ fontSize:11, letterSpacing:"0.18em", color:"var(--ink-muted)", textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:1, height:32, background:"linear-gradient(var(--ink-muted), transparent)" }}/>
      </div>
    </section>
  );
}

// ═══════ MARQUEE DIVIDER ═══════
function Marquee() {
  const items = "Interaction Design · Participatory Design · Computer Vision · AI Segmentation · Product Strategy · User Research · Prototyping · MobileNetV3 · Real-time Systems · Full Product Lifecycle · ";
  return (
    <div style={{
      padding:"16px 0", borderTop:"1px solid var(--sand)", borderBottom:"1px solid var(--sand)",
      background:"var(--cream)",
    }}>
      <div className="marquee-wrap">
        <div className="marquee-inner" style={{
          fontSize:13, fontWeight:400, color:"var(--ink-muted)", letterSpacing:"0.06em",
        }}>
          {(items + items + items + items)}
        </div>
      </div>
    </div>
  );
}

// ═══════ BENTO GRID — "WHAT I BUILD" ═══════
function BentoSection() {
  const r = useReveal();
  useBentoGlow(r);
  return (
    <section id="work" ref={r} style={{ padding:"100px clamp(40px,8vw,140px)" }}>
      <p className="reveal" style={{
        fontSize:12, fontWeight:500, color:"var(--terracotta)",
        letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16,
      }}>What I Build</p>
      <h2 className="serif reveal rd1" style={{
        fontSize:"clamp(32px,4.5vw,56px)", lineHeight:1.1, marginBottom:48,
      }}>
        From research insight<br/>to <span style={{fontStyle:"italic"}}>working product</span>.
      </h2>

      {/* BENTO GRID */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3, 1fr)",
        gridTemplateRows:"auto auto auto",
        gap:16,
      }}>
        {/* Big card — InteractOR */}
        <div className="bento bento-dark reveal rd1" style={{ gridColumn:"1 / 3", gridRow:"1 / 3", padding:40 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
            <div>
              <p style={{ fontSize:11, letterSpacing:"0.18em", color:"var(--terracotta-light)", textTransform:"uppercase", marginBottom:8 }}>
                Flagship Project
              </p>
              <h3 className="serif" style={{ fontSize:"clamp(28px,3.5vw,44px)", lineHeight:1.15 }}>
                InteractOR
              </h3>
            </div>
            <span style={{
              padding:"6px 14px", borderRadius:100, fontSize:11, fontWeight:500,
              background:"rgba(196,92,60,0.15)", color:"var(--terracotta-light)",
            }}>CHI 2026</span>
          </div>
          <p style={{ fontSize:15, lineHeight:1.75, color:"rgba(250,247,243,0.65)", fontWeight:300, maxWidth:480, marginBottom:28 }}>
            A mixed reality system that transforms surgical instruments into interaction devices.
            Surgeons navigate MRI scans without releasing their tools — using real-time AI segmentation
            and pinch-gesture recognition directly within the operative field.
          </p>

          {/* Pipeline mini */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
            {[
              { icon:<Eye size={15}/>, label:"Live Feed" },
              { icon:<Cpu size={15}/>, label:"MobileNetV3" },
              { icon:<Layers size={15}/>, label:"Segmentation" },
              { icon:<Zap size={15}/>, label:"30 FPS" },
              { icon:<Globe size={15}/>, label:"Web Interface" },
            ].map((s,i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"6px 14px", borderRadius:100,
                border:"1px solid rgba(212,197,178,0.12)",
                fontSize:12, color:"rgba(250,247,243,0.6)",
              }}>
                <span style={{ color:"var(--terracotta-light)" }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {[
              { n:"23", l:"Surgeons surveyed" },
              { n:"10", l:"Co-designers" },
              { n:"12", l:"Evaluation participants" },
              { n:"2×", l:"Faster vs delegation" },
            ].map((s,i) => (
              <div key={i} style={{ padding:"16px 12px", background:"rgba(250,247,243,0.04)", borderRadius:10, border:"1px solid rgba(212,197,178,0.08)" }}>
                <p className="serif" style={{ fontSize:28, color:"var(--terracotta-light)" }}>{s.n}</p>
                <p style={{ fontSize:11, color:"rgba(250,247,243,0.45)", marginTop:2 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Small cards — right column */}
        <div className="bento reveal rd2" style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <Rocket size={20} color="var(--terracotta)" style={{ marginBottom:12 }}/>
            <h4 style={{ fontSize:16, fontWeight:500, marginBottom:6 }}>Startup Award</h4>
            <p style={{ fontSize:13, lineHeight:1.6, color:"var(--ink-soft)", fontWeight:300 }}>
              Won "Coup de Cœur" pitch at MyStartupProgram. Market analysis, business model, patent strategy.
            </p>
          </div>
          <div style={{ marginTop:16, display:"flex", gap:6, flexWrap:"wrap" }}>
            <span className="tag" style={{ fontSize:11, padding:"4px 10px" }}>Market Analysis</span>
            <span className="tag" style={{ fontSize:11, padding:"4px 10px" }}>Patent Pending</span>
          </div>
        </div>

        <div className="bento reveal rd3" style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <Code2 size={20} color="var(--terracotta)" style={{ marginBottom:12 }}/>
            <h4 style={{ fontSize:16, fontWeight:500, marginBottom:6 }}>Software Declaration</h4>
            <p style={{ fontSize:13, lineHeight:1.6, color:"var(--ink-soft)", fontWeight:300 }}>
              Official registration filed in France. From 5 FPS to 30 FPS via GPU optimization. Web architecture with Aqé.
            </p>
          </div>
          <div style={{ marginTop:16, display:"flex", gap:6, flexWrap:"wrap" }}>
            <span className="tag" style={{ fontSize:11, padding:"4px 10px" }}>GPU Optim.</span>
            <span className="tag" style={{ fontSize:11, padding:"4px 10px" }}>6× Speedup</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="bento reveal rd3">
          <Users size={20} color="var(--terracotta)" style={{ marginBottom:12 }}/>
          <h4 style={{ fontSize:16, fontWeight:500, marginBottom:6 }}>Participatory Design</h4>
          <p style={{ fontSize:13, lineHeight:1.6, color:"var(--ink-soft)", fontWeight:300 }}>
            5 workshops with surgeons. Paper prototyping, video prototyping, co-design. Design grounded in real practice.
          </p>
        </div>

        <div className="bento reveal rd4">
          <BarChart3 size={20} color="var(--terracotta)" style={{ marginBottom:12 }}/>
          <h4 style={{ fontSize:16, fontWeight:500, marginBottom:6 }}>Evaluation & Methods</h4>
          <p style={{ fontSize:13, lineHeight:1.6, color:"var(--ink-soft)", fontWeight:300 }}>
            Comparative Structured Observation, mixed methods. Friedman tests, Likert scales, semi-structured interviews.
          </p>
        </div>

        <div className="bento reveal rd5">
          <Palette size={20} color="var(--terracotta)" style={{ marginBottom:12 }}/>
          <h4 style={{ fontSize:16, fontWeight:500, marginBottom:6 }}>Interaction Design</h4>
          <p style={{ fontSize:13, lineHeight:1.6, color:"var(--ink-soft)", fontWeight:300 }}>
            End-to-end UI/UX: user needs → Figma prototypes → working interfaces. Two visualization layouts designed & evaluated.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════ PHILOSOPHY ═══════
function Philosophy() {
  const r = useReveal();
  return (
    <section ref={r} style={{
      padding:"100px clamp(40px,8vw,140px)",
      background:"var(--night)", color:"var(--cream)", position:"relative", overflow:"hidden",
    }}>
      <div style={{
        position:"absolute", top:"-20%", right:"-10%",
        width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(196,92,60,0.08) 0%, transparent 70%)",
      }}/>
      <div style={{ maxWidth:800, position:"relative" }}>
        <p className="reveal" style={{ fontSize:12, fontWeight:500, color:"var(--terracotta-light)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:32 }}>
          Philosophy
        </p>
        <blockquote className="serif reveal rd1" style={{
          fontSize:"clamp(28px,4vw,52px)", lineHeight:1.25, fontWeight:400, fontStyle:"italic",
        }}>
          "The best technology doesn't ask you to change how you work.
          <span style={{ fontStyle:"normal", color:"var(--terracotta-light)" }}> It just fits.</span>
          <span style={{ fontStyle:"normal", color:"rgba(250,247,243,0.5)" }}> Right now, I am doing that for surgery. </span>
           But the principle holds everywhere."
        </blockquote>
        <div className="reveal rd2" style={{ width:60, height:2, background:"var(--terracotta)", margin:"32px 0" }}/>
        <p className="reveal rd2" style={{ fontSize:15, lineHeight:1.8, color:"rgba(250,247,243,0.6)", fontWeight:300, maxWidth:540 }}>
          I've spent four years sitting in on surgeries, running workshops with surgeons, and building systems that actually get tested by the people they're meant for. I do the fieldwork, I write the code, I design the interface, and I present the results.
        </p>
      </div>
    </section>
  );
}

// ═══════ JOURNEY ═══════
function Journey() {
  const r = useReveal();
  const steps = [
    { y:"2018", t:"BSc Mechanical Engineering", p:"France", d:"Where it started — understanding forces, systems, how things work together." },
    { y:"2021", t:"MSc Electronics — Medical Devices", p:"France", d:"Specialized in technologies for healthcare. Discovered the intersection of engineering and the human body." },
    { y:"2022", t:"Exchange — Biomedical Entrepreneurship", p:"Barcelona", d:"Learned to think like a founder. Market analysis, business models, biomedical innovation." },
    { y:"2023", t:"Internship — Karl Storz Endoscopy", p:"6 months", d:"Deep immersion in endoscopic systems and critical surgical environments. Hands-on with real OR workflows." },
    { y:"2023", t:"PhD — Sorbonne Université / ISIR", p:"Paris", d:"Designing interaction paradigms for mixed reality in surgery. Building InteractOR from zero to product." },
    { y:"2025", t:"MyStartupProgram — Pitch Coup de Cœur", p:"Fellowship Award", d:"Won the jury's favorite pitch. Market analysis, patent filing, software declaration. InteractOR as a venture." },
    { y:"2025", t:"MICCAI · AE-CAI Workshop", p:"South Korea", d:"Presented at the world's leading medical image computing conference. International recognition." },
    { y:"2026", t:"CHI 2026 — Full Paper", p:"Barcelona", d:"Accepted at the premier HCI conference. Interaction Through Instruments: a new paradigm." },
  ];

  return (
    <section id="journey" ref={r} style={{ padding:"100px clamp(40px,8vw,140px)", background:"var(--cream)" }}>
      <div style={{ maxWidth:880, margin:"0 auto" }}>
        <p className="reveal" style={{ fontSize:12, fontWeight:500, color:"var(--terracotta)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>
          The Path
        </p>
        <h2 className="serif reveal rd1" style={{ fontSize:"clamp(32px,4.5vw,52px)", lineHeight:1.15, marginBottom:56 }}>
          Nothing was linear —<br/>
          <span style={{ fontStyle:"italic", color:"var(--terracotta)" }}>and that's the point.</span>
        </h2>

        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:19, top:0, bottom:0, width:1, background:"var(--sand)" }}/>
          {steps.map((s, i) => (
            <div key={i} className={`reveal rd${Math.min(i%3+1,3)}`}
              style={{ display:"grid", gridTemplateColumns:"40px 1fr", gap:20, marginBottom:36, cursor:"default" }}
              onMouseEnter={e => { const dot = e.currentTarget.querySelector(".tdot"); if(dot) { dot.style.background="var(--terracotta)"; dot.style.transform="scale(1.5)"; }}}
              onMouseLeave={e => { const dot = e.currentTarget.querySelector(".tdot"); if(dot) { dot.style.background="var(--sand)"; dot.style.transform="scale(1)"; }}}
            >
              <div style={{ display:"flex", justifyContent:"center", paddingTop:6 }}>
                <div className="tdot" style={{
                  width:10, height:10, borderRadius:"50%",
                  background:"var(--sand)", border:"2px solid var(--cream)",
                  transition:"all 0.3s ease",
                }}/>
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:4 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:"var(--terracotta)", letterSpacing:"0.05em" }}>{s.y}</span>
                  <span style={{ fontSize:12, color:"var(--ink-muted)" }}>{s.p}</span>
                </div>
                <h3 style={{ fontSize:17, fontWeight:500, marginBottom:4 }}>{s.t}</h3>
                <p style={{ fontSize:14, lineHeight:1.7, color:"var(--ink-soft)", fontWeight:300 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════ PUBLICATIONS ═══════
function Pubs() {
  const r = useReveal();
  return (
    <section ref={r} style={{ padding:"100px clamp(40px,8vw,140px)" }}>
      <p className="reveal" style={{ fontSize:12, fontWeight:500, color:"var(--terracotta)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>Publications</p>
      <h2 className="serif reveal rd1" style={{ fontSize:"clamp(28px,3.5vw,40px)", lineHeight:1.2, marginBottom:40 }}>Peer-reviewed work</h2>
      {[
        { v:"CHI 2026", t:"Interaction Through Instruments: Extending Surgical Instruments as Interaction Devices", a:"Nour Karoui, Isabelle Bloch, Ignacio Avellino", d:"ACM CHI · Barcelona", type:"Full Paper" },
        { v:"AE-CAI 2025", t:"InteractOR: Surgical Instrument-Based Interaction for Intraoperative Image Navigation", a:"Nour Karoui, Isabelle Bloch, Ignacio Avellino", d:"MICCAI Workshop -  IET Health Technology Letters. · South Korea", type:"Full Paper" },
      ].map((p,i) => (
        <div key={i} className={`bento reveal rd${i+1}`} style={{ marginBottom:16, maxWidth:780 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:600, color:"var(--terracotta)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{p.v}</span>
            <span style={{ fontSize:11, padding:"4px 10px", borderRadius:100, background:"var(--bg-warm)", color:"var(--ink-soft)" }}>{p.type}</span>
          </div>
          <h3 className="serif" style={{ fontSize:19, lineHeight:1.4, marginBottom:6 }}>{p.t}</h3>
          <p style={{ fontSize:13, color:"var(--ink-soft)" }}>{p.a}</p>
          <p style={{ fontSize:12, color:"var(--ink-muted)", marginTop:2 }}>{p.d}</p>
        </div>
      ))}
    </section>
  );
}

// ═══════ ABOUT ═══════
function About() {
  const r = useReveal();
  useBentoGlow(r);
  return (
    <section id="about" ref={r} style={{ padding:"100px clamp(40px,8vw,140px)", background:"var(--bg-warm)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
        <div>
          <p className="reveal" style={{ fontSize:12, fontWeight:500, color:"var(--terracotta)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>Who I Am</p>
          <h2 className="serif reveal rd1" style={{ fontSize:"clamp(32px,4.5vw,48px)", lineHeight:1.15, marginBottom:28 }}>
            Franco-Tunisian.<br/>
            <span style={{ fontStyle:"italic" }}>Not a straight line.</span>
          </h2>
          <div className="reveal rd2" style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <p style={{ fontSize:15, lineHeight:1.8, color:"var(--ink-soft)", fontWeight:300 }}>
              When I'm not in the lab, I'm probably somewhere with a camera, looking for light
              in places most people walk past. I think good design works the same way —
              it's not about adding more, it's about noticing what's already there.
            </p>
          </div>
        </div>
        <div className="reveal rd2">
          <div className="bento" style={{ padding:32 }}>
            <p style={{ fontSize:11, letterSpacing:"0.18em", color:"var(--ink-muted)", textTransform:"uppercase", marginBottom:24 }}>Toolkit</p>
            {[
              { cat:"AI & Engineering", items:["Python","PyTorch","MobileNetV3","OpenCV","GPU Optimization"] },
              { cat:"Product & Design", items:["Figma","Prototyping","User Research","Market Analysis","Business Model"] },
              { cat:"Web & Systems", items:["React","Aqé","PyQt5","Web Architecture","Git"] },
              { cat:"Research Methods", items:["Participatory Design","CSO","Mixed Methods","Survey Design","Video Prototyping"] },
            ].map((g,i) => (
              <div key={i} style={{ marginBottom: i<3?20:0 }}>
                <p style={{ fontSize:12, fontWeight:500, color:"var(--terracotta)", marginBottom:8 }}>{g.cat}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {g.items.map(t => <span key={t} className="tag" style={{ fontSize:11, padding:"4px 11px" }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16, padding:"20px 0", display:"flex", gap:14, alignItems:"center" }}>
            <MapPin size={15} color="var(--terracotta)"/>
            <span style={{ fontSize:13, color:"var(--ink-soft)" }}>Paris — open to relocate </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════ CONTACT ═══════
function Contact() {
  const r = useReveal();
  return (
    <section id="contact" ref={r} style={{ padding:"120px clamp(40px,8vw,140px)", textAlign:"center" }}>
      <p className="reveal" style={{ fontSize:12, fontWeight:500, color:"var(--terracotta)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>Let's Connect</p>
      <h2 className="serif reveal rd1" style={{ fontSize:"clamp(36px,5.5vw,64px)", lineHeight:1.1, marginBottom:24 }}>
        The future of interaction<br/>
        is <span style={{ fontStyle:"italic", color:"var(--terracotta)" }}>instrument-first</span>.
      </h2>
      <p className="reveal rd2" style={{ fontSize:15, color:"var(--ink-soft)", fontWeight:300, maxWidth:460, margin:"0 auto 36px", lineHeight:1.7 }}>
        If you're working on something where design and technology
        need to actually meet the real world — I would love to talk.
      </p>
      <div className="reveal rd3" style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
        {[
          { icon:<Mail size={16}/>, label:"Email", href:"mailto:nour.karoui@sorbonne-universite.fr" },
          { icon:<Linkedin size={16}/>, label:"LinkedIn", href:"https://www.linkedin.com/in/nourkaroui9/" },
          { icon:<GraduationCap size={16}/>, label:"Scholar", href:"#" },
        ].map(l => (
          <a key={l.label} href={l.href} className="tag" style={{ padding:"12px 24px", fontSize:14, gap:8, cursor:"pointer" }}>
            {l.icon} {l.label} <ArrowUpRight size={13}/>
          </a>
        ))}
      </div>
    </section>
  );
}

// ═══════ FOOTER ═══════
function Footer() {
  return (
    <footer style={{
      padding:"32px 40px", borderTop:"1px solid var(--sand)",
      display:"flex", justifyContent:"space-between", alignItems:"center",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span className="serif" style={{ fontSize:15 }}>Nour Karoui</span>
        <span className="arabic" style={{ fontSize:11, color:"var(--ink-muted)", opacity:.4 }}>نور</span>
      </div>
      <p style={{ fontSize:11, color:"var(--ink-muted)" }}>© 2026 — Designed with intention</p>
    </footer>
  );
}

// ═══════ APP ═══════
export default function Portfolio() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="grain">
        <Cursor />
        <Nav />
        <Hero />
        <Marquee />
        <BentoSection />
        <Philosophy />
        <Journey />
        <Pubs />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}