import About from "@/sections/About";
import CityList from "@/sections/CityList";
import Footer from "@/sections/Footer";
import Navbar from "@/sections/Navbar";
import Services from "@/sections/Services";
import Hero from "@/sections/Hero";  

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CityList />
        <About />
        <Services />
      </main>
      <Footer />
    </>
  )
}
