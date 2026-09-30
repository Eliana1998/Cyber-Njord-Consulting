import { motion } from 'framer-motion';
import { Reveal, SceneShell, SectorPill } from './shared';

export function Scene2() {
  return (
    <SceneShell eyebrow="THE INCIDENT" index="01" title="DISRUPTION">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_48%,rgba(228,124,80,.14),transparent_28%),linear-gradient(135deg,#0b1114,#141a1b)]" />
      <motion.div className="grid-lines absolute inset-0 opacity-70" animate={{ backgroundPosition: ['0vw 0vh', '5vw 3vh'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-[6vw] top-[22vh] w-[31vw]">
        <Reveal delay={0.2}><p className="mono mb-[1.5vw] text-[.9vw] tracking-[.18em] text-[#e47c50]">01 — DISRUPTION DETECTED</p></Reveal>
        <Reveal delay={0.42}><h2 className="display text-[5.5vw] font-semibold leading-[.88] tracking-[-.07em] text-[#f2f2e9]">The day<br />goes <span className="text-[#e47c50]">off-script.</span></h2></Reveal>
        <Reveal delay={0.83}><p className="mt-[2vw] max-w-[24vw] text-[1.12vw] leading-[1.4] text-[#aab9b8]">Systems slow. Access fragments. The first response is not panic — it is a clean read of what changed.</p></Reveal>
      </div>
      <div className="absolute right-[8vw] top-[19vh] w-[40vw]">
        <div className="relative h-[54vh] border border-[#e47c50]/35 bg-[#0b1114]/70 p-[1.1vw]">
          <div className="absolute -left-[.5vw] top-[11vh] h-[.6vw] w-[.6vw] rounded-full bg-[#e47c50] shadow-[0_0_0_8px_rgba(228,124,80,.12)]" />
          <div className="mb-[1.7vw] flex items-center justify-between border-b border-[#8ba5aa]/25 pb-[1vw]">
            <span className="mono text-[.78vw] tracking-[.18em] text-[#8ba5aa]">OBSERVABILITY / LIVE</span>
            <span className="mono text-[.8vw] text-[#e47c50]">SIGNAL DEGRADED</span>
          </div>
          <div className="grid grid-cols-3 gap-[.7vw]">
            {['FINANCIAL', 'OT / ICS', 'EDUCATION'].map((label, i) => (
              <motion.div key={label} className="border border-[#e47c50]/45 bg-[#e47c50]/[.06] p-[.9vw]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * .12, duration: .45 }}>
                <SectorPill label={label} tone="hot" />
                <div className="mt-[1.3vw] flex h-[7vw] items-end gap-[.28vw]">
                  {[32, 48, 24, 64, 48, 77, 58, 86, 62, 91, 78].map((h, j) => (
                    <motion.span key={j} className="w-[.35vw] bg-[#e47c50]/70" style={{ height: `${h}%` }} animate={{ scaleY: [1, .42, 1.1] }} transition={{ duration: 1.4 + j * .03, repeat: Infinity, ease: 'easeInOut' }} />
                  ))}
                </div>
                <p className="mono mt-[1vw] text-[.68vw] tracking-[.1em] text-[#e47c50]">{i === 0 ? 'AUTH / QUEUED' : i === 1 ? 'CONTROL / ALERT' : 'IDENTITY / LOST'}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="absolute left-0 top-[11.2vh] h-px w-full bg-[#e47c50]" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.7, repeat: Infinity, ease: 'linear' }} />
          <p className="absolute bottom-[1.1vw] left-[1.1vw] mono text-[.72vw] tracking-[.13em] text-[#6d8384]">EVENT WINDOW / 02:14:09 UTC</p>
        </div>
      </div>
    </SceneShell>
  );
}
