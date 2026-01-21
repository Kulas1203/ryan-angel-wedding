"use client";

import { useState } from "react";
import { storage, db } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadButton() {
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const uniqueName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `uploads/${uniqueName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save photo WITH the caption/wish
      await addDoc(collection(db, "photos"), {
        url: downloadURL,
        caption: caption, // This adds the message
        createdAt: serverTimestamp(),
      });

      setCaption(""); // Clear the text box
      alert("Sent with love! ❤️");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-xl border border-rose-100">
      
      {/* Message Input */}
      <input
        type="text"
        placeholder="Write a wish for the couple..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900 placeholder:text-rose-300 text-center font-serif"
      />

      {/* Upload Button */}
      <label className={`
        relative w-full flex items-center justify-center px-8 py-3 
        bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-lg rounded-xl
        cursor-pointer shadow-md transition transform hover:-translate-y-0.5 active:scale-95
        ${uploading ? "opacity-75 cursor-wait" : ""}
      `}>
        {uploading ? "Sending..." : "📸 Snap & Send"}
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