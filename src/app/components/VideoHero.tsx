"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./VideoHero.module.css";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, []);

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
        <source src="/Generate_a_elegant_videos_of_p.mp4" type="video/mp4" />
      </video>

    </section>
  );
}
