"use client";

import { useEffect, useId, useRef, useState } from "react";

import { PauseIcon, PlayIcon } from "@/components/icons";
import { formatClock } from "@/lib/format";

/**
 * Plays the hearthis preview of a mix — a minute or so of a set that runs for hours, which is the
 * honest thing the web can offer and the reason the app is the next step.
 *
 * `preload="none"`: nothing is fetched until someone presses play.
 */

/** Only one preview at a time; pressing play on one stops the other. */
let playing: HTMLAudioElement | null = null;

export function MixPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [length, setLength] = useState(0);
  const [failed, setFailed] = useState(false);
  const sliderId = useId();

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (playing === audio) playing = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (playing && playing !== audio) playing.pause();
      playing = audio;
      try {
        await audio.play();
      } catch {
        // Autoplay policies and dead links both land here; the link out still works.
        setFailed(true);
      }
    } else {
      audio.pause();
    }
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = seconds;
    setPosition(seconds);
  };

  const progress = length > 0 ? (position / length) * 100 : 0;

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        type="button"
        onClick={toggle}
        aria-label={`${isPlaying ? "Pause" : "Play"} the preview of ${title}`}
        className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-colors hover:bg-fg hover:text-bg"
      >
        {isPlaying ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5 pl-0.5" />}
      </button>

      <div className="min-w-0 flex-1">
        <label htmlFor={sliderId} className="sr-only">
          Seek within the preview of {title}
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={length || 0}
          step={0.5}
          value={position}
          disabled={!length}
          onChange={(event) => seek(Number(event.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-fg/15 outline-none disabled:cursor-default [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent"
          style={{
            background: `linear-gradient(to right, var(--accent) ${progress}%, color-mix(in oklab, var(--fg) 15%, transparent) ${progress}%)`,
          }}
        />
        <div className="label mt-2 flex items-center justify-between text-subtle">
          <span className="tnum">{formatClock(position)}</span>
          <span>{failed ? "Preview unavailable" : "Preview"}</span>
          <span className="tnum">{length ? formatClock(length) : "--:--"}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setPosition(0);
        }}
        onLoadedMetadata={(event) => {
          const duration = event.currentTarget.duration;
          if (Number.isFinite(duration)) setLength(duration);
        }}
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
