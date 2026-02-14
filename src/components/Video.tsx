"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section id="video" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Video de <span className="gradient-text">presentacion</span>
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Conoceme un poco mas alla del codigo
        </p>

        <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
          <video
            ref={videoRef}
            src="/video-presentacion.mp4"
            controls
            className="w-full aspect-video"
            poster=""
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            preload="metadata"
          />
          {!playing && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play size={28} className="text-white ml-1" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
