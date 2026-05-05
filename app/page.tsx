'use client';

import {  lazy } from 'react';

import SolutionsSection from '@/components/sections/Solutions'
import IndustrySolutions from '@/components/sections/IndustrySolutions';
import PartnersSection from '@/components/sections/PartnersSection';
import FAQSection from '@/components/sections/FAQ';
import ContactSection from '@/components/sections/Contact';
// Lazy load components for better performance
const Hero = lazy(() => import('@/components/sections/Hero'));
const Features = lazy(() => import('@/components/sections/Features'));


export default function Home() {
  return (
    <>

        <Hero />
        <Features />
        <SolutionsSection />
        <IndustrySolutions/>
        <PartnersSection />
        <FAQSection />
        <ContactSection />
    </>
  );
}