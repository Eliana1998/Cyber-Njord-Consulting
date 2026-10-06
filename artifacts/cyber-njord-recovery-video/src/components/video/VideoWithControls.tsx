import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Repeat,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  opening: { title: 'Opening', filePath: 'src/components/video/video_scenes/Scene1.tsx' },
  disruption: { title: 'Disruption', filePath: 'src/components/video/video_scenes/Scene2.tsx' },
  containment: { title: 'Containment', filePath: 'src/components/video/video_scenes/Scene3.tsx' },
  restore: { title: 'Restore', filePath: 'src/components/video/video_scenes/Scene4.tsx' },
  validation: { title: 'Validation', filePath: 'src/components/video/video_scenes/Scene5.tsx' },
  return: { title: 'Return to operation', filePath: 'src/components/video/video_scenes/Scene6.tsx' },
};

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;
  window.parent.postMessage({
    type: 'REPLIT_VIDEO_SCENE_SELECTED',
    payload: {
      sceneIndex: index,
      sceneCount: sceneKeys.length,
      sceneTitle: details.title || key,
      filePath: details.filePath,
      lineNumber: 1,
    },
  }, '*');
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const {
    sceneKeys, activeIndex, locked, paused, mountKey, tick,
    durations, activeDuration, activeStartTime, totalDuration,
    onSceneChange, jumpTo, toggleLock, togglePause,
  } = useSceneControls(SCENE_DURATIONS);

  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);

  const handleJumpTo = useCallback((index: number) => {
    jumpTo(index);
    announceSceneSelection(index, sceneKeys);
  }, [jumpTo, sceneKeys]);

  const handlePointerEnter = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  }, []);
  const handlePointerLeave = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  }, []);
  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
  }, [collapsed]);

  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((value) => {
      if (!value) {
        setHovering(false);
        setTapPinned(false);
      }
      return !value;
    });
  }, []);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      const sensor = sensorRef.current;
      if (sensor && !sensor.contains(event.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [collapsed, tapPinned]);

  useEffect(() => {
    if (!paused) return;
    const frozen = document.getAnimations().filter((animation) => animation.playState === 'running');
    frozen.forEach((animation) => animation.pause());
    return () => frozen.forEach((animation) => animation.play());
  }, [paused]);

  if (!isIframed) return <VideoTemplate />;

  const barVisible = !collapsed || hovering || tapPinned;
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop
        paused={paused}
        onSceneChange={onSceneChange}
      />
      <div
        ref={sensorRef}
        className="absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end"
        style={{ height: '25%' }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <div className="w-full flex-1" aria-hidden="true" />
        <div className={`flex items-center gap-1.5 bg-black/65 px-2 py-2 text-white backdrop-blur-sm transition-all duration-200 sm:gap-3 sm:px-5 sm:py-4 ${barVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`} aria-hidden={!barVisible}>
          <button
            type="button"
            onClick={togglePause}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white sm:h-14 sm:w-14"
            title={paused ? 'Play' : 'Pause'}
            aria-label={paused ? 'Play video' : 'Pause video'}
          >{paused ? <Play className="h-5 w-5 sm:h-8 sm:w-8" /> : <Pause className="h-5 w-5 sm:h-8 sm:w-8" />}</button>
          <button
            type="button"
            onClick={toggleLock}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md sm:h-14 sm:w-14 ${locked ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            title={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
            aria-label={locked ? 'Stop looping current scene' : 'Loop current scene'}
            aria-pressed={locked}
          ><Repeat className="h-5 w-5 sm:h-8 sm:w-8" /></button>
          <div className="h-7 w-px shrink-0 bg-white/20 sm:h-10" aria-hidden="true" />
          <PlaybackStatus
            sceneKeys={sceneKeys}
            activeIndex={activeIndex}
            activeDuration={activeDuration}
            activeStartTime={activeStartTime}
            totalDuration={totalDuration}
            tick={tick}
            paused={paused}
            onJumpTo={handleJumpTo}
          />
          <button
            type="button"
            onClick={handleToggleCollapsed}
            className="flex h-9 w-8 shrink-0 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white sm:h-14 sm:w-14"
            title={collapsed ? 'Show controls' : 'Hide controls'}
            aria-label={collapsed ? 'Show controls' : 'Hide controls'}
            aria-expanded={!collapsed}
          >{collapsed ? <ChevronUp className="h-6 w-6 sm:h-10 sm:w-10" /> : <ChevronDown className="h-6 w-6 sm:h-10 sm:w-10" />}</button>
        </div>
      </div>
    </div>
  );
}

function PlaybackStatus({
  sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick, paused, onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      setElapsed(elapsedBaseRef.current + performance.now() - startedAt);
    }, 60);
    return () => {
      window.clearInterval(timer);
      elapsedBaseRef.current += performance.now() - startedAt;
    };
  }, [tick, paused]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const currentTime = Math.min(totalDuration, activeStartTime + Math.min(elapsed, activeDuration));
  return (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        {sceneKeys.map((key, index) => (
          <button
            type="button"
            key={key}
            onClick={() => onJumpTo(index)}
            className="relative h-2 min-w-1 flex-1 overflow-hidden rounded-full bg-white/25 transition-all hover:h-3"
            aria-label={`Jump to scene ${index + 1}: ${SCENE_DETAILS[key]?.title ?? key}`}
            aria-current={activeIndex === index ? 'true' : undefined}
          >
            <span className="absolute inset-y-0 left-0 rounded-full bg-[#d8ff6a]" style={{ width: activeIndex === index ? `${progress * 100}%` : '0%' }} />
          </button>
        ))}
      </div>
      <span className="shrink-0 font-mono text-[10px] text-white/65 sm:text-xl" aria-label={`Scene ${activeIndex + 1} of ${sceneKeys.length}`}>{activeIndex + 1}/{sceneKeys.length}</span>
      <span className="hidden min-w-[8ch] shrink-0 text-right font-mono text-xs tabular-nums text-white/80 sm:block sm:min-w-[11ch] sm:text-xl" role="timer" aria-label={`Playback time ${formatTime(currentTime)} of ${formatTime(totalDuration)}`}>
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </span>
    </>
  );
}

function formatTime(durationMs: number) {
  const seconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
