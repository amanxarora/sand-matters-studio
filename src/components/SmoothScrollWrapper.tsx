'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isConsole = pathname && pathname.startsWith('/console');

  // References for LERP physics
  const targYRef = useRef(0);
  const curYRef = useRef(0);
  const maxScrollYRef = useRef(0);
  const sRafRef = useRef<number | null>(null);

  const EASE = 0.04; // Heavy, slow deceleration ease

  useEffect(() => {
    if (isConsole) return;

    // Reset scroll positions on route changes
    targYRef.current = 0;
    curYRef.current = 0;
    
    const container = document.getElementById('scrollMode');
    const track = document.getElementById('scrollTrack');
    
    if (track) {
      track.style.transform = `translateY(0px)`;
    }

    const updateMaxScroll = () => {
      if (track && container) {
        maxScrollYRef.current = Math.max(0, track.scrollHeight - container.clientHeight);
      }
    };

    // Bind initial check after frame mounts
    setTimeout(updateMaxScroll, 250);

    const runScrollLerp = () => {
      if (sRafRef.current) return;
      
      const loop = () => {
        const diff = targYRef.current - curYRef.current;
        
        // Snap to destination target if differences are imperceptible
        if (Math.abs(diff) < 0.05) {
          curYRef.current = targYRef.current;
          sRafRef.current = null;
          const currentTrack = document.getElementById('scrollTrack');
          if (currentTrack) {
            currentTrack.style.transform = `translateY(${curYRef.current}px)`;
          }
          return;
        }
        
        curYRef.current += diff * EASE;
        const currentTrack = document.getElementById('scrollTrack');
        if (currentTrack) {
          currentTrack.style.transform = `translateY(${curYRef.current}px)`;
        }
        sRafRef.current = requestAnimationFrame(loop);
      };
      
      sRafRef.current = requestAnimationFrame(loop);
    };

    const clampY = (v: number) => {
      return Math.max(-maxScrollYRef.current, Math.min(0, v));
    };

    // Wheel inputs
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      updateMaxScroll(); // Dynamic re-calculation
      targYRef.current = clampY(targYRef.current - e.deltaY);
      runScrollLerp();
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Touch momentum velocity calculations for touchscreens
    let ty0 = 0;
    let tyLast = 0;
    let vel = 0;
    let tLast = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      ty0 = e.touches[0].clientY;
      tyLast = ty0;
      vel = 0;
      tLast = Date.now();
      targYRef.current = curYRef.current; // freeze target
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      updateMaxScroll();
      const y = e.touches[0].clientY;
      const dt = Date.now() - tLast || 1;
      vel = ((y - tyLast) / dt) * 16;
      targYRef.current = clampY(targYRef.current + (y - tyLast));
      tyLast = y;
      tLast = Date.now();
      runScrollLerp();
    };

    const handleTouchEnd = () => {
      targYRef.current = clampY(targYRef.current + vel * 10); // fling momentum
      runScrollLerp();
    };

    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Window Resize listener
    const handleResize = () => {
      updateMaxScroll();
      targYRef.current = clampY(targYRef.current);
      runScrollLerp();
    };

    window.addEventListener('resize', handleResize);

    // Watch track mutation lists (dynamic content additions)
    const observer = new MutationObserver(updateMaxScroll);
    if (track) {
      observer.observe(track, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      if (sRafRef.current) cancelAnimationFrame(sRafRef.current);
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [pathname, isConsole]);

  if (isConsole) {
    return <>{children}</>;
  }

  return (
    <div 
      id="scrollMode" 
      style={{ 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden', 
        position: 'relative',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <div 
        id="scrollTrack" 
        style={{ 
          width: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          transition: 'none',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}
