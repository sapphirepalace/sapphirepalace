import { createClient } from '@/lib/supabase/server'
import type { Video } from '@/lib/types'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import MarqueeStrip from '@/components/public/MarqueeStrip'
import AboutSection from '@/components/public/AboutSection'
import ExperienceStrip from '@/components/public/ExperienceStrip'
import HallsSection from '@/components/public/HallsSection'
import ServicesSection from '@/components/public/ServicesSection'
import GallerySection from '@/components/public/GallerySection'
import WhySection from '@/components/public/WhySection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import BlogSection from '@/components/public/BlogSection'
import CtaBanner from '@/components/public/CtaBanner'
import BookingSection from '@/components/public/BookingSection'
import FaqSection from '@/components/public/FaqSection'
import Footer from '@/components/public/Footer'
import FloatingButtons from '@/components/public/FloatingButtons'
import RevealAnimations from '@/components/public/RevealAnimations'

export const revalidate = 300

export default async function Home() {
  const supabase = await createClient()
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <>
      <RevealAnimations />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <div className="divider" />
      <AboutSection />
      <div className="divider" />
      <ExperienceStrip />
      <div className="divider" />
      <HallsSection />
      <div className="divider" />
      <ServicesSection />
      <div className="divider" />
      <GallerySection videos={(videos ?? []) as Video[]} />
      <div className="divider" />
      <WhySection />
      <div className="divider" />
      <TestimonialsSection />
      <div className="divider" />
      <BlogSection />
      <div className="divider" />
      <CtaBanner />
      <BookingSection />
      <div className="divider" />
      <FaqSection />
      <div className="divider" />
      <Footer />
      <FloatingButtons />
    </>
  )
}
