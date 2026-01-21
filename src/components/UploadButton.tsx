"use client"; 

import { useState } from "react";
import { storage, db } from "../lib/firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// NOTICE: The word "default" is crucial here!
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

      alert("Photo uploaded successfully! 🎉");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label className={`
        px-8 py-4 rounded-full font-bold text-white text-lg cursor-pointer transition shadow-xl transform active:scale-95
        ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"}
      `}>
        {uploading ? "Uploading..." : "📸 Take a Photo"}
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