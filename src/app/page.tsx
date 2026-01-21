import UploadButton from "../components/UploadButton";
import PhotoGrid from "../components/PhotoGrid"; // Import the new gallery

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-10 bg-gray-50 text-center">
      <h1 className="text-4xl font-bold mb-2 text-pink-600">Ryan & Angel</h1>
      <p className="text-lg text-gray-600 mb-8">October 29, 2026</p>
      
      {/* The Upload Button */}
      <UploadButton />

      {/* The Live Gallery */}
      <PhotoGrid />
    </main>
  );
}