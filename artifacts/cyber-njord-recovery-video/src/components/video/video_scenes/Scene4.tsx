import { motion } from 'framer-motion';
import { Reveal, SceneShell, EASE, Check } from './shared';

export function Scene4() {
  const steps = ['Known-good image selected', 'Recovery sequence replayed', 'Integrity hash confirmed'];
  return (
    <SceneShell eyebrow="THE RESTORE" index="03" title="VERIFIED RESTORE">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#0a1517,#152526_56%,#101b1c)]" />
      <motion.div className="absolute right-[-8vw] top-[-22vw] h-[58vw] w-[58vw] rounded-full border border-[#d8ff6a]/10" animate={{ rotate: [0, 18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute left-[6vw] top-[21vh] w-[34vw]">
        <Reveal delay={0.18}><p className="mono mb-[1.5vw] text-[.9vw] tracking-[.18em] text-[#d8ff6a]">03 — RESTORE WITH PROOF</p></Reveal>
        <Reveal delay={0.4}><h2 className="display text-[5.05vw] font-semibold leading-[.9] tracking-[-.07em] text-[#f2f2e9]">Not just<br /><span className="text-[#d8ff6a]">back online.</span></h2></Reveal>
        <Reveal delay={0.84}><p className="mt-[2vw] max-w-[24vw] text-[1.12vw] leading-[1.4] text-[#aab9b8]">A restore earns trust when every layer is traceable, replayable, and verified before it reconnects.</p></Reveal>
      </div>
      <div className="absolute right-[10vw] top-[19vh] w-[36vw]">
        <div className="mb-[1.3vw] flex justify-between"><span className="mono text-[.72vw] tracking-[.16em] text-[#8ba5aa]">RECOVERY PIPELINE</span><span className="mono text-[.72vw] text-[#d8ff6a]">RUN 0047</span></div>
        <div className="relative border-l border-[#d8ff6a]/45 pl-[2.3vw]">
          <motion.div className="absolute left-[-.18vw] top-0 h-[.38vw] w-[.38vw] rounded-full bg-[#d8ff6a]" animate={{ y: ['0vw', '21vw'] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }} />
          {steps.map((step, i) => (
            <motion.div key={step} className="relative mb-[1.5vw] flex items-center gap-[1.2vw] border border-[#8ba5aa]/25 bg-[#0b171a]/70 p-[1.1vw]" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .55 + i * .2, duration: .55, ease: EASE }}>
              <Check delay={.75 + i * .2} />
              <div><p className="text-[1.08vw] text-[#f2f2e9]">{step}</p><p className="mono mt-[.35vw] text-[.68vw] tracking-[.12em] text-[#6d8384]">{i === 0 ? 'VAULT / 04:16:22 UTC' : i === 1 ? 'ORCHESTRATOR / 04:19:08 UTC' : 'ATTESTATION / 04:22:41 UTC'}</p></div>
            </motion.div>
          ))}
        </div>
        <Reveal delay={1.55} className="mt-[1vw] flex items-center justify-between border-t border-[#d8ff6a]/30 pt-[1vw]">
          <span className="mono text-[.75vw] tracking-[.14em] text-[#aab9b8]">RESTORE CONFIDENCE</span>
          <span className="display text-[2vw] font-semibold text-[#d8ff6a]">100%</span>
        </Reveal>
      </div>
    </SceneShell>
  );
}
