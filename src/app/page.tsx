import UploadButton from "../components/UploadButton";
import PhotoGrid from "../components/PhotoGrid";
import WeddingQR from "../components/WeddingQR"; // Import the new component

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf2f8]">
      <div className="flex flex-col items-center pt-16 pb-10 px-4 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <p className="text-rose-400 font-medium tracking-widest text-xs uppercase">
            The Wedding Of
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-rose-900">
            Ryan & Angel
          </h1>
          <div className="h-1 w-24 bg-rose-300 mx-auto rounded-full opacity-50 mt-6"></div>
          <p className="text-rose-600 italic font-serif mt-4">
            October 29, 2026
          </p>
        </div>

        {/* Upload Section */}
        <div className="z-10 w-full mb-16">
          <UploadButton />
        </div>

        {/* The Custom QR Code (New!) */}
        <div className="mb-16">
          <WeddingQR />
        </div>

        {/* The Gallery */}
        <div className="w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-rose-200 flex-1"></div>
            <span className="text-rose-300 font-serif italic text-lg">Captured Moments</span>
            <div className="h-px bg-rose-200 flex-1"></div>
          </div>
          <PhotoGrid />
        </div>
        
        {/* Footer */}
        <footer className="mt-20 text-rose-300 text-xs pb-6 text-center">
          Made with ❤️ for Ryan & Angel
        </footer>

      </div>
    </main>
  );
}