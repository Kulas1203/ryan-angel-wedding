"use client";

import { QRCodeSVG } from "qrcode.react";

export default function WeddingQR() {
  return (
    <div className="flex flex-col items-center gap-6 my-10 p-8 bg-white rounded-3xl shadow-xl border border-rose-100 max-w-sm mx-auto">
      <h3 className="text-rose-900 font-serif text-2xl font-bold">Scan to Share</h3>
      
      <div className="p-4 bg-white rounded-xl shadow-inner border border-rose-50">
        <QRCodeSVG
          value="https://ryan-angel-wedding-2026.vercel.app"
          size={200}
          level={"H"} // High error correction so the image doesn't break it
          imageSettings={{
            src: "/couple.jpg", // This looks for the file in your public folder
            x: undefined,
            y: undefined,
            height: 45,
            width: 45,
            excavate: true, // This digs a hole for the image so dots don't overlap
          }}
          fgColor="#881337" // Dark Rose color for the dots
        />
      </div>

      <p className="text-center text-rose-400 text-sm font-serif italic">
        Capture our moments &<br/>leave a wish!
      </p>
    </div>
  );
}