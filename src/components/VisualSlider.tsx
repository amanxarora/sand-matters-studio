'use client';

import React, { useState, useRef, useEffect } from 'react';

interface VisualSliderProps {
  imageBefore?: string;
  imageAfter?: string;
  labelBefore?: string;
  labelAfter?: string;
  title?: string;
  coordinates?: string;
}

export default function VisualSlider({
  imageBefore = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', // High contrast field/river mock
  imageAfter = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80', // High contrast excavation mock
  labelBefore = 'SENTINEL-2 [T01: 2016-04-12]',
  labelAfter = 'SENTINEL-2 [T02: 2026-05-20]',
  title = 'SPECTRAL REFLECTANCE SWIPE',
  coordinates = '16.8423° N, 81.5938° E'
}: VisualSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--border-radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-panel)',
      userSelect: 'none'
    }}>
      {/* Cyber HUD Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        borderBottom: '1px solid var(--glass-border)',
        fontSize: '10px',
        fontFamily: 'monospace',
        letterSpacing: '0.5px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 0 6px var(--color-accent)'
          }} />
          <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>{title}</span>
        </div>
        <div style={{ color: 'var(--color-text-secondary)' }}>
          [COORD: {coordinates}]
        </div>
      </div>

      {/* Swipe Area */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        style={{
          position: 'relative',
          height: '200px',
          width: '100%',
          cursor: 'ew-resize',
          overflow: 'hidden',
          backgroundColor: '#05070f'
        }}
      >
        {/* Background - Before Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageBefore})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none'
        }} />

        {/* Foreground - After Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageAfter})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          pointerEvents: 'none'
        }} />

        {/* Grid and Corner Brackets Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          border: '1px solid rgba(6, 182, 212, 0.15)',
          background: 'linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          {/* Corner target brackets */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '8px', height: '8px', borderTop: '2px solid var(--color-accent)', borderLeft: '2px solid var(--color-accent)' }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderTop: '2px solid var(--color-accent)', borderRight: '2px solid var(--color-accent)' }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-accent)', borderLeft: '2px solid var(--color-accent)' }} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-accent)', borderRight: '2px solid var(--color-accent)' }} />
        </div>

        {/* Slide Line with Target Crosshair Handle */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          backgroundColor: 'var(--color-accent)',
          boxShadow: '0 0 10px var(--color-accent)',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
          zIndex: 3
        }}>
          {/* Target Reticle Crosshair */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid var(--color-accent)',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            boxShadow: '0 0 12px var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'ew-resize'
          }}>
            {/* Inner crosshair dot */}
            <div style={{
              width: '4px',
              height: '4px',
              backgroundColor: 'var(--color-accent)',
              borderRadius: '50%'
            }} />
            {/* Horizontal indicators */}
            <div style={{ position: 'absolute', left: '2px', right: '2px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
            {/* Vertical indicators */}
            <div style={{ position: 'absolute', top: '2px', bottom: '2px', width: '1px', backgroundColor: 'var(--color-accent)' }} />
          </div>
        </div>

        {/* Labels */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '12px',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          padding: '2px 6px',
          borderRadius: '2px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--glass-border)',
          zIndex: 2,
          pointerEvents: 'none'
        }}>
          {labelBefore}
        </div>
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          padding: '2px 6px',
          borderRadius: '2px',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--glass-border)',
          zIndex: 2,
          pointerEvents: 'none'
        }}>
          {labelAfter}
        </div>
      </div>
    </div>
  );
}
