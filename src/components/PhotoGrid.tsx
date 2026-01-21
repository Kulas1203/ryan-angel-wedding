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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
        {photos.map((photo) => (
          <button 
            key={photo.id} 
            type="button"
            onClick={() => setSelectedPhoto(photo.url)}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ring-4 ring-white cursor-zoom-in focus:outline-none focus:ring-rose-400"
          >
            <img 
              src={photo.url} 
              alt="Wedding moment" 
              className="object-cover w-full h-full transform transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
        
        {photos.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-rose-300 text-xl font-serif italic">
              Waiting for the first memory...
            </p>
          </div>
        )}
      </div>

      {/* Lightbox / Full Screen View */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button className="absolute top-5 right-5 text-white/80 hover:text-white p-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img 
            src={selectedPhoto} 
            alt="Full screen view" 
            className="max-h-[85vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}