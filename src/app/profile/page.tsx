"use client";

import React, { useState, useRef } from "react";
import ProfileLayout from "../components/profile/ProfileLayout";
import { useLoginModal } from "../components/auth/LoginModalProvider";
import { Camera, Check } from "lucide-react";
import styles from "../components/profile/profile.module.css";
import Image from "next/image";
import ProfileAvatar from "../components/auth/ProfileAvatar";

export default function ProfilePage() {
  const { user, updateUser } = useLoginModal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, initial: name ? name.charAt(0).toUpperCase() : "A" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateUser({ profilePhoto: url });
    }
  };

  return (
    <ProfileLayout>
      <h1 className={styles.sectionTitle}>My Profile</h1>
      <p className={styles.sectionDesc}>Update your personal information and profile photo.</p>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center">
              {user?.profilePhoto ? (
                <Image src={user.profilePhoto} alt="Profile" fill className="object-cover" />
              ) : (
                <ProfileAvatar initial={user?.initial || "A"} size="md" />
              )}
            </div>
            <button
              type="button"
              onClick={handlePhotoClick}
              className="absolute bottom-0 right-0 w-10 h-10 bg-[#00089d] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#000470] transition-colors border-2 border-white"
              aria-label="Change profile photo"
            >
              <Camera size={18} strokeWidth={2} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <p className="text-sm font-medium text-gray-500">Allowed: JPG, PNG</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-lg flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="profileName" className="text-sm font-semibold text-gray-800">Full Name</label>
            <input
              id="profileName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-xl focus:border-[#00089d] focus:ring-2 focus:ring-[#00089d]/20 outline-none transition-all text-sm"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="profileEmail" className="text-sm font-semibold text-gray-800">Email Address</label>
            <input
              id="profileEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-xl focus:border-[#00089d] focus:ring-2 focus:ring-[#00089d]/20 outline-none transition-all text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="profilePhone" className="text-sm font-semibold text-gray-800">Phone Number (Optional)</label>
            <input
              id="profilePhone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-4 border border-gray-200 rounded-xl focus:border-[#00089d] focus:ring-2 focus:ring-[#00089d]/20 outline-none transition-all text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="poi-btn w-auto py-3 px-8 text-sm"
            >
              Save Changes
            </button>
          </div>

          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm mt-2">
              <Check size={16} />
              Profile updated successfully!
            </div>
          )}
        </form>
      </div>
    </ProfileLayout>
  );
}
