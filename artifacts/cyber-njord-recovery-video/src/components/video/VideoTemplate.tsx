import {
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

const SCENE_DURATIONS = {
  opening: 4200,
  disruption: 3900,
  containment: 4300,
  restore: 4300,
  validation: 4300,
  return: 5200,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      className="video-root"
    >
      <div className="noise absolute inset-0 z-30" />
      <div className="pointer-events-none absolute inset-0 z-20">
        <motion.div
          className="absolute left-[6vw] top-[11vh] h-[.2vw] w-[23vw] bg-[#d8ff6a]/35"
          animate={{ width: currentScene === 0 ? '23vw' : currentScene === 5 ? '38vw' : '30vw', opacity: currentScene === 1 ? 0.2 : 0.55 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute right-[6vw] top-[5vh] flex items-center gap-[.7vw]"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="mono text-[.72vw] tracking-[.18em] text-[#8ba5aa]">NJORD /</span>
          <span className="display text-[1.25vw] font-semibold tracking-[-.08em] text-[#d8ff6a]">CN</span>
        </motion.div>
        <motion.div
          className="absolute right-[-8vw] top-[16vh] h-[42vw] w-[42vw] rounded-full border border-[#d8ff6a]/10"
          animate={{ x: currentScene * -1.2 + 'vw', y: currentScene % 2 ? '1.5vw' : '-1vw', rotate: currentScene * 12 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute bottom-[7vh] left-[6vw] right-[6vw] flex items-center justify-between"
          animate={{ opacity: currentScene === 1 ? 0.35 : 0.8 }}
          transition={{ duration: .6 }}
        >
          <span className="mono text-[.68vw] tracking-[.16em] text-[#6d8384]">RECOVERY TELEMETRY</span>
          <div className="flex items-center gap-[.35vw]">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <motion.span
                key={item}
                className="h-[.3vw] w-[.3vw] rounded-full bg-[#d8ff6a]"
                animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.25, 1] }}
                transition={{ duration: 1.4 + item * .05, delay: item * .08, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence mode="sync" initial={false}>
        {currentScene === 0 && <Scene1 key="opening" />}
        {currentScene === 1 && <Scene2 key="disruption" />}
        {currentScene === 2 && <Scene3 key="containment" />}
        {currentScene === 3 && <Scene4 key="restore" />}
        {currentScene === 4 && <Scene5 key="validation" />}
        {currentScene === 5 && <Scene6 key="return" />}
      </AnimatePresence>
    </VideoCanvas>
  );
}
