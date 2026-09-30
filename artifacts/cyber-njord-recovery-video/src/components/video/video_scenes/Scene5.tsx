import { motion } from 'framer-motion';
import { Reveal, SceneShell, EASE, SectorPill } from './shared';

export function Scene5() {
  return (
    <SceneShell eyebrow="THE PROOF" index="04" title="VALIDATION">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a1517]" />
        <motion.div className="absolute inset-0 opacity-20" animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} style={{ backgroundImage: 'linear-gradient(135deg, transparent 48%, rgba(216,255,106,.35) 49%, transparent 50%)', backgroundSize: '9vw 9vw' }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
      </div>
      <div className="absolute left-[6vw] top-[21vh] w-[31vw]">
        <Reveal delay={0.15}><p className="mono mb-[1.5vw] text-[.9vw] tracking-[.18em] text-[#d8ff6a]">04 — VALIDATE THE WHOLE SYSTEM</p></Reveal>
        <Reveal delay={0.37}><h2 className="display text-[5.05vw] font-semibold leading-[.9] tracking-[-.07em] text-[#f2f2e9]">Trust is<br /><span className="text-[#d8ff6a]">a test.</span></h2></Reveal>
        <Reveal delay={0.8}><p className="mt-[2vw] max-w-[24vw] text-[1.12vw] leading-[1.4] text-[#aab9b8]">Identity, process, and people. Validation is where a technical recovery becomes an operationally safe one.</p></Reveal>
      </div>
      <div className="absolute right-[8vw] top-[19vh] w-[40vw]">
        <div className="grid grid-cols-[1.1fr_.9fr] gap-[.8vw]">
          <motion.div className="border border-[#d8ff6a]/40 bg-[#0c191b]/88 p-[1.3vw]" initial={{ opacity: 0, rotateY: 8 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ delay: .5, duration: .8 }}>
            <div className="mb-[1.4vw] flex items-center justify-between"><span className="mono text-[.72vw] tracking-[.14em] text-[#8ba5aa]">VALIDATION MATRIX</span><span className="mono text-[.72vw] text-[#d8ff6a]">PASS 12 / 12</span></div>
            {['Identity boundaries', 'Critical process paths', 'Human sign-off'].map((row, i) => (
              <motion.div key={row} className="flex items-center justify-between border-t border-[#8ba5aa]/20 py-[1vw]" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .78 + i * .17 }}>
                <span className="text-[1.05vw] text-[#f2f2e9]">{row}</span><span className="mono text-[.72vw] text-[#d8ff6a]">VERIFIED</span>
              </motion.div>
            ))}
            <div className="mt-[1.2vw] h-[.42vw] w-full bg-[#1b3030]"><motion.div className="h-full bg-[#d8ff6a]" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 1.25, duration: 1.1, ease: EASE }} /></div>
          </motion.div>
          <div className="space-y-[.8vw]">
            {[
              { sector: 'FINANCIAL', note: 'Ledger paths open', icon: '01' },
              { sector: 'OT / ICS', note: 'Control loops stable', icon: '02' },
              { sector: 'EDUCATION', note: 'Learning systems ready', icon: '03' },
            ].map((card, i) => (
              <motion.div key={card.sector} className="border border-[#8ba5aa]/25 bg-[#0c191b]/88 p-[1.05vw]" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 + i * .16, duration: .5 }}>
                <div className="mb-[1vw] flex items-center justify-between"><SectorPill label={card.sector} tone="safe" /><span className="mono text-[.68vw] text-[#6d8384]">{card.icon}</span></div>
                <p className="text-[1vw] text-[#f2f2e9]">{card.note}</p>
                <div className="mt-[.75vw] flex gap-[.18vw]">{[1,2,3,4,5,6,7,8].map((n) => <motion.i key={n} className="h-[.25vw] flex-1 bg-[#d8ff6a]/60" animate={{ opacity: [.3, 1, .3] }} transition={{ duration: 1.7, delay: n * .06, repeat: Infinity }} />)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
