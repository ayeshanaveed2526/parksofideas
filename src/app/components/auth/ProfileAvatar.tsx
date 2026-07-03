import { User } from "lucide-react";
import styles from "./loginModal.module.css";

interface ProfileAvatarProps {
  initial?: string;
  size?: "sm" | "md";
  imageUrl?: string | null;
}

export default function ProfileAvatar({
  initial = "E",
  size = "md",
  imageUrl,
}: ProfileAvatarProps) {
  if (imageUrl) {
    return (
      <div
        className={`${styles.avatar} ${size === "sm" ? styles.avatarSm : ""} overflow-hidden p-0`}
        aria-hidden="true"
      >
        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${styles.avatar} ${size === "sm" ? styles.avatarSm : ""}`}
      aria-hidden="true"
    >
      {size === "sm" ? <User size={18} strokeWidth={2} /> : initial.charAt(0).toUpperCase()}
    </div>
  );
}
