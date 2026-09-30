import { motion } from 'framer-motion';
import { Reveal, SceneShell, BASE, SectorPill } from './shared';

export function Scene1() {
  return (
    <SceneShell eyebrow="A RESILIENCE STORY" index="00" title="NORDIC RECOVERY ATLAS">
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0 opacity-40" animate={{ scale: [1.04, 1, 1.04] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <img className="h-full w-full object-cover grayscale" src={`${BASE}assets/finance-district.jpg`} alt="" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071114_15%,rgba(7,17,20,.72)_56%,rgba(7,17,20,.2)),linear-gradient(0deg,#071114_2%,transparent_60%)]" />
      </div>
      <motion.div className="grid-lines absolute inset-0" animate={{ x: ['0vw', '-5vw'] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-[6vw] top-[22vh] w-[48vw]">
        <Reveal delay={0.2}>
          <div className="mb-[2.1vw] flex items-center gap-[1vw]">
            <span className="h-[.6vw] w-[.6vw] rounded-full bg-[#d8ff6a]" />
            <span className="mono text-[.95vw] tracking-[.2em] text-[#d8ff6a]">CYBER NJORD</span>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <h1 className="display max-w-[47vw] text-[6.8vw] font-semibold leading-[.88] tracking-[-.07em] text-[#f2f2e9]">
            When the<br /><span className="text-[#d8ff6a]">signal breaks.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.82}>
          <p className="mt-[2.2vw] max-w-[26vw] text-[1.25vw] leading-[1.35] text-[#aab9b8]">
            A controlled path from cyber disruption to confident operation.
          </p>
        </Reveal>
      </div>
      <Reveal delay={1.12} className="absolute right-[7vw] top-[27vh]">
        <div className="w-[20vw] border border-[#8ba5aa]/35 bg-[#0b171a]/75 p-[1.25vw] backdrop-blur-sm">
          <div className="mb-[1.4vw] flex items-center justify-between">
            <span className="mono text-[.72vw] tracking-[.16em] text-[#8ba5aa]">THREE LIVING SYSTEMS</span>
            <span className="mono text-[.72vw] text-[#6d8384]">01 / 03</span>
          </div>
          <div className="flex flex-wrap gap-[.55vw]">
            <SectorPill label="FINANCIAL" />
            <SectorPill label="OT / ICS" />
            <SectorPill label="EDUCATION" />
          </div>
          <div className="mt-[1.4vw] h-[.25vw] w-full overflow-hidden bg-[#1c3030]">
            <motion.div className="h-full w-[38%] bg-[#d8ff6a]" animate={{ x: ['-100%', '270%'] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        </div>
      </Reveal>
    </SceneShell>
  );
}
