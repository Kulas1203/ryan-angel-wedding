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
      <div className="columns-2 md:columns-3 gap-4 space-y-4 pb-20 px-2">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <button 
              type="button"
              onClick={() => setSelectedPhoto(photo.url)}
              className="w-full bg-white p-3 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-rotate-1 cursor-zoom-in"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-3">
                <img 
                  src={photo.url} 
                  alt="Wedding memory" 
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              
              {/* The Wish/Caption Section */}
              {photo.caption ? (
                <p className="font-serif text-rose-900 text-sm leading-tight text-center italic border-t border-rose-100 pt-2">
                  "{photo.caption}"
                </p>
              ) : (
                <p className="text-rose-200 text-xs text-center border-t border-rose-50 pt-2">
                  ❤️
                </p>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Full Screen View */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <img 
            src={selectedPhoto} 
            alt="Full screen" 
            className="max-h-[85vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}