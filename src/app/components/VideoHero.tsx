"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./VideoHero.module.css";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const setMuted = useCallback((muted: boolean) => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
      video.volume = muted ? 0 : 1;
    }
    setIsMuted(muted);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlayWithSound = () => {
      video.muted = false;
      video.volume = 1;
      return video.play();
    };

    tryPlayWithSound()
      .then(() => setIsMuted(false))
      .catch(() => {
        video.muted = true;
        video.play().catch(() => {});
        setIsMuted(true);
      });

    const enableSound = () => {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
      setIsMuted(false);
    };

    window.addEventListener("click", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };
  }, []);

  const toggleMute = () => {
    setMuted(!isMuted);
    videoRef.current?.play().catch(() => {});
  };

  return (
    <section className={styles.hero} aria-label="Hero video">
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/make_a_video_make_perfume_el.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        className={styles.muteBtn}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX size={20} strokeWidth={1.75} /> : <Volume2 size={20} strokeWidth={1.75} />}
      </button>
    </section>
  );
}
