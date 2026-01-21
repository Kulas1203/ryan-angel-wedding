"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function PhotoGrid() {
  // FIX: We added <any[]> here so Vercel knows it is a list of items
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPhotos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(fetchedPhotos);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mt-10 px-4 pb-20">
      {photos.map((photo) => (
        <div key={photo.id} className="relative aspect-square overflow-hidden rounded-xl shadow-md">
          <img 
            src={photo.url} 
            alt="Wedding moment" 
            className="object-cover w-full h-full hover:scale-105 transition duration-500"
          />
        </div>
      ))}
      
      {photos.length === 0 && (
        <p className="col-span-full text-gray-400 mt-10">
          No photos yet. Be the first to upload one!
        </p>
      )}
    </div>
  );
}