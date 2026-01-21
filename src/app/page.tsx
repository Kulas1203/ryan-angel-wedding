"use client"; // This is required for animations

import UploadButton from "../components/UploadButton";
import PhotoGrid from "../components/PhotoGrid";
import WeddingQR from "../components/WeddingQR";
import { motion } from "framer-motion";

export default function Home() {
  // Animation settings
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden relative">
      
      {/* Floating Background Orbs (Pure decoration) */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[-50px] w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[-50px] w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
      />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center pt-16 pb-10 px-4 max-w-6xl mx-auto"
      >
        
        {/* Header with Animation */}
        <motion.div variants={fadeInUp} className="text-center space-y-4 mb-12">
          <p className="text-rose-400 font-medium tracking-[0.2em] text-xs uppercase">
            The Wedding Of
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-900 to-pink-800 drop-shadow-sm">
            Ryan & Angel
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-rose-300 to-pink-300 mx-auto rounded-full mt-6"
          />
          <p className="text-rose-600 italic font-serif mt-4 text-lg">
            October 29, 2026
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div variants={fadeInUp} className="w-full mb-16">
          <UploadButton />
        </motion.div>

        {/* QR Code */}
        <motion.div variants={fadeInUp} className="mb-16">
          <WeddingQR />
        </motion.div>

        {/* Gallery Section */}
        <motion.div variants={fadeInUp} className="w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent to-rose-200 flex-1"></div>
            <span className="text-rose-400 font-serif italic text-xl">Captured Moments</span>
            <div className="h-px bg-gradient-to-l from-transparent to-rose-200 flex-1"></div>
          </div>
          <PhotoGrid />
        </motion.div>
        
        {/* Footer */}
        <motion.footer variants={fadeInUp} className="mt-20 text-rose-300 text-xs pb-6 text-center">
          Made with ❤️ for Ryan & Angel
        </motion.footer>

      </motion.div>
    </main>
  );
}