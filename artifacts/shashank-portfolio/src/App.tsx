import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Award, Bot, Boxes,
  ChevronLeft, ChevronRight, Cloud, Code2, Database, ExternalLink, Globe2,
  Layers3, LockKeyhole, Menu, Network, Orbit, Send, Server, ShieldCheck, Sparkles,
  Terminal, X, Zap,
} from 'lucide-react';

const telegramUrl = 'https://t.me/ShashankHelpRobot';

const certificates = [
  { title: 'Professional Machine Learning Engineer', issuer: 'Google Cloud', lane: 'AI / ML', image: '/certificates/1787242117082_1787242484212.png', accent: '#73a7ff' },
  { title: 'Cybersecurity Architect Expert', issuer: 'Microsoft', lane: 'Security', image: '/certificates/file_0000000064c48207af3bbca3d18a7714_1787242484255.png', accent: '#5f9bff' },
  { title: 'Certified Developer for Apache Kafka', issuer: 'Confluent', lane: 'Data systems', image: '/certificates/file_000000001ebc8211b9f6e0406d0e0d98_1787242484294.png', accent: '#ff5b58' },
  { title: 'Database Certified Professional', issuer: 'Oracle', lane: 'Data systems', image: '/certificates/file_000000002f508208b6bc76c14c8538ce_1787242484324.png', accent: '#ff776b' },
  { title: 'Solutions Architect', issuer: 'AWS', lane: 'Cloud / DevOps', image: '/certificates/file_0000000030f88211b61275a698af74fd_1787242484356.png', accent: '#ffac37' },
  { title: 'Azure Developer Associate', issuer: 'Microsoft', lane: 'Cloud / Backend', image: '/certificates/file_0000000087c88208a11e9dcacea6903c_1787242484383.png', accent: '#62a9ff' },
  { title: 'Associate Android Developer', issuer: 'Google', lane: 'Mobile', image: '/certificates/file_00000000c940821198b695d5a5dcf1c5_1787242484422.png', accent: '#68cf9b' },
  { title: 'Developer — Full-Stack Development', issuer: 'AWS', lane: 'Product engineering', image: '/certificates/file_000000003e908208a62e5cbfd578dc15_1787242484458.png', accent: '#ffbf63' },
] as const;

const skillGroups = {
  Product: ['TypeScript', 'React', 'Next.js', 'Svelte', 'Tailwind', 'Node.js', 'GraphQL', 'Web performance'],
  Languages: ['Go', 'Rust', 'Java', 'Kotlin', 'Swift', 'Python', 'Bash', 'SQL'],
  Systems: ['PostgreSQL', 'Redis', 'Elasticsearch', 'Kafka', 'Spark', 'Event sourcing', 'Data contracts', 'Observability'],
  Cloud: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Cloudflare'],
  Intelligence: ['OpenAI', 'Vector databases', 'RAG', 'AI agents', 'MLOps', 'Prompt systems', 'Evaluation', 'Automation'],
  Security: ['OWASP', 'OAuth 2.0', 'IAM', 'Threat modeling', 'Zero trust', 'Encryption', 'Secure SDLC', 'Incident response'],
} as const;

const projects = [
  { id: 'signal', number: '01', title: 'Signal / orchestration layer', category: 'AI SYSTEMS', description: 'A modular command center turning noisy business signals into considered, reviewable actions.', stack: ['Next.js', 'OpenAI', 'RAG', 'Postgres'], icon: Bot, color: '#d8ff65', metric: '−31% decision latency' },
  { id: 'atlas', number: '02', title: 'Atlas / event fabric', category: 'DATA PLATFORMS', description: 'Real-time pipelines that make distributed systems legible: observable, replayable, and resilient.', stack: ['Kafka', 'Go', 'Kubernetes', 'Grafana'], icon: Network, color: '#6f98ff', metric: '2.4B events / month' },
  { id: 'citadel', number: '03', title: 'Citadel / security posture', category: 'CLOUD SECURITY', description: 'A cloud-native security layer mapping identity, infrastructure, and risk into one actionable view.', stack: ['AWS', 'Terraform', 'OPA', 'Vault'], icon: ShieldCheck, color: '#c1b7ff', metric: '94 controls mapped' },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LogoMark({ size = 34, inverted = false }: { size?: number; inverted?: boolean }) {
  const ink = inverted ? '#dce7ed' : '#0b1017';
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" fill="none" className="shrink-0">
      <circle cx="24" cy="24" r="19" stroke={ink} strokeOpacity=".24" strokeWidth="1" />
      <path d="M14 30.5c2.4-7.2 6.1-12.1 11.1-14.7 3.4-1.8 6.3-1.5 8.8.9" stroke="#d8ff65" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M16 33.5c4.6-1.1 8.1-3.2 10.5-6.3 2.2-2.8 3.5-5.5 4.1-8.2" stroke={ink} strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="33" cy="17" r="3" fill="#d8ff65" />
      <path d="M12 36.5h24" stroke={ink} strokeOpacity=".35" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function TiltTile({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isInteractive = Boolean(onClick);
  return (
    <div
      className={`tile tilt-tile ${className}`}
      onClick={onClick}
      onPointerMove={(event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({ x: ((event.clientX - rect.left) / rect.width - .5) * 3.8, y: -((event.clientY - rect.top) / rect.height - .5) * 3.8 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1100px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (event) => { if (event.key === 'Enter' || event.key === ' ') onClick?.(); } : undefined}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<keyof typeof skillGroups>('Product');
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1600);
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX - 3}px, ${event.clientY - 3}px, 0)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .1 });
    document.querySelectorAll('.scroll-reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    if (selectedCertificate === null) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCertificate(null);
      if (event.key === 'ArrowRight') setSelectedCertificate((selectedCertificate + 1) % certificates.length);
      if (event.key === 'ArrowLeft') setSelectedCertificate((selectedCertificate - 1 + certificates.length) % certificates.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedCertificate]);

  const selected = useMemo(() => selectedCertificate === null ? null : certificates[selectedCertificate], [selectedCertificate]);

  return (
    <main className="portfolio-root">
      {showIntro && (
        <div className="intro-overlay" role="status" aria-label="Loading Shashank portfolio">
          <div className="text-center">
            <LogoMark size={82} inverted />
            <p className="mt-5 font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#8c9ca9]">Compiling signal / 01</p>
            <div className="mx-auto mt-4 h-px w-40 overflow-hidden bg-[#23313d]"><div className="h-full w-full origin-left bg-[#d8ff65] animate-[linebreath_1.2s_ease-in-out_infinite]" /></div>
            <button data-testid="button-skip-intro" onClick={() => setShowIntro(false)} className="pointer-events-auto mt-8 font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#6f7e8a] transition hover:text-[#d8ff65]">Skip sequence</button>
          </div>
        </div>
      )}

      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-2 rounded-full bg-[#d8ff65] mix-blend-screen lg:block" />

      <header className={`topbar fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-0' : 'bg-transparent border-transparent'}`}>
        <div className="section-shell flex h-[72px] items-center justify-between">
          <button data-testid="button-logo" onClick={() => scrollToId('top')} className="group flex items-center gap-3 text-left">
            <LogoMark />
            <span className="font-mono-custom text-[11px] font-medium tracking-[.18em] text-[#dce7ed]">SHASHANK<span className="text-[#d8ff65]">/</span>SYS</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {[['about', '01 / About'], ['capabilities', '02 / Stack'], ['work', '03 / Work'], ['credentials', '04 / Proof'], ['contact', '05 / Contact']].map(([id, label]) => (
              <a data-testid={`link-nav-${id}`} key={id} href={`#${id}`} className="nav-link font-mono-custom text-[9px] uppercase tracking-[.16em]">{label}</a>
            ))}
            <a data-testid="link-telegram-header" href={telegramUrl} target="_blank" rel="noreferrer" className="ml-2 flex items-center gap-2 rounded-full border border-[#d8ff65]/55 px-3 py-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#d8ff65] transition hover:bg-[#d8ff65] hover:text-[#0b1017]"><Send size={12} /> Open channel</a>
          </nav>
          <button data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-full border border-[#91a2ae]/30 text-[#dce7ed] md:hidden">
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#91a2ae]/15 bg-[#0b1017]/95 px-5 py-3 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
            {['about', 'capabilities', 'work', 'credentials', 'contact'].map((id) => (
              <a data-testid={`link-mobile-nav-${id}`} key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-[#91a2ae]/10 py-4 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#a9bac5]">{id}</a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="hero-shell">
        <div className="section-shell">
          <div className="hero-grid">
            <TiltTile className="hero-headline tile-grid p-7 md:p-10">
              <div className="reveal flex items-center justify-between">
                <Eyebrow>Full stack / independent</Eyebrow>
                <span className="font-mono-custom text-[10px] text-[#d8ff65]">DEL / 28.61°N</span>
              </div>
              <h1 className="hero-title reveal reveal-1 mt-12 max-w-[720px]">Build the <span className="stroke">signal.</span><br /><em>Ship the feeling.</em></h1>
              <div className="reveal reveal-2 mt-8 flex items-end justify-between gap-6">
                <p className="hero-subline">Shashank is a full stack web developer designing intelligent products, dependable platforms, and the quiet machinery beneath them.</p>
                <button data-testid="button-scroll-work" onClick={() => scrollToId('work')} aria-label="Scroll to selected work" className="hidden size-12 shrink-0 place-items-center rounded-full bg-[#d8ff65] text-[#0b1017] transition hover:rotate-12 sm:grid"><ArrowDownRight size={20} /></button>
              </div>
            </TiltTile>

            <TiltTile className="hero-orbit tile-blue p-7">
              <div className="relative z-10 flex items-start justify-between"><Eyebrow>Now / in the lab</Eyebrow><span className="pulse-dot size-2 rounded-full bg-[#d8ff65]" /></div>
              <div className="orb" /><div className="orbit-line" />
              <div className="absolute bottom-7 left-7 z-10"><p className="font-display text-4xl leading-none tracking-[-.05em]">Systems<br /><span className="italic text-[#d8ff65]">that breathe.</span></p><p className="mt-3 font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#dce7ed]/55">AI × cloud × product</p></div>
            </TiltTile>

            <TiltTile className="hero-note tile-lime flex items-center justify-between gap-5 px-7 py-6">
              <div><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#0b1017]/55">A working thesis</p><p className="mt-2 font-display text-2xl leading-none tracking-[-.035em]">Complexity is a material.<br />Use less. Make it count.</p></div>
              <Orbit className="hidden size-10 shrink-0 sm:block" strokeWidth={1.2} />
            </TiltTile>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#91a2ae]/15 pt-4 font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#6f7e8a]"><span>Scroll / calibrate your view</span><span>© 2025 — built in public</span></div>
        </div>
      </section>

      <section id="about" className="section-block section-rule">
        <div className="section-shell">
          <div className="mb-10 flex items-end justify-between gap-6"><div><Eyebrow>01 / Identity</Eyebrow><h2 className="mt-4 max-w-[620px] font-display text-6xl leading-[.82] tracking-[-.065em] text-[#dce7ed] md:text-8xl">The human<br /><span className="text-[#d8ff65]">in the loop.</span></h2></div><span className="hidden max-w-[180px] font-mono-custom text-[9px] uppercase leading-5 tracking-[.14em] text-[#6f7e8a] sm:block">A portfolio is a<br />map of decisions.</span></div>
          <div className="bento-grid">
            <TiltTile className="span-7 row-3 tile-quiet tile-grid p-7 md:p-9">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between"><div className="grid size-12 place-items-center rounded-full border border-[#d8ff65]/35 text-[#d8ff65]"><Code2 size={21} strokeWidth={1.3} /></div><span className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#6f7e8a]">Profile / 001</span></div>
                <div><p className="max-w-[600px] font-display text-4xl leading-[.98] tracking-[-.045em] text-[#dce7ed] md:text-6xl">I move between the surface and the substrate — from the first pixel to the last reliable packet.</p><p className="mt-7 max-w-[540px] text-sm leading-6 text-[#91a2ae]">The best work lives in the seam between an expressive interface and an invisible, dependable machine. Product thinking keeps the system useful; infrastructure thinking keeps it honest.</p></div>
              </div>
            </TiltTile>
            <TiltTile className="span-5 row-3 tile-lilac tile-grid-dark p-7">
              <div className="flex h-full flex-col justify-between"><div className="flex justify-between"><Eyebrow>Coordinates</Eyebrow><Globe2 size={18} strokeWidth={1.4} /></div><div><p className="font-mono-custom text-5xl tracking-[-.08em]">10<span className="text-2xl">+</span></p><p className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.18em] opacity-65">years turning ambiguity into software</p><div className="mt-8 signal-line signal-line-animated" /><div className="mt-3 flex justify-between font-mono-custom text-[9px] uppercase tracking-[.13em] opacity-60"><span>Delhi / India</span><span>UTC +05:30</span></div></div></div>
            </TiltTile>
            <div className="span-4 tile tile-quiet flex min-h-[142px] flex-col justify-between p-6"><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#6f7e8a]">Mode</p><div className="flex items-end justify-between"><span className="font-display text-3xl tracking-[-.04em]">Curious<br />by default.</span><Sparkles className="mb-1 text-[#d8ff65]" size={23} strokeWidth={1.2} /></div></div>
            <div className="span-4 tile tile-blue flex min-h-[142px] flex-col justify-between p-6"><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#dce7ed]/60">Current altitude</p><div className="flex items-end justify-between"><span className="font-display text-3xl tracking-[-.04em]">Product<br />systems.</span><Zap className="mb-1 text-[#d8ff65]" size={23} strokeWidth={1.2} /></div></div>
            <div className="span-4 tile tile-lime flex min-h-[142px] flex-col justify-between p-6"><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#0b1017]/55">Available for</p><div className="flex items-end justify-between"><span className="font-display text-3xl tracking-[-.04em]">Hard<br />problems.</span><ArrowUpRight className="mb-1" size={23} strokeWidth={1.2} /></div></div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-block section-dark section-rule">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><Eyebrow>02 / Capability map</Eyebrow><h2 className="mt-4 font-display text-6xl leading-[.82] tracking-[-.065em] md:text-8xl">One brain.<br /><span className="text-[#6f98ff]">Many layers.</span></h2></div><p className="max-w-[310px] text-sm leading-6 text-[#91a2ae]">A deliberately wide toolkit for building products that move from a rough hypothesis to a resilient system.</p></div>
          <div className="bento-grid">
            <TiltTile className="span-4 row-3 tile-blue p-7 md:p-8">
              <div className="flex h-full flex-col justify-between"><div><div className="mb-8 grid size-12 place-items-center rounded-full border border-[#dce7ed]/25"><Layers3 size={21} strokeWidth={1.3} /></div><p className="font-display text-5xl leading-[.86] tracking-[-.06em]">Shape the<br /><span className="text-[#d8ff65]">whole stack.</span></p></div><div><div className="mb-4 signal-line" /><p className="font-mono-custom text-[9px] uppercase leading-5 tracking-[.15em] text-[#dce7ed]/60">Interface → API → data → infra → trust</p></div></div>
            </TiltTile>
            <div className="span-8 tile tile-quiet row-3 p-7 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5"><div><Eyebrow>Interactive index</Eyebrow><p className="mt-3 max-w-[420px] font-display text-3xl leading-none tracking-[-.04em]">Choose a layer. I&apos;ll show you the instruments.</p></div><Terminal className="text-[#d8ff65]" size={25} strokeWidth={1.3} /></div>
              <div className="mt-8 flex flex-wrap gap-2 border-b border-[#91a2ae]/15 pb-6">{Object.keys(skillGroups).map((group) => <button data-testid={`button-skill-${group.toLowerCase()}`} key={group} onClick={() => setActiveSkill(group as keyof typeof skillGroups)} className={`rounded-full px-3 py-2 font-mono-custom text-[9px] uppercase tracking-[.14em] transition ${activeSkill === group ? 'bg-[#d8ff65] text-[#0b1017]' : 'border border-[#91a2ae]/25 text-[#91a2ae] hover:border-[#d8ff65] hover:text-[#d8ff65]'}`}>{group}</button>)}</div>
              <div className="grid grid-cols-2 gap-x-5 sm:grid-cols-4" key={activeSkill}>{skillGroups[activeSkill].map((skill, index) => <div data-testid={`skill-${skill.toLowerCase().replaceAll(' ', '-')}`} key={skill} className="group flex items-center gap-2 border-b border-[#91a2ae]/12 py-4"><span className="font-mono-custom text-[9px] text-[#6f98ff]">0{index + 1}</span><span className="text-sm text-[#dce7ed] transition group-hover:text-[#d8ff65]">{skill}</span></div>)}</div>
            </div>
            {[{ icon: Cloud, title: 'Cloud native', text: 'Scale without losing the plot.' }, { icon: Database, title: 'Data fluent', text: 'Make streams tell the truth.' }, { icon: LockKeyhole, title: 'Security minded', text: 'Trust is designed in.' }].map(({ icon: Icon, title, text }) => <div key={title} className="span-4 tile tile-quiet min-h-[170px] p-6 transition hover:border-[#d8ff65]/45"><Icon className="mb-9 text-[#d8ff65]" size={22} strokeWidth={1.2} /><p className="font-display text-2xl tracking-[-.03em]">{title}</p><p className="mt-2 text-xs text-[#91a2ae]">{text}</p></div>)}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-[#0b1017]/15 bg-[#d8ff65] py-4 text-[#0b1017]">
        <div className="marquee-track flex items-center gap-10 whitespace-nowrap"><span className="font-mono-custom text-[11px] uppercase tracking-[.2em]">Make it useful</span><span className="font-display text-4xl italic">/</span><span className="font-mono-custom text-[11px] uppercase tracking-[.2em]">Make it last</span><span className="font-display text-4xl italic">/</span><span className="font-mono-custom text-[11px] uppercase tracking-[.2em]">Make it felt</span><span className="font-display text-4xl italic">/</span><span className="font-mono-custom text-[11px] uppercase tracking-[.2em]">Make it useful</span><span className="font-display text-4xl italic">/</span><span className="font-mono-custom text-[11px] uppercase tracking-[.2em]">Make it last</span><span className="font-display text-4xl italic">/</span><span className="font-mono-custom text-[11px] uppercase tracking-[.2em]">Make it felt</span></div>
      </div>

      <section id="work" className="section-block section-rule">
        <div className="section-shell">
          <div className="mb-10 flex items-end justify-between gap-6"><div><Eyebrow>03 / Selected work</Eyebrow><h2 className="mt-4 font-display text-6xl leading-[.82] tracking-[-.065em] md:text-8xl">Proof of<br /><span className="text-[#d8ff65]">thought.</span></h2></div><p className="hidden max-w-[250px] text-right font-mono-custom text-[9px] uppercase leading-5 tracking-[.14em] text-[#6f7e8a] md:block">Not side projects.<br />Useful artifacts.</p></div>
          <div className="bento-grid">
            <div className="span-8 tile tile-quiet overflow-visible p-3">
              <div className="space-y-3">
                {projects.map((project) => { const Icon = project.icon; return <article data-testid={`card-project-${project.id}`} key={project.id} className="project-card group grid gap-5 rounded-xl border border-[#91a2ae]/12 p-5 sm:grid-cols-[52px_1fr_auto] sm:items-center"><span className="font-mono-custom text-[10px] text-[#6f98ff]">{project.number}</span><div><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#6f7e8a]">{project.category}</p><h3 className="mt-2 font-display text-2xl tracking-[-.04em] text-[#dce7ed] md:text-3xl">{project.title}</h3><p className="mt-2 max-w-[480px] text-xs leading-5 text-[#91a2ae]">{project.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{project.stack.map((item) => <span key={item} className="tag">{item}</span>)}</div></div><div className="flex items-center justify-between gap-4 sm:block sm:text-right"><div className="font-mono-custom text-[9px] uppercase tracking-[.1em]" style={{ color: project.color }}>{project.metric}</div><div className="project-arrow mt-3 grid size-10 place-items-center rounded-full border border-[#91a2ae]/25 text-[#91a2ae]"><ArrowUpRight size={16} /></div></div><div className="hidden" aria-hidden="true"><Icon size={1} /></div></article>; })}
              </div>
            </div>
            <TiltTile className="span-4 tile-lime row-3 tile-grid-dark p-7">
              <div className="flex h-full flex-col justify-between"><div><Award size={26} strokeWidth={1.25} /><p className="mt-8 font-display text-5xl leading-[.84] tracking-[-.06em]">Built for<br />the edge<br /><span className="italic">cases.</span></p></div><div><div className="mb-4 h-px bg-[#0b1017]/25" /><p className="font-mono-custom text-[9px] uppercase leading-5 tracking-[.15em] text-[#0b1017]/65">Performance is a feeling users notice before they can name it.</p></div></div>
            </TiltTile>
            <div className="span-12 tile tile-blue flex flex-col justify-between gap-7 p-7 md:flex-row md:items-center md:p-8"><div className="flex items-center gap-5"><div className="grid size-12 place-items-center rounded-full border border-[#dce7ed]/25"><Server size={21} strokeWidth={1.25} /></div><div><p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#dce7ed]/60">Architecture note</p><p className="mt-2 font-display text-3xl tracking-[-.04em]">The invisible layer is part of the portfolio.</p></div></div><button data-testid="button-work-contact" onClick={() => scrollToId('contact')} className="flex items-center gap-3 self-start rounded-full border border-[#d8ff65]/65 px-4 py-3 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#d8ff65] transition hover:bg-[#d8ff65] hover:text-[#0b1017] md:self-auto">Start a conversation <ArrowRight size={14} /></button></div>
          </div>
        </div>
      </section>

      <section id="credentials" className="section-block section-dark section-rule">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Eyebrow>04 / Credentials</Eyebrow><h2 className="mt-4 font-display text-6xl leading-[.82] tracking-[-.065em] md:text-8xl">Receipts,<br /><span className="text-[#c1b7ff]">not claims.</span></h2></div><p className="max-w-[330px] text-sm leading-6 text-[#91a2ae]">Eight signals from the institutions that keep the bar high. Select any credential to inspect the original in a keyboard-accessible viewer.</p></div>
          <div className="bento-grid">
            {certificates.map((certificate, index) => <button data-testid={`button-certificate-${index}`} key={certificate.title} onClick={() => setSelectedCertificate(index)} aria-label={`Open ${certificate.title} certificate`} className={`cert-card span-${index === 0 || index === 5 ? '6' : '3'} tile tile-quiet group p-2 text-left ${index === 0 || index === 5 ? 'md:col-span-6' : ''}`}><div className="relative overflow-hidden rounded-[11px]"><img className="cert-image" src={certificate.image} alt={`${certificate.issuer} ${certificate.title} certificate for Shashank`} /><span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-[#0b1017]/80 text-[#d8ff65] opacity-0 transition group-hover:opacity-100"><ExternalLink size={13} /></span></div><div className="flex items-start justify-between gap-3 p-3 pb-2"><div><p className="font-mono-custom text-[9px] uppercase tracking-[.16em]" style={{ color: certificate.accent }}>{certificate.issuer} / {certificate.lane}</p><h3 className="mt-1 font-display text-lg leading-none tracking-[-.025em] text-[#dce7ed]">{certificate.title}</h3></div><span className="font-mono-custom text-[10px] text-[#6f7e8a]">0{index + 1}</span></div></button>)}
          </div>
        </div>
      </section>

      <section id="principles" className="section-block section-lime">
        <div className="section-shell">
          <div className="mb-10 flex items-start justify-between gap-6"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#0b1017]/55">05 / Operating system</p><h2 className="mt-4 max-w-[700px] font-display text-6xl leading-[.82] tracking-[-.07em] md:text-8xl">Clarity is<br />a feature.</h2></div><Boxes className="mt-2 hidden size-12 md:block" strokeWidth={1.1} /></div>
          <div className="bento-grid">
            <div className="span-5 tile tile-grid-dark border-[#0b1017]/20 bg-transparent p-7"><p className="max-w-[430px] font-display text-3xl leading-[.98] tracking-[-.04em]">I bring shape to ambiguity: make the problem visible, make the trade-offs explicit, then ship the smallest thing that teaches us something.</p></div>
            <div className="span-7 grid gap-3 sm:grid-cols-3">{[['01', 'Map the terrain', 'Context before code.'], ['02', 'Build the spine', 'A strong system underneath.'], ['03', 'Tune the feeling', 'Polish is part of function.']].map(([n, title, text]) => <div key={n} className="tile tile-grid-dark min-h-[180px] border-[#0b1017]/20 bg-transparent p-5"><span className="font-mono-custom text-[10px]">{n}</span><div className="mt-14"><h3 className="font-display text-2xl leading-none tracking-[-.035em]">{title}</h3><p className="mt-2 text-xs text-[#0b1017]/65">{text}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-block section-rule">
        <div className="section-shell">
          <div className="bento-grid">
            <div className="span-8 tile tile-quiet tile-grid row-3 flex flex-col justify-between p-7 md:p-10"><div><Eyebrow>06 / Open channel</Eyebrow><h2 className="mt-8 font-display text-7xl leading-[.77] tracking-[-.075em] md:text-[9rem]">Let&apos;s make<br /><span className="text-[#d8ff65]">the signal</span><br /><span className="stroke">clear.</span></h2></div><p className="max-w-[470px] text-sm leading-6 text-[#91a2ae]">Have a difficult product, platform, or automation problem? Bring the rough version. I&apos;ll bring a sharp point of view.</p></div>
            <TiltTile className="span-4 tile-blue row-3 p-7">
              <div className="flex h-full flex-col justify-between"><div className="flex justify-between"><div className="grid size-11 place-items-center rounded-full bg-[#d8ff65] text-[#0b1017]"><Send size={19} /></div><span className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#dce7ed]/55">Direct line</span></div><div><p className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#dce7ed]/55">Telegram only</p><p className="mt-3 break-all font-display text-3xl leading-none tracking-[-.05em]">@ShashankHelpRobot</p><a data-testid="link-contact-telegram" href={telegramUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d8ff65] px-4 py-3 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#0b1017] transition hover:bg-[#dce7ed]">Open Telegram <ArrowUpRight size={14} /></a></div></div>
            </TiltTile>
          </div>
        </div>
      </section>

      <footer className="section-shell flex flex-col justify-between gap-5 border-t border-[#91a2ae]/15 py-7 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><LogoMark size={30} inverted /><span className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#6f7e8a]">© 2025 Shashank / full stack systems</span></div><div className="flex items-center gap-6"><a data-testid="link-telegram-footer" href={telegramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#91a2ae] transition hover:text-[#d8ff65]"><Send size={14} /> @ShashankHelpRobot</a><button data-testid="button-back-top" onClick={() => scrollToId('top')} className="flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#91a2ae] transition hover:text-[#d8ff65]">Back to top <ArrowUpRight size={14} /></button></div></footer>

      {selected !== null && selectedCertificate !== null && (
        <div role="dialog" aria-modal="true" aria-labelledby="certificate-title" className="modal-backdrop fixed inset-0 z-[90] grid place-items-center bg-[#05080c]/90 p-3 backdrop-blur-md sm:p-8" onClick={() => setSelectedCertificate(null)}>
          <div className="modal-panel relative flex max-h-[94vh] w-full max-w-6xl flex-col rounded-2xl border border-[#91a2ae]/25 bg-[#101923] p-2 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 px-3 py-3"><div><p className="font-mono-custom text-[9px] uppercase tracking-[.17em] text-[#d8ff65]">{selected.issuer} / {selected.lane}</p><h2 id="certificate-title" className="mt-1 font-display text-2xl leading-none tracking-[-.03em] text-[#dce7ed]">{selected.title}</h2></div><div className="flex items-center gap-2"><button data-testid="button-previous-certificate" aria-label="Previous certificate" onClick={() => setSelectedCertificate((selectedCertificate - 1 + certificates.length) % certificates.length)} className="grid size-9 place-items-center rounded-full border border-[#91a2ae]/25 text-[#91a2ae] transition hover:border-[#d8ff65] hover:text-[#d8ff65]"><ChevronLeft size={17} /></button><button data-testid="button-next-certificate" aria-label="Next certificate" onClick={() => setSelectedCertificate((selectedCertificate + 1) % certificates.length)} className="grid size-9 place-items-center rounded-full border border-[#91a2ae]/25 text-[#91a2ae] transition hover:border-[#d8ff65] hover:text-[#d8ff65]"><ChevronRight size={17} /></button><button data-testid="button-close-certificate" aria-label="Close certificate viewer" onClick={() => setSelectedCertificate(null)} className="ml-2 grid size-9 place-items-center rounded-full bg-[#d8ff65] text-[#0b1017] transition hover:bg-[#dce7ed]"><X size={17} /></button></div></div>
            <div className="min-h-0 overflow-auto rounded-xl bg-[#dce7ed]"><img src={selected.image} alt={`${selected.issuer} ${selected.title} certificate for Shashank`} className="mx-auto block max-h-[calc(94vh-112px)] w-full object-contain" /></div>
            <p className="px-3 py-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#6f7e8a]">Certificate {selectedCertificate + 1} of {certificates.length} / Use arrow keys to navigate</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Portfolio;