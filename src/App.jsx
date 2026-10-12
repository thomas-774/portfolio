import './App.css'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkSection from './components/WorkSection'
import SkillsSection from './components/SkillsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <WorkSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <SpeedInsights />
    </>
  )
}
