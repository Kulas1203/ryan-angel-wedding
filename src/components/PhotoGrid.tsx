"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ring-4 ring-white">
          <img 
            src={photo.url} 
            alt="Wedding moment" 
            className="object-cover w-full h-full transform transition duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Subtle overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
      
      {photos.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="text-rose-300 text-xl font-serif italic">
            Waiting for the first memory...
          </p>
        </div>
      )}
    </div>
  );
}