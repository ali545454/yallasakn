import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

type VideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean; // if false we'll show our custom controls
};

export default function VideoPlayer({
  src,
  poster,
  className = '',
  autoplay = false,
  loop = false,
  muted = false,
  controls = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [progress, setProgress] = useState<number>(0); // 0 - 100
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState<boolean>(muted);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      setCurrentTime(v.currentTime);
      setProgress((v.currentTime / (v.duration || 1)) * 100);
    };

    const onLoaded = () => {
      setDuration(v.duration || 0);
    };

    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        setIsPlaying(true);
      } else {
        v.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      // autoplay might be blocked
      console.warn('Play failed', e);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    setProgress(val);
    v.currentTime = (val / 100) * (v.duration || 1);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    setIsMuted((m) => !m);
    if (isMuted) setVolume(1);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div ref={containerRef} className={`w-full max-w-full ${className}`}>
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-md">
        {/* Video element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-auto block"
          autoPlay={autoplay}
          loop={loop}
          controls={controls}
          playsInline
        />

        {/* Custom controls (if controls=false) */}
        {!controls && (
          <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
            {/* top overlay (optional) */}
            <div className="pointer-events-auto px-4 pt-4 flex justify-between items-start">
              {/* you can place title or badges here if needed */}
            </div>

            {/* center big play button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={togglePlay}
                className="pointer-events-auto bg-white/90 dark:bg-gray-800/80 p-3 rounded-full shadow-lg flex items-center justify-center"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
            </div>

            {/* bottom controls */}
            <div className="pointer-events-auto bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 py-3">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} aria-label="play/pause" className="p-2 rounded-md">
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} aria-label="mute" className="p-2 rounded-md">
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1"
                  />
                </div>

                <div className="text-xs text-white/90 w-28">{formatTime(currentTime)} / {formatTime(duration)}</div>

                <div className="flex-1">
                  <input
                    aria-label="progress"
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={handleProgressChange}
                    className="w-full h-1 appearance-none"
                  />
                </div>

                <button onClick={toggleFullscreen} aria-label="fullscreen" className="p-2 rounded-md">
                  {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* small caption about usage (non-code) */}
    </div>
  );
}
