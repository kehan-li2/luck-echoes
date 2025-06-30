"use client";

// import Image from 'next/image';
// import Link from 'next/link';
import Header from "../components/header";

const AboutePage = () => {


  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <Header />

      <main className="overflow-y-auto h-screen mx-20 px-6 flex flex-col min-h-[75vh]">
        <p>This is about us page</p>

      </main>
    </div >
  );
};

export default AboutePage;
