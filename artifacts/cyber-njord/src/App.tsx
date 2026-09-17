import { type FormEvent, type ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Compass,
  Factory,
  Gauge,
  Menu,
  Radar,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const capabilities = [
  {
    number: '01',
    icon: Radar,
    title: 'Risk, with context',
    copy: 'Make sense of exposure across business IT, production networks, and the places where they meet. Priorities are tied to consequence, not just severity.',
    tags: ['Risk assessment', 'Attack paths'],
  },
  {
    number: '02',
    icon: Factory,
    title: 'The operational layer',
    copy: 'Security advice that respects PLCs, safety systems, vendor access, old protocols, and the very real cost of taking a line offline.',
    tags: ['OT / ICS', 'Industrial environments'],
  },
  {
    number: '03',
    icon: SlidersHorizontal,
    title: 'A strategy that moves',
    copy: 'Turn findings into a sequence your teams can own: clear decisions, sensible controls, and a roadmap that survives contact with operations.',
    tags: ['Security strategy', 'Resilience'],
  },
];

const approach = [
  ['01', 'Listen to the system', 'Start with what keeps the organisation running: critical processes, dependencies, people, and the realities between the diagrams.'],
  ['02', 'Find the meaningful exposure', 'Combine technical evidence with consequence. Separate a noisy list of vulnerabilities from the paths that deserve attention now.'],
  ['03', 'Make the next move obvious', 'Leave your team with decisions they can defend, communicate, and execute — without manufacturing urgency or fear.'],
];

function Wordmark() {
  return (
    <a href="#top" className="group flex items-center gap-3" data-testid="link-home">
      <span className="relative flex h-9 w-9 items-center justify-center border border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]">
        <span className="font-display text-sm font-bold tracking-tighter">CN</span>
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#61d3c8]" />
      </span>
      <span className="font-display text-[1.05rem] font-bold tracking-[-.04em] text-[#f6f0df]">
        CYBER <span className="text-[#f2a65a]">NJORD</span>
      </span>
    </a>
  );
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      data-testid={`link-cta-${href.replace('#', '') || 'home'}`}
      className={`group inline-flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-[.13em] transition-transform hover:-translate-y-0.5 ${
        secondary
          ? 'border border-[#47717b] text-[#f6f0df] hover:border-[#f2a65a] hover:text-[#f2a65a]'
          : 'bg-[#f2a65a] text-[#142d3b] hover:bg-[#ffc47d]'
      }`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const brief = String(data.get('brief') || '');
    window.location.href = `mailto:hello@cybernjord.eu?subject=${encodeURIComponent(`Conversation request from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${brief}`)}`;
    setSent(true);
    form.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="cnj-page grain" id="top">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1340px] items-center justify-between px-6 py-6 lg:px-10">
          <Wordmark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#what-we-do" className="nav-link text-xs font-bold uppercase tracking-[.15em] text-[#b9cbd0] hover:text-[#f6f0df]" data-testid="link-nav-services">What we do</a>
            <a href="#method" className="nav-link text-xs font-bold uppercase tracking-[.15em] text-[#b9cbd0] hover:text-[#f6f0df]" data-testid="link-nav-method">Method</a>
            <a href="#roland" className="nav-link text-xs font-bold uppercase tracking-[.15em] text-[#b9cbd0] hover:text-[#f6f0df]" data-testid="link-nav-roland">Roland</a>
            <a href="#contact" className="border border-[#47717b] px-4 py-2.5 text-xs font-bold uppercase tracking-[.15em] text-[#f6f0df] transition-colors hover:border-[#f2a65a] hover:text-[#f2a65a]" data-testid="link-nav-contact">Start a conversation</a>
          </nav>
          <button className="border border-[#47717b] p-2 text-[#f6f0df] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-4 border border-[#47717b] bg-[#173744] p-5 md:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col gap-5">
                {[
                  ['What we do', '#what-we-do'],
                  ['Method', '#method'],
                  ['Roland', '#roland'],
                  ['Start a conversation', '#contact'],
                ].map(([label, href]) => (
                  <a key={href} href={href} onClick={closeMenu} className="text-xs font-bold uppercase tracking-[.15em] text-[#f6f0df]" data-testid={`link-mobile-${href.slice(1)}`}>{label}</a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="hero-angle relative min-h-[760px] overflow-hidden bg-[#142d3b] text-[#f6f0df]">
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute -right-40 top-32 h-[530px] w-[530px] rounded-full border border-[#61d3c8]/20 lg:right-[-5rem]" />
          <div className="absolute -right-24 top-48 h-[300px] w-[300px] rounded-full border border-[#61d3c8]/10" />
          <div className="relative mx-auto grid max-w-[1340px] gap-14 px-6 pb-28 pt-40 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 lg:px-10 lg:pt-48">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="max-w-3xl">
              <div className="mb-8 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#61d3c8]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#f2a65a]" />
                Independent cybersecurity consultancy · Europe
              </div>
              <h1 className="font-display text-[clamp(3.5rem,8vw,7.7rem)] font-medium leading-[.88] tracking-[-.075em]">
                Protect what<br /><span className="text-[#61d3c8]">keeps moving.</span>
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-8 text-[#c8d7d8] sm:text-xl">
                Cybersecurity for the systems your organisation cannot afford to misunderstand — from enterprise IT to industrial operations and critical infrastructure.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="#contact">Talk through your risk</ButtonLink>
                <ButtonLink href="#what-we-do" secondary>See the focus areas</ButtonLink>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative flex min-h-[365px] items-center justify-center lg:mt-8">
              <div className="signal-ring flex h-[315px] w-[315px] items-center justify-center sm:h-[385px] sm:w-[385px]">
                <div className="signal-ring flex h-[220px] w-[220px] items-center justify-center sm:h-[272px] sm:w-[272px]">
                  <div className="signal-ring flex h-[120px] w-[120px] items-center justify-center sm:h-[150px] sm:w-[150px]">
                    <div className="h-3 w-3 rounded-full bg-[#f2a65a] shadow-[0_0_0_10px_rgba(242,166,90,.13)]" />
                  </div>
                  <span className="absolute -top-1 left-[43%] bg-[#142d3b] px-2 font-mono-cnj text-[9px] tracking-[.16em] text-[#61d3c8]">SYSTEM / 01</span>
                  <span className="absolute -bottom-1 right-[14%] bg-[#142d3b] px-2 font-mono-cnj text-[9px] tracking-[.16em] text-[#9eb6ba]">CONTEXT</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 border-l-2 border-[#f2a65a] bg-[#173744] px-4 py-3 font-mono-cnj text-[10px] uppercase leading-5 tracking-[.12em] text-[#c8d7d8]">
                <span className="text-[#f2a65a]">Signal detected</span><br />Operational reality in view
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-6 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#72979e] lg:left-10">
            <ArrowDownRight className="h-4 w-4 text-[#f2a65a]" /> Scroll to orient
          </div>
        </section>

        <section className="border-b border-[#cedbd9] bg-[#f2f0e8]">
          <div className="mx-auto grid max-w-[1340px] gap-10 px-6 py-20 lg:grid-cols-[.42fr_1fr] lg:px-10 lg:py-28">
            <div>
              <div className="line-accent mb-6" />
              <p className="font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#1b7778]">The premise</p>
            </div>
            <div>
              <h2 className="font-display max-w-4xl text-[clamp(2.3rem,5vw,4.9rem)] font-medium leading-[.98] tracking-[-.065em] text-[#142d3b]">
                Security is only useful when it helps the operation <span className="text-[#1b7778]">stay in control.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-[#50676b]">
                Cyber Njord brings technical depth and a measured point of view to the environments where a standard checklist is not enough. We look at how systems connect, how decisions get made, and what failure would mean in the real world.
              </p>
            </div>
          </div>
        </section>

        <section id="what-we-do" className="bg-[#f8f7f1] px-6 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1340px]">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-5 font-mono-cnj text-[10px] uppercase tracking-[.2em] text-[#1b7778]">01 / Focus areas</p>
                <h2 className="font-display max-w-2xl text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[.95] tracking-[-.07em] text-[#142d3b]">Clear eyes.<br /><span className="text-[#1b7778]">Useful pressure.</span></h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#61777a]">The work is deliberately shaped around the questions that matter to your board, your security team, and the people keeping the process online.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article key={item.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: index * .08 }} className={`service-card border border-[#cedbd9] p-7 ${index === 1 ? 'bg-[#e7f0ed]' : 'bg-[#f2f0e8]'}`}>
                    <div className="mb-14 flex items-start justify-between">
                      <Icon className="h-8 w-8 stroke-[1.25] text-[#1b7778]" />
                      <span className="font-mono-cnj text-xs text-[#9aaead]">{item.number}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-.04em] text-[#142d3b]">{item.title}</h3>
                    <p className="mt-4 min-h-[112px] text-sm leading-7 text-[#61777a]">{item.copy}</p>
                    <div className="mt-8 flex flex-wrap gap-2 border-t border-[#cedbd9] pt-5">
                      {item.tags.map((tag) => <span key={tag} className="font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#1b7778]">{tag}</span>)}
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-[1.4fr_.6fr]">
              <div className="flex items-center justify-between gap-5 border border-[#142d3b] bg-[#142d3b] p-7 text-[#f6f0df]">
                <div>
                  <p className="font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#f2a65a]">For the people accountable</p>
                  <p className="mt-3 max-w-lg text-lg leading-7">A second pair of eyes for security leaders, IT owners, risk teams, and operational stakeholders who need to make a defensible call.</p>
                </div>
                <Gauge className="hidden h-12 w-12 shrink-0 stroke-[1] text-[#61d3c8] sm:block" />
              </div>
              <div className="flex flex-col justify-between border border-[#f2a65a] bg-[#f2a65a] p-7 text-[#142d3b]">
                <Compass className="h-7 w-7 stroke-[1.5]" />
                <p className="mt-8 font-display text-xl font-semibold leading-tight tracking-[-.04em]">Technical enough to go deep. Direct enough to be useful.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="method" className="bg-[#dfece8] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1340px] gap-16 lg:grid-cols-[.65fr_1fr]">
            <div>
              <p className="mb-5 font-mono-cnj text-[10px] uppercase tracking-[.2em] text-[#1b7778]">02 / A working method</p>
              <h2 className="font-display text-[clamp(2.8rem,5vw,5.4rem)] font-medium leading-[.92] tracking-[-.07em] text-[#142d3b]">Find the<br /><span className="text-[#1b7778]">signal.</span></h2>
              <p className="mt-7 max-w-sm text-sm leading-7 text-[#50676b]">Good advice begins before the scan and remains useful after the report. The method is collaborative, evidence-led, and shaped to the level of certainty you actually need.</p>
              <div className="mt-10 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.15em] text-[#1b7778]"><TerminalSquare className="h-4 w-4" /> no theatre, no panic</div>
            </div>
            <div className="border-t border-[#a8c8c2]">
              {approach.map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 border-b border-[#a8c8c2] py-8 sm:grid-cols-[70px_220px_1fr]">
                  <span className="font-mono-cnj text-xs text-[#1b7778]">{number}</span>
                  <h3 className="font-display text-xl font-semibold tracking-[-.04em] text-[#142d3b]">{title}</h3>
                  <p className="text-sm leading-7 text-[#50676b]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roland" className="bg-[#142d3b] px-6 py-24 text-[#f6f0df] lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1340px] gap-14 lg:grid-cols-[.6fr_1fr] lg:items-end">
            <div className="relative min-h-[390px] overflow-hidden border border-[#47717b] bg-[#173744] p-7">
              <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-[#61d3c8]/30" />
              <div className="absolute right-16 top-16 h-20 w-20 rounded-full border border-[#61d3c8]/30" />
              <div className="absolute bottom-8 left-8 h-px w-3/4 bg-[#47717b]" />
              <div className="absolute bottom-12 left-8 h-24 w-px bg-[#47717b]" />
              <div className="relative flex h-full min-h-[335px] flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#61d3c8]">Founder / advisor</span>
                  <ShieldCheck className="h-7 w-7 stroke-[1] text-[#f2a65a]" />
                </div>
                <div>
                  <p className="font-display text-5xl font-medium tracking-[-.08em] text-[#f2a65a]">RP</p>
                  <p className="mt-2 font-mono-cnj text-[10px] uppercase tracking-[.16em] text-[#b9cbd0]">Roland Plaka</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-5 font-mono-cnj text-[10px] uppercase tracking-[.2em] text-[#61d3c8]">03 / The person behind it</p>
              <h2 className="font-display text-[clamp(2.8rem,5vw,5.1rem)] font-medium leading-[.94] tracking-[-.07em]">Experience that<br /><span className="text-[#f2a65a]">crosses boundaries.</span></h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-[#c8d7d8]">Cyber Njord is hosted by Roland Plaka, an experienced cybersecurity and risk assessment professional whose work spans IT, industrial, and finance environments.</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#c8d7d8]">His perspective is shaped by research into critical information infrastructure security — and by the practical question every recommendation must answer: what happens when this system is under pressure?</p>
              <a href="mailto:hello@cybernjord.eu" className="group mt-9 inline-flex items-center gap-3 border-b border-[#f2a65a] pb-2 text-xs font-bold uppercase tracking-[.15em] text-[#f2a65a]" data-testid="link-email-roland">Email Roland <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#f2f0e8] px-6 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto grid max-w-[1340px] gap-16 lg:grid-cols-[.75fr_1fr]">
            <div>
              <div className="line-accent mb-7" />
              <p className="font-mono-cnj text-[10px] uppercase tracking-[.2em] text-[#1b7778]">04 / Make contact</p>
              <h2 className="mt-6 font-display text-[clamp(3rem,6vw,6.4rem)] font-medium leading-[.86] tracking-[-.08em] text-[#142d3b]">Start with<br /><span className="text-[#1b7778]">the situation.</span></h2>
              <p className="mt-8 max-w-md text-base leading-8 text-[#61777a]">You do not need a polished brief. Share what is changing, what feels unclear, or what decision is coming up. We will take it from there.</p>
              <div className="mt-10 flex items-center gap-3 font-mono-cnj text-xs text-[#142d3b]"><span className="h-2 w-2 rounded-full bg-[#1b7778]" /> hello@cybernjord.eu</div>
            </div>
            <form onSubmit={handleSubmit} className="border-t-2 border-[#142d3b] pt-7" data-testid="form-contact">
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block"><span className="font-mono-cnj text-[10px] uppercase tracking-[.16em] text-[#61777a]">Your name</span><input required name="name" type="text" className="mt-3 w-full border-b border-[#9fb5b3] bg-transparent px-0 py-3 text-base text-[#142d3b] outline-none transition-colors placeholder:text-[#9fb5b3] focus:border-[#1b7778]" placeholder="Name" data-testid="input-contact-name" /></label>
                <label className="block"><span className="font-mono-cnj text-[10px] uppercase tracking-[.16em] text-[#61777a]">Work email</span><input required name="email" type="email" className="mt-3 w-full border-b border-[#9fb5b3] bg-transparent px-0 py-3 text-base text-[#142d3b] outline-none transition-colors placeholder:text-[#9fb5b3] focus:border-[#1b7778]" placeholder="you@organisation.eu" data-testid="input-contact-email" /></label>
              </div>
              <label className="mt-8 block"><span className="font-mono-cnj text-[10px] uppercase tracking-[.16em] text-[#61777a]">What is on your mind?</span><textarea required name="brief" rows={4} className="mt-3 w-full resize-none border-b border-[#9fb5b3] bg-transparent px-0 py-3 text-base text-[#142d3b] outline-none transition-colors placeholder:text-[#9fb5b3] focus:border-[#1b7778]" placeholder="A few lines about the environment, the question, or the decision ahead." data-testid="input-contact-brief" /></label>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button type="submit" className="group inline-flex items-center gap-3 bg-[#142d3b] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#f6f0df] transition-transform hover:-translate-y-0.5 hover:bg-[#1b7778]" data-testid="button-submit-contact">Send via email <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
                {sent && <span className="flex items-center gap-2 text-xs text-[#1b7778]" data-testid="status-contact-sent"><Check className="h-4 w-4" /> Your email draft is ready.</span>}
              </div>
              <p className="mt-5 text-xs leading-5 text-[#7a8d8d]">This opens your email client with the details you provide. No information is stored on this site.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#142d3b] px-6 py-10 text-[#b9cbd0] lg:px-10">
        <div className="mx-auto flex max-w-[1340px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div><Wordmark /><p className="mt-5 max-w-xs text-xs leading-6 text-[#72979e]">Cybersecurity for IT, OT, ICS, and the infrastructure that keeps the world moving.</p></div>
          <div className="text-left sm:text-right"><a href="mailto:hello@cybernjord.eu" className="font-mono-cnj text-xs text-[#f2a65a] hover:text-[#ffc47d]" data-testid="link-footer-email">hello@cybernjord.eu</a><p className="mt-3 text-[10px] uppercase tracking-[.14em] text-[#72979e]">© {new Date().getFullYear()} Cyber Njord</p></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;