import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;
export const BASE = import.meta.env.BASE_URL;

export function SceneShell({
  children,
  eyebrow,
  index,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  index: string;
  title: string;
}) {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 100% 0 0%)' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="absolute left-[6vw] top-[5vh] flex items-center gap-[1.1vw]">
        <span className="mono text-[1.05vw] tracking-[.22em] text-[#d8ff6a]">{index}</span>
        <span className="hairline w-[4.5vw]" />
        <span className="mono text-[.9vw] tracking-[.22em] text-[#8ba5aa]">{eyebrow}</span>
      </div>
      <div className="absolute bottom-[5vh] left-[6vw] right-[6vw] flex items-end justify-between">
        <span className="mono text-[.8vw] tracking-[.16em] text-[#6d8384]">CYBER NJORD / RECOVERY SYSTEM</span>
        <span className="mono text-[.8vw] tracking-[.16em] text-[#6d8384]">{title}</span>
      </div>
      {children}
    </motion.section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: '1.4vw', filter: 'blur(7px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectorPill({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'hot' | 'safe' }) {
  const colors = {
    neutral: { border: 'rgba(139,165,170,.35)', text: '#aab9b8', dot: '#8ba5aa' },
    hot: { border: 'rgba(228,124,80,.6)', text: '#f1ad8d', dot: '#e47c50' },
    safe: { border: 'rgba(216,255,106,.48)', text: '#d8ff6a', dot: '#d8ff6a' },
  }[tone];
  return (
    <div className="flex items-center gap-[.65vw] rounded-full border px-[.9vw] py-[.5vw]" style={{ borderColor: colors.border }}>
      <span className="h-[.42vw] w-[.42vw] rounded-full" style={{ backgroundColor: colors.dot }} />
      <span className="mono text-[.78vw] tracking-[.14em]" style={{ color: colors.text }}>{label}</span>
    </div>
  );
}

export function Check({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="flex h-[2vw] w-[2vw] items-center justify-center rounded-full border border-[#d8ff6a]/60 bg-[#d8ff6a]/10 text-[1.1vw] text-[#d8ff6a]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.45, ease: EASE }}
    >
      ✓
    </motion.span>
  );
}
