"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* The Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedPhoto(photo.url)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ring-4 ring-white cursor-zoom-in"
          >
            <img 
              src={photo.url} 
              alt="Wedding moment" 
              className="object-cover w-full h-full transform transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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

      {/* The Lightbox (Full Screen View) */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/80 hover:text-white text-4xl font-light">
            &times;
          </button>

          {/* Big Image */}
          <img 
            src={selectedPhoto} 
            alt="Full screen view" 
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevents closing if you click the image itself
          />
        </div>
      )}
    </>
  );
}