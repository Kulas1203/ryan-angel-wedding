"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // This query says: "Give me all photos, newest first"
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));

    // This listener stays open and updates automatically!
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mt-10 px-4">
      {photos.map((photo: any) => (
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