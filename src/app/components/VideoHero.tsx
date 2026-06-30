"use client";

import { useEffect, useRef } from "react";
import styles from "./VideoHero.module.css";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1;
    video.muted = false;

    const tryPlayWithSound = () => {
      video.muted = false;
      video.volume = 1;
      return video.play();
    };

    tryPlayWithSound().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    const enableSound = () => {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    };

    window.addEventListener("click", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero video">
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source src="/make_a_video_make_perfume_el.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
