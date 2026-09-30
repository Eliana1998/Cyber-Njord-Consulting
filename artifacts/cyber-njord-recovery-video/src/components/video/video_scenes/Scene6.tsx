import { motion } from 'framer-motion';
import { Reveal, SceneShell, SectorPill, BASE } from './shared';

export function Scene6() {
  return (
    <SceneShell eyebrow="THE RETURN" index="05" title="SAFE TO OPERATE">
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0 opacity-38" animate={{ scale: [1.05, 1, 1.05] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <img className="h-full w-full object-cover" src={`${BASE}assets/education-campus.jpg`} alt="" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071114_15%,rgba(7,17,20,.76)_58%,rgba(7,17,20,.15)),linear-gradient(0deg,#071114_2%,transparent_65%)]" />
      </div>
      <motion.div className="absolute bottom-[14vh] left-[6vw] right-[6vw] h-px bg-[#d8ff6a]/55" animate={{ scaleX: [0, 1, 1], transformOrigin: ['0% 50%', '0% 50%', '0% 50%'] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeOut' }} />
      <div className="absolute left-[6vw] top-[21vh] w-[47vw]">
        <Reveal delay={0.14}><div className="mb-[1.8vw] flex items-center gap-[.8vw]"><span className="h-[.65vw] w-[.65vw] rounded-full bg-[#d8ff6a]" /><span className="mono text-[.9vw] tracking-[.18em] text-[#d8ff6a]">RECOVERY COMPLETE / RETURN AUTHORIZED</span></div></Reveal>
        <Reveal delay={0.38}><h2 className="display text-[6vw] font-semibold leading-[.86] tracking-[-.075em] text-[#f2f2e9]">Back to<br /><span className="text-[#d8ff6a]">safe operation.</span></h2></Reveal>
        <Reveal delay={.86}><p className="mt-[2.3vw] max-w-[27vw] text-[1.17vw] leading-[1.4] text-[#aab9b8]">Cyber Njord turns the worst day into a rehearsed route home — across every system that keeps a community running.</p></Reveal>
      </div>
      <Reveal delay={1.05} className="absolute right-[8vw] top-[28vh] w-[20vw] border border-[#d8ff6a]/35 bg-[#0b171a]/72 p-[1.25vw] backdrop-blur-sm">
        <div className="mb-[1.3vw] flex items-center justify-between"><span className="mono text-[.72vw] tracking-[.15em] text-[#8ba5aa]">STATUS</span><span className="mono text-[.72vw] text-[#d8ff6a]">ALL CLEAR</span></div>
        <div className="flex flex-wrap gap-[.55vw]"><SectorPill label="FINANCIAL" tone="safe" /><SectorPill label="OT / ICS" tone="safe" /><SectorPill label="EDUCATION" tone="safe" /></div>
        <div className="mt-[1.4vw] flex items-center gap-[.8vw] border-t border-[#8ba5aa]/25 pt-[1vw]"><div className="h-[2.4vw] w-[2.4vw] rounded-full border border-[#d8ff6a] bg-[#d8ff6a]/15 p-[.4vw]"><div className="h-full w-full rounded-full bg-[#d8ff6a]" /></div><div><p className="text-[1vw] text-[#f2f2e9]">Continuity restored</p><p className="mono mt-[.25vw] text-[.68vw] tracking-[.12em] text-[#6d8384]">MONITORED / VERIFIED</p></div></div>
      </Reveal>
      <motion.div className="absolute right-[6vw] bottom-[11vh] mono text-[.8vw] tracking-[.18em] text-[#d8ff6a]" animate={{ opacity: [.35, 1, .35] }} transition={{ duration: 2.2, repeat: Infinity }}>CYBER NJORD / TRUST THE RETURN</motion.div>
    </SceneShell>
  );
}
