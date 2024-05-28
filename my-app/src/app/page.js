import Image from "next/image";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.90] antialised bg-grid-white/[0.02]">
      <Navbar/>
      <Herosection/>
      <Footer/>
    </main>
  );
}
