import { motion } from 'framer-motion';
import { Reveal, SceneShell, BASE, EASE } from './shared';

export function Scene3() {
  return (
    <SceneShell eyebrow="THE RESPONSE" index="02" title="CONTAINMENT">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_54%,rgba(216,255,106,.1),transparent_30%),#0a1517]" />
      <motion.div className="absolute right-0 top-0 h-full w-[47vw] opacity-15" animate={{ scale: [1.02, 1, 1.02] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}>
        <img className="h-full w-full object-cover grayscale" src={`${BASE}assets/industrial-control-room.jpg`} alt="" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a1517_8%,rgba(10,21,23,.75)_62%,rgba(10,21,23,.2))]" />
      <motion.div className="absolute left-[14vw] top-[18vh] h-[48vw] w-[48vw] rounded-full border border-[#d8ff6a]/10" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute left-[25vw] top-[29vh] h-[26vw] w-[26vw] rounded-full border border-[#d8ff6a]/20" animate={{ rotate: -360 }} transition={{ duration: 21, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-[6vw] top-[22vh] w-[31vw]">
        <Reveal delay={0.16}><p className="mono mb-[1.5vw] text-[.9vw] tracking-[.18em] text-[#d8ff6a]">02 — BOUND THE BLAST RADIUS</p></Reveal>
        <Reveal delay={0.38}><h2 className="display text-[5.2vw] font-semibold leading-[.9] tracking-[-.07em] text-[#f2f2e9]">Make the<br /><span className="text-[#d8ff6a]">safe zone.</span></h2></Reveal>
        <Reveal delay={0.8}><p className="mt-[2vw] max-w-[23vw] text-[1.12vw] leading-[1.4] text-[#aab9b8]">Segment the incident. Preserve evidence. Keep the critical path moving while the recovery path gets quiet.</p></Reveal>
      </div>
      <div className="absolute right-[9vw] top-[20vh] w-[36vw]">
        <motion.div className="relative h-[46vh] border border-[#d8ff6a]/35 bg-[#0b171a]/90 p-[1.3vw]" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} transition={{ delay: .55, duration: .75, ease: EASE }}>
          <div className="flex items-center justify-between border-b border-[#8ba5aa]/25 pb-[1vw]">
            <span className="mono text-[.78vw] tracking-[.18em] text-[#8ba5aa]">CONTAINMENT MAP</span>
            <span className="mono text-[.78vw] text-[#d8ff6a]">ISOLATED / 03</span>
          </div>
          <div className="relative mt-[2.4vw] h-[26vh]">
            <motion.div className="absolute left-[21%] top-[22%] h-[11vw] w-[11vw] rounded-full border border-[#d8ff6a]/30" animate={{ scale: [1, 1.08, 1], opacity: [.7, 1, .7] }} transition={{ duration: 2.6, repeat: Infinity }} />
            <motion.div className="absolute left-[39%] top-[39%] h-[5.8vw] w-[5.8vw] rounded-full bg-[#d8ff6a]/15 ring-1 ring-[#d8ff6a]/80" animate={{ boxShadow: ['0 0 0 0 rgba(216,255,106,.25)', '0 0 0 22px rgba(216,255,106,0)', '0 0 0 0 rgba(216,255,106,0)'] }} transition={{ duration: 2, repeat: Infinity }} />
            {[['FINANCIAL', 4, 5], ['OT / ICS', 73, 16], ['EDUCATION', 63, 72]].map(([label, left, top], i) => (
              <motion.div key={String(label)} className="absolute" style={{ left: `${left}%`, top: `${top}%` }} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .85 + i * .16, duration: .4, ease: EASE }}>
                <div className="mb-[.6vw] h-[1.4vw] w-[1.4vw] rounded-full border border-[#d8ff6a] bg-[#d8ff6a]/20" />
                <span className="mono whitespace-nowrap text-[.65vw] tracking-[.12em] text-[#aab9b8]">{label}</span>
              </motion.div>
            ))}
            <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 500 240" preserveAspectRatio="none">
              <path d="M100 100 L250 130 L405 35 M250 130 L385 200" stroke="#d8ff6a" strokeDasharray="8 10" fill="none" />
            </svg>
          </div>
          <div className="mt-[1vw] grid grid-cols-2 gap-[.7vw]">
            <div className="border border-[#8ba5aa]/25 p-[.85vw]"><p className="mono text-[.68vw] text-[#6d8384]">ACCESS</p><p className="mt-[.45vw] text-[1vw] text-[#d8ff6a]">REVOKED</p></div>
            <div className="border border-[#8ba5aa]/25 p-[.85vw]"><p className="mono text-[.68vw] text-[#6d8384]">EVIDENCE</p><p className="mt-[.45vw] text-[1vw] text-[#d8ff6a]">PRESERVED</p></div>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
