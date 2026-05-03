'use client';

import { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Lazy load components for better performance
const Hero = lazy(() => import('@/components/sections/Hero'));
const Features = lazy(() => import('@/components/sections/Features'));
const Stats = lazy(() => import('@/components/sections/Stats'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Contact = lazy(() => import('@/components/sections/Contact'));
const CTA = lazy(() => import('@/components/sections/CTA'));

export default function Home() {
  return (
    <>

        <Hero />
        {/* <Features /> */}
    </>
  );
}