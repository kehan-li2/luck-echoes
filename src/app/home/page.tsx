import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';
import Button from '../components/button';
import './home.css';



export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <nav className="flex gap-6 text-lg">
            <a href="/" className="hover:text-purple-600">Home</a>
            <a href="/charms" className="hover:text-purple-600">Charms</a>
            <a href="/fortune" className="hover:text-purple-600">Fortune</a>
            <a href="/about" className="hover:text-purple-600">About Us</a>
          </nav>
        </div>
        <div className="flex gap-6">
          <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-purple-600" />
          <User className="w-6 h-6 text-gray-600 hover:text-purple-600" />
        </div>
      </header>

      {/* Main Section */}
      <main className="ml-10 p-10 flex gap-10 justify-center items-center">
        <div className="flex-1">
          <h1 className="text-6xl font-bold mb-4 text-left leading-[1.3]">
            Wear Fortune <br />
            Whispers,<br />
            Luck Echoes
          </h1>

          <div className="flex gap-4 text-2xl">
            <Button className="bg-purple-800 text-white px-6 py-2 hover:bg-purple-900">
              Today's Fortune
            </Button>
            <Button className="text-purple-800 hover:text-purple-600">
              Products →
            </Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 items-start">
          <Image
            src="/j1.jpg"
            alt="Product Large"
            width={400}
            height={800}
            className="rounded-big-bl object-cover"
          />
          <Image
            src="/j2.png"
            alt="Product Small"
            width={300}
            height={600}
            className="rounded-big-tr object-cover self-end"
          />
        </div>
      </main>
    </div>
  );
}

