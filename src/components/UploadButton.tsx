"use client";

import { useState } from "react";
import { storage, db } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";

export default function UploadButton() {
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const triggerHeartExplosion = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#fda4af'], // Rose and Pink
        shapes: ['heart'], // Actual Heart shapes!
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#fda4af'],
        shapes: ['heart'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const uniqueName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `uploads/${uniqueName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "photos"), {
        url: downloadURL,
        caption: caption,
        createdAt: serverTimestamp(),
      });

      setCaption("");
      triggerHeartExplosion(); // <--- THE MAGIC HAPPENS HERE
      
      // Optional: Delay the alert slightly so they see the hearts first
      setTimeout(() => alert("Sent with love! ❤️"), 500);
      
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative z-20 flex flex-col items-center gap-4 w-full max-w-sm mx-auto p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-rose-100 transform transition-all hover:scale-[1.02]">
      
      <input
        type="text"
        placeholder="Write a wish for the couple..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900 placeholder:text-rose-400 text-center font-serif transition-all focus:bg-white"
      />

      <label className={`
        relative w-full flex items-center justify-center px-8 py-3 
        bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-lg rounded-xl
        cursor-pointer shadow-lg shadow-rose-200 transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl active:scale-95
        ${uploading ? "opacity-75 cursor-wait" : "hover:rotate-1"}
      `}>
        {uploading ? (
          <span className="animate-pulse">Sending Love...</span>
        ) : (
          <span className="flex items-center gap-2">📸 Snap & Send</span>
        )}
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
}