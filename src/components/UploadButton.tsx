"use client"; 

import { useState } from "react";
import { storage, db } from "../lib/firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadButton() {
  const [uploading, setUploading] = useState(false);

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
        createdAt: serverTimestamp(),
      });

      // Simple browser alert is fine for now, or you could use a toast later
      alert("Photo shared! Thank you! 🥂");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Oops! Something went wrong. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Glowing effect behind the button */}
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      
      <label className={`
        relative flex items-center justify-center px-8 py-4 
        bg-white text-rose-600 font-bold text-lg rounded-full 
        cursor-pointer shadow-xl transition transform hover:-translate-y-1 hover:scale-105 active:scale-95
        border-2 border-rose-100
        ${uploading ? "opacity-75 cursor-wait" : ""}
      `}>
        {uploading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-rose-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            📸 Share a Photo
          </span>
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