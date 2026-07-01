import styles from "./loginModal.module.css";

interface ProfileAvatarProps {
  initial?: string;
  size?: "sm" | "md";
}

export default function ProfileAvatar({
  initial = "E",
  size = "md",
}: ProfileAvatarProps) {
  return (
    <div
      className={`${styles.avatar} ${size === "sm" ? styles.avatarSm : ""}`}
      aria-hidden="true"
    >
      {initial.charAt(0).toUpperCase()}
    </div>
  );
}
