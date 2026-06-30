import { createClient } from '@/lib/supabase/server'
import type { Video, Photo } from '@/lib/types'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import MarqueeStrip from '@/components/public/MarqueeStrip'
import AboutSection from '@/components/public/AboutSection'
import ExperienceStrip from '@/components/public/ExperienceStrip'
import HallsSection from '@/components/public/HallsSection'
import ServicesSection from '@/components/public/ServicesSection'
import GallerySection from '@/components/public/GallerySection'
import PhotoGallerySection from '@/components/public/PhotoGallerySection'
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

async function getVideos(): Promise<Video[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('Failed to load videos:', error.message)
      return []
    }
    return (data ?? []) as Video[]
  } catch (err) {
    // Supabase unreachable (network timeout, etc.) — render page without videos
    console.error('Supabase request failed:', err)
    return []
  }
}

async function getPhotos(): Promise<Photo[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('Failed to load photos:', error.message)
      return []
    }
    return (data ?? []) as Photo[]
  } catch (err) {
    console.error('Supabase request failed:', err)
    return []
  }
}

export default async function Home() {
  const [videos, photos] = await Promise.all([getVideos(), getPhotos()])

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
      <GallerySection videos={videos} />
      {photos.length > 0 && (
        <>
          <div className="divider" />
          <PhotoGallerySection photos={photos} />
        </>
      )}
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
