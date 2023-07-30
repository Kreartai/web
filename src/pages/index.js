import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar/Navbar"
import HeroSection from "@/components/HeroSection/HeroSection"
import Generate from "@/components/Generate/Generate"
import ShowImages from "@/components/ShowImages/ShowImages"
import Gallery from "@/components/Gallery/Gallery"
import Beta from "@/components/Beta/Beta"
import Footer from "@/components/Footer/Footer"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div >
      <HeroSection />
      <Gallery />
      <Beta />
      <Footer />
    </div>
  )
}
