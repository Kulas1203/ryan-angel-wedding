import UploadButton from "../components/UploadButton";
import PhotoGrid from "../components/PhotoGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100">
      <div className="flex flex-col items-center pt-16 pb-10 px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-5xl md:text-6xl font-serif text-rose-900 tracking-tight">
            Ryan & Angel
          </h1>
          <div className="h-1 w-24 bg-rose-400 mx-auto rounded-full my-4 opacity-50"></div>
          <p className="text-rose-700 font-medium tracking-widest text-sm uppercase">
            October 29, 2026
          </p>
        </div>

        {/* The Upload Button (Floating) */}
        <div className="z-10 mb-10">
          <UploadButton />
        </div>

        {/* The Gallery */}
        <div className="w-full max-w-5xl">
          <PhotoGrid />
        </div>
        
        {/* Footer */}
        <footer className="mt-20 text-rose-300 text-xs pb-6">
          Made with ❤️ for our special day
        </footer>

      </div>
    </main>
  );
}